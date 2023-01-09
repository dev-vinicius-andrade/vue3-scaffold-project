import { ThemeEnum } from '@enums/theme';
import { useTheme } from 'vuetify';
export function useThemeWatcher() {
	const vuetifyTheme = useTheme();
	const themeStore = useThemeStore();

	function switchTheme(currentTheme: ThemeEnum) {
		const valueIndex = Object.values(ThemeEnum).findIndex(value => value === currentTheme);
		if (valueIndex === -1) return;
		const themeKey = Object.keys(ThemeEnum).find(key => key[valueIndex]);
		if (!themeKey) return;
		const theme: ThemeEnum = ThemeEnum[themeKey as keyof typeof ThemeEnum];
		if (!theme) return;
		vuetifyTheme.global.name.value = theme;
	}
	const themeWatcher = watch(
		() => themeStore.data.currentTheme,
		currentTheme => switchTheme(currentTheme),
	);
	switchTheme(themeStore.data.currentTheme);
	return {
		themeWatcher,
		switchTheme,
	};
}
