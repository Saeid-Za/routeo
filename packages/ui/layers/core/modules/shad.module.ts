import { addComponent, defineNuxtModule } from "@nuxt/kit"

export type ModuleOptions = {
	prefix: string
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "shadcn/nuxt",
		configKey: "shadcn",
	},
	defaults: {
		prefix: "",
	},
	setup(options) {
		const components = [
			{ name: "DrawerPortal", as: "DrawerPortal", from: "vaul-vue" },
			{ name: "Field", as: "FormField", from: "vee-validate" },
			{ name: "DropdownMenuPortal", as: "DropdownMenuPortal", from: "reka-ui" },
			{ name: "PaginationRoot", as: "Pagination", from: "reka-ui" },
			{ name: "PaginationList", as: "PaginationList", from: "reka-ui" },
			{ name: "PaginationListItem", as: "PaginationListItem", from: "reka-ui" },
		]

		for (const component of components) {
			addComponent({
				name: `${options.prefix}${component.as}`,
				export: component.name,
				filePath: component.from,
			})
		}
	},
})
