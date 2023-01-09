<template>
	<VAppBar>
		<VAppBarNavIcon v-if="display.smAndDown.value" />
		<VAvatar :image="icon" class="ml-5" />
		<NavigationBarMenuButtons
			v-if="display.mdAndUp.value"
			:left-menu-items="leftMenuItems"
			:right-menu-items="rightMenuItems"
			:locale-position="PositionEnum.right"
		/>
	</VAppBar>
	<VNavigationDrawer v-if="display.smAndDown.value" v-model="showNavigationbar">
		<NavigationMenuList :model-value="navigationDrawerMenuItems" />
	</VNavigationDrawer>
</template>
<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useAuthStore } from '@/store/auth';
import { IMenu } from '@/types/menu/item';
import iconLight from '@assets/logo/light/logo.svg';
import iconDark from '@assets/logo/dark/logo.svg';
import { PositionEnum } from '@enums/position';

const display = useVuetifyDisplay();
const theme = useTheme();
const icon = computed(() => (theme.current.value.dark ? iconDark : iconLight));
const { menuItemsWithIcons, menuItemsWithoutIcons } = useMenuItems();
const showNavigationbar = ref(false);
const authStore = useAuthStore();
const isLogged = await authStore.isLogged();
const authMenuItems: IMenu[] = isLogged
	? [
			{
				title: getText({ key: 'menu.account' }),
				to: { name: '/logged/home' },
				position: PositionEnum.right,
				prependIcon: 'mdi-account-outline',
			},
	  ]
	: [
			{
				title: getText({ key: 'menu.loginOrSignUp' }),
				to: { name: '/login' },
				position: PositionEnum.right,
				prependIcon: 'mdi-login',
			},
	  ];

const leftMenuItems = computed(() =>
	menuItemsWithoutIcons.value.filter(item => !item.position || item.position === PositionEnum.left),
);
const rightMenuItems = computed(() => {
	const items = menuItemsWithoutIcons.value.filter(item => item.position && item.position === PositionEnum.right);
	return [...items, ...authMenuItems];
});
const navigationDrawerMenuItems = computed(() => [
	...menuItemsWithIcons.value,
	...authMenuItems.map(item => ({ ...item, appendIcon: item.prependIcon, prependIcon: undefined })),
]);
function toogleNavigationbar() {
	showNavigationbar.value = !showNavigationbar.value;
}
function goToHome() {
	const router = useRouter();
	router.push({ name: '/home' });
}
</script>