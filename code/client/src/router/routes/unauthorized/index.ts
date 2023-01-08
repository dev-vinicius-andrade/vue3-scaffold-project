import type { RouteRecordRaw } from 'vue-router';
import { useRouteParamsAsProperties } from '@/composables/useRouteParamsAsProperties';
export default [
	{
		path: '',
		name: '/',
		props: useRouteParamsAsProperties,
		component: () => import('@views/unauthorized/home/index.vue'),
	},
	{
		path: '',
		name: '/about',
		props: useRouteParamsAsProperties,
		component: () => import('@views/unauthorized/about/index.vue'),
	},
	{
		path: '',
		name: '/contact',
		props: useRouteParamsAsProperties,
		component: () => import('@views/unauthorized/contact/index.vue'),
	},
] as RouteRecordRaw[];
