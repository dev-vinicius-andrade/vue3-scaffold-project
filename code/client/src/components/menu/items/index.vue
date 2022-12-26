<template>
	<VList>
		<VListItem v-for="item in componentProperties.items"></VListItem>
	</VList>
</template>
<script setup lang="ts">
export declare type IMenuItemsData = {
	items: Array<any>;
};
export declare type IMenuItemsProperties = {
	items?: Array<any>;
};

export declare type IMenuItemsEvents = {};
const componentProperties = withDefaults(defineProps<IMenuItemsProperties>(), {
	items: () => [],
});
</script>
