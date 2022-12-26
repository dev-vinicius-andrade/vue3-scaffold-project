import type { RouteRecordRaw } from 'vue-router';
import { useRouteParamsAsProperties } from '@/composables/useRouteParamsAsProperties';
export default [
	{
		path: '/logged',
		component: () => import('@layouts/blank.vue'),
		children: [
			{
				path: '',
				component: () => import('@layouts/blank.vue'),
				children: [
					{
						path: 'home',
						children: [
							{
								path: '',
								name: '/logged/home',
								props: useRouteParamsAsProperties,
								component: () => import('@views/authorized/home/index.vue'),
							},
						],
					},
				],
			},
		],
	},
] as RouteRecordRaw[];
