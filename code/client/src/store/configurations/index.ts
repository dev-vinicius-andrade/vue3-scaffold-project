import axios from 'axios';
import { defineStore } from 'pinia';
import { ConfigurationWrapper } from '@/models/configurations/wrapper';
import { Nullable } from '@/types/nullable';
import { useNullableStorage } from '@composables/useNullableStorage';
export const useConfigurationsStore = defineStore('ConfigurationsStore', {
	state: () => ({
		configurations: useNullableStorage<ConfigurationWrapper>('configurations'),
	}),
	actions: {
		set(configurations: Nullable<ConfigurationWrapper>) {
			this.configurations = configurations;
		},
		async get(fromCache: boolean = true) {
			if (fromCache && this.configurations) return this.configurations;
			const response = await axios.get('/configurations/settings.json');
			this.set(response.status !== 200 ? null : response.data);
			return this.configurations;
		},
	},
});
