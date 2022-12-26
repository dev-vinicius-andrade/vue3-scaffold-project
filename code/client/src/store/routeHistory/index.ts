import { defineStore } from 'pinia';
import { IRouterHistoryWrapper } from '@/models/routeHistory/wrapper';
import { useNullableStorage } from '@composables/useNullableStorage';
import { RouteLocationRaw } from 'vue-router';
const defaultLastRoute = { path: '/' } as RouteLocationRaw;
const defaultState: IRouterHistoryWrapper = {
	lastRoute: defaultLastRoute,
};
export const useRouteHistoryStore = defineStore('RouteHistoryStore', {
	state: () => ({
		state: useNullableStorage<IRouterHistoryWrapper>('routeHistory', defaultState),
	}),
	actions: {
		setLastRoute(route: RouteLocationRaw) {
			if (!this.state) this.state = defaultState;
			this.state.lastRoute = route;
		},
	},
});
