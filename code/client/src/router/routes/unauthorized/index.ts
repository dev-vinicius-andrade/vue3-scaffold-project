import type { RouteRecordRaw } from 'vue-router';
import { useRouteParamsAsProperties } from '@/composables/useRouteParamsAsProperties';
export default [
	{
		path: '',
		name: '/',
		props: useRouteParamsAsProperties,
		component: () => import('@views/unauthorized/home/index.vue'),
	},
] as RouteRecordRaw[];
