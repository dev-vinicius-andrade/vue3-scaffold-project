<template>
	<MenuButton
		v-for="(item, index) in componentProperties.leftMenuItems"
		v-model="componentProperties.leftMenuItems[index]"
		:key="`menu-item-buttons-left-${index}`"
		:variant="componentProperties.variant"
	/>
	<VSpacer />
	<MenuButton
		v-for="(item, index) in componentProperties.rightMenuItems"
		v-model="componentProperties.rightMenuItems[index]"
		:key="`menu-item-buttons-left-${index}`"
		:variant="componentProperties.variant"
	/>
</template>
<script setup lang="ts">
import { IMenuItem } from '@/types/menu/item';
import type { MenuItemVariant } from '@components/menu/buttons/button/types';
import MenuButton from '@components/menu/buttons/button/index.vue';

export interface IMenuButtonComponentProperties {
	leftMenuItems: IMenuItem[];
	rightMenuItems: IMenuItem[];
	variant?: MenuItemVariant;
}
const componentProperties = withDefaults(defineProps<IMenuButtonComponentProperties>(), {
	leftMenuItems: () => [],
	rightMenuItems: () => [],
	variant: 'plain',
});
</script>
