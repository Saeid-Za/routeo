import type { App, Component, ComponentInternalInstance } from "vue"
import type { Props } from "~/types"
import { createApp, h } from "vue"

export function useElement<T extends Component>(component: T, parentApp: ComponentInternalInstance | null = getCurrentInstance()) {
	const isOpen = shallowRef(false)
	const currentProps = shallowRef<Record<string, any>>({})

	let instance: App<Element> | null = null
	let htmlNode: HTMLDivElement | null = null

	const api = {
		insertDOM,
		getHtml: () => htmlNode,
		isOpen: readonly(isOpen),
		update,
		open,
		close,
		isCreated,
	}

	onUnmounted(() => close(), parentApp)

	function open(props?: Props<T>) {
		if (isOpen.value)
			return api

		isOpen.value = true
		currentProps.value = { ...props, open: isOpen.value }
		mount(component)

		return api
	}

	function isCreated() {
		return !!instance
	}

	function close() {
		isOpen.value = false
		destroy()

		return api
	}

	function update(props?: Props<T>) {
		currentProps.value = { ...currentProps.value, ...props }

		return api
	}

	function destroy() {
		instance?.unmount()
		if (htmlNode) {
			htmlNode.parentNode?.removeChild(htmlNode)
		}
		instance = null
		htmlNode = null
	}

	function mount(component: Component) {
		insertDOM()

		instance = createComponent(component)
		instance.config.globalProperties = parentApp!.appContext.config.globalProperties
		instance._context.directives = parentApp!.appContext.directives
		instance._context.provides = parentApp!.appContext.provides

		instance.mount(htmlNode!)
		return instance
	}

	function insertDOM() {
		if (htmlNode)
			return

		htmlNode = window.document.createElement("div")
		window.document.body.appendChild(htmlNode)
	}

	function createComponent(component: Component) {
		return createApp({
			render() {
				return h(component, {
					...currentProps.value,
				})
			},
		})
	}

	return api
}
