import type { App, Component, ComponentInternalInstance } from "vue"
import type { Props } from "~/types"
import { createApp, h } from "vue"

export function useDialog<T extends Component>(component: T, parentApp: ComponentInternalInstance | null = getCurrentInstance()) {
	const isOpen = shallowRef(false)
	const currentProps = shallowRef<Record<string, any>>({})

	let okCallbacks: Function[] = []
	let cancelCallbacks: Function[] = []
	let instance: App<Element> | null = null
	let htmlNode: HTMLDivElement | null = null

	const api = {
		isOpen: readonly(isOpen),
		onOk,
		onCancel,
		update,
		open,
		close,
	}

	onUnmounted(() => close(), parentApp)

	watch(isOpen, (open) => {
		update({ open } as any)

		if (!open) {
			close()
			okCallbacks = []
			cancelCallbacks = []
		}
	})

	function open(props?: Props<T>) {
		isOpen.value = true
		currentProps.value = { ...props, open: isOpen.value }
		mount(component)

		return api
	}

	function close() {
		isOpen.value = false

		const node = document.body.querySelector<HTMLDivElement>(`div[role="dialog"][data-state="open"]`)
		if (node) {
			node.addEventListener("animationend", destroy, { once: true })
		}
		else {
			// Forcefully destory everything
			destroy()
		}

		return api
	}

	function update(props?: Props<T>) {
		currentProps.value = { ...currentProps.value, ...props }
		return api
	}

	function onOk(fn: (...args: any) => any) {
		okCallbacks.push(fn)
		return api
	}

	function onCancel(fn: (...args: any) => any) {
		cancelCallbacks.push(fn)
		return api
	}

	function destroy() {
		instance?.unmount()
		if (htmlNode)
			window.document.body.removeChild(htmlNode)
		instance = null
		htmlNode = null
	}

	function mount(component: Component) {
		htmlNode = window.document.createElement("div")
		window.document.body.appendChild(htmlNode)

		instance = createComponent(component)
		instance.config.globalProperties = parentApp!.appContext.config.globalProperties
		instance._context.directives = parentApp!.appContext.directives
		instance._context.provides = parentApp!.appContext.provides

		instance.mount(htmlNode)
		return instance
	}

	function createComponent(component: Component) {
		return createApp({
			render() {
				return h(component, {
					...currentProps.value,
					"onUpdate:open": (open: boolean) => {
						isOpen.value = open
					},
					"onOk": async (values: any) => {
						for (const cb of okCallbacks)
							await cb(values)
					},
					"onCancel": async (values: any) => {
						for (const cb of cancelCallbacks)
							await cb(values)
					},
				})
			},
		})
	}

	return api
}
