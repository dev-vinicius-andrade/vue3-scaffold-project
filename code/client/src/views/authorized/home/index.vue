<template>
	<div>
		<h1>This is a home page for Authorized users</h1>
		<VBtn @click="authStore.logout">{{ getText({ key: 'buttons.logout' }) }}</VBtn>
	</div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@store/auth';
import { getText } from '@/helpers';
const authStore = useAuthStore();
</script>
