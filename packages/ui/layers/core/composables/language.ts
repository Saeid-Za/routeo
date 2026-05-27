import type { Locale, NamedValue } from "vue-i18n"

export const useLanguage = defineComposable("language", () => {
	const { $i18n } = useNuxtApp()
	const t = $i18n.t

	const language = useCookie<Locale>("language", { default: () => $i18n.defaultLocale as unknown as Locale })
	const dir = computed(() => language.value === "en" ? "ltr" : "rtl")

	function init(lang?: Locale) {
		setLanguage(lang || language.value)
	}

	function useTranslateGroup(key: string) {
		return (subKey: string, options: NamedValue = {}) => t(`${key}.${subKey}`, options)
	}
	function setLanguage(lang: Locale) {
		language.value = lang
		$i18n.setLocale(lang)

		useHead({
			htmlAttrs: { dir, lang: language },
		})
	}

	return {
		locale: readonly($i18n.locale),
		dir,
		useTranslateGroup,
		setLanguage,
		init,
		t,
	}
})
