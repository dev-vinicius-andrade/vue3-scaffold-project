import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';
import { useRouteParamsAsProperties } from '@/composables/useRouteParamsAsProperties';
import { useImportRoutes } from '@/composables/useImportRoutes';
import { useAuthStore } from '@/store/auth';
import { useConfigurationsStore } from '@/store/configurations';
import { usePermissionsStore } from '@/store/permissions/index';
import { useRouteHistoryStore } from '@/store/routeHistory/index';
import { RouteNavigationGuardReturn } from '@/types/router/return';
const routes = {
	authorized: useImportRoutes(import.meta.glob('@router/routes/authorized/**/*.*s', { eager: true })),
	unauthorized: useImportRoutes(import.meta.glob('@router/routes/unauthorized/**/*.*s', { eager: true })),
};
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('@layouts/default.vue'),
			children: [
				{
					path: '/login',
					component: () => import('@layouts/blank.vue'),
					children: [
						{
							path: '',
							name: '/login',
							component: () => import('@views/login.vue'),
							beforeEnter: handleRoute,
						},
						{
							path: 'callback',
							name: '/login/callback',
							component: () => import('@views/login.vue'),
							beforeEnter: handleRoute,
						},
					],
				},
				{
					path: '/unauthorized',
					component: () => import('@layouts/blank.vue'),
					children: [
						{
							path: '',
							name: '/unauthorized',
							props: useRouteParamsAsProperties,
							component: () => import('@views/unauthorized.vue'),
						},
					],
				},
				{
					path: '/company/site',
					name: '/company/site',
					component: () => import('@layouts/blank.vue'),
					beforeEnter: () => {
						const configurationsStore = useConfigurationsStore();
						if (configurationsStore?.data?.site?.companyUrl)
							window.location.href = configurationsStore.data.site.companyUrl;
						else router.push({ name: '/' });
					},
				},
				...routes.authorized,
				...routes.unauthorized,
			],
		},
	],
});
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
	await handleRoute(to, from);
});
async function handleUnauthorizedRoute(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
): Promise<RouteNavigationGuardReturn> {
	if (to.name === '/login') return await handleNotLogged(to, from);
	return to;
}
async function handleRoute(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
): Promise<RouteNavigationGuardReturn> {
	if (!isAuthorizedRoute(to)) return await handleUnauthorizedRoute(to, from);
	const authStore = useAuthStore();
	const isLogged = await authStore.isLogged();
	if (!isLogged) return await handleNotLogged(to, from);
	else return await handleLogged(to, from);
}
async function handleNotLogged(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
): Promise<RouteNavigationGuardReturn> {
	const authStore = useAuthStore();
	if (to?.query?.code && to?.query?.state) {
		return { name: '/login/callback' };
	} else {
		if (!(await authStore.login())) return false;
		return to;
	}
}
async function handleLogged(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
): Promise<RouteNavigationGuardReturn> {
	if (to.name === '/login/callback') return await handleLoggedInToCallbackRoute();
	if (!canNavigate(to, from)) return { name: '/unauthorized' };
	setLastRoute(to);
	return true;
}
async function canNavigate(to: RouteLocationNormalized, from: RouteLocationNormalized): Promise<boolean> {
	const permissionsStore = usePermissionsStore();
	const userPermissions = permissionsStore.get();
	const routePermissions = to.meta?.permissions;
	if (!routePermissions) return true;
	if (!userPermissions) return false;
	return true;
}
async function handleLoggedInToCallbackRoute(): Promise<RouteNavigationGuardReturn> {
	const authStore = useAuthStore();
	const permissionsStore = usePermissionsStore();
	authStore.setUserData();
	permissionsStore.setPermissions(authStore.data.userData);
	const userHomeRoute = authStore.getUserHomeRoute();
	if (!userHomeRoute) return false;

	setLastRoute(userHomeRoute as RouteLocationNormalized);
	return userHomeRoute;
}
function setLastRoute(to: RouteLocationNormalized) {
	const routeHistoryStore = useRouteHistoryStore();
	if (
		!routes.authorized.some(route => route.path === to.path || route.name === to.name) &&
		!routes.unauthorized.some(route => route.path === to.path || route.name === to.name)
	)
		return;
	routeHistoryStore.setLastRoute(to);
}
function isAuthorizedRoute(to: RouteLocationNormalized): boolean {
	return routes.authorized.some(route => route.path === to.path || route.name === to.name);
}
export default router;
