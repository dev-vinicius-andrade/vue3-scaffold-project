<template>
	<VList>
		<VListItem
			v-for="(item, index) in componentProperties.modelValue"
			:key="`menu-item-list-item-${index}`"
			:append-icon="appendIcon(item) ? item.appendIcon : undefined"
			:prepend-icon="prependIcon(item) ? item.prependIcon : undefined"
			:title="item.title"
			:to="item.to"
		>
			<!-- <VIcon v-if="appendIcon(item)" />
			<VIcon v-if="prependIcon(item)" /> -->
		</VListItem>
	</VList>
</template>
<script setup lang="ts">
import { IMenuItem } from '@/types/menu/item';

export declare type IMenuItemsProperties = {
	modelValue: IMenuItem[];
	appendIcon?: boolean;
	prependIcon?: boolean;
};
const componentProperties = withDefaults(defineProps<IMenuItemsProperties>(), {
	modelValue: () => [],
	appendIcon: true,
	prependIcon: false,
});
const appendIcon = computed(
	() => (item: IMenuItem) => item.appendIcon && !item.prependIcon && hasIcon(item?.appendIcon),
);
const prependIcon = computed(
	() => (item: IMenuItem) => item.prependIcon && !item.appendIcon && hasIcon(item?.prependIcon),
);
function hasIcon(icon?: string): boolean {
	return !isNullOrUndefined(icon);
}
</script>
