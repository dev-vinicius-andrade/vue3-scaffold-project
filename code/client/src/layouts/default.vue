<template>
	<VContainer fluid>
		<Authorized v-if="isLogged" />
		<Unauthorized v-else />
	</VContainer>
</template>
<script setup lang="ts">
import Authorized from '@layouts/authorized.vue';
import Unauthorized from '@layouts/unauthorized.vue';
import { useAuthStore } from '@store/auth';
const authStore = useAuthStore();
const isLogged = await authStore.isLogged();
</script>
