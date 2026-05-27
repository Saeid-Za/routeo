export function useMenu<T>() {
	const isOpen = shallowRef(false)
	const position = shallowRef({ left: "0px", top: "0px" })
	const target = shallowRef<T>()

	function openMenu(event: MouseEvent, data?: T) {
		event.preventDefault()

		position.value = { left: `${event.x}px`, top: `${event.y}px` }
		target.value = data
		isOpen.value = true
	}

	function closeMenu() {
		isOpen.value = false
	}

	return {
		position,
		isOpen,
		target,
		openMenu,
		closeMenu,
	}
}
