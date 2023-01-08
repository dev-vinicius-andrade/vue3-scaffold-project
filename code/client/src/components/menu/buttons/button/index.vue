<template>
	<VBtn
		v-if="componentProperties.modelValue"
		:to="componentProperties.modelValue.to"
		:variant="componentProperties.variant"
	>
		<VIcon v-if="prependIcon"> {{ componentProperties.modelValue.prependIcon }} </VIcon>
		<span v-if="componentProperties.modelValue?.title">{{ componentProperties.modelValue.title }}</span>
		<VIcon v-if="appendIcon"> {{ componentProperties.modelValue.appendIcon }} </VIcon>
	</VBtn>
</template>
<script setup lang="ts">
import { IMenuItem } from '@/types/menu/item';
import type { MenuItemVariant } from '@components/menu/buttons/button/types';
import { isNullOrUndefined } from '@/helpers';
export interface IMenuButtonComponentProperties {
	modelValue?: IMenuItem;
	variant?: MenuItemVariant;
}
const componentProperties = withDefaults(defineProps<IMenuButtonComponentProperties>(), {});
const appendIcon = computed(
	() => componentProperties.modelValue?.appendIcon && !componentProperties.modelValue?.prependIcon,
);
const prependIcon = computed(
	() => componentProperties.modelValue?.prependIcon && !componentProperties.modelValue?.appendIcon,
);
</script>
