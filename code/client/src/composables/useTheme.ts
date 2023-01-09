import { Theme, ThemeDefinitionOptions } from '@/types/theme';
import { useTheme as useVuetifyTheme } from 'vuetify';

export function useTheme(): Theme {
	const vuetifyTheme = useVuetifyTheme();
	const theme = vuetifyTheme.current.value as ThemeDefinitionOptions;
	return {
		theme,
	};
}
