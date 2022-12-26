<template>
	<VContainer fluid>
		<VRow justify="center" align="center" class="fill-height">
			<VCol class="text-center" cols="12">
				<h1 class="text-h1 font-weight-medium">401</h1>
				<h5 class="text-h5 font-weight-medium mb-3">You are not authorized! 🔐</h5>
				<p>You don't have permission to access this page. Go Home!</p>
			</VCol>
			<VCol class="text-center" cols="12">
				<VBtn to="/"> Back to Home </VBtn>
			</VCol>
			<VCol class="text-center" cols="12">
				<VBtn @click="authStore.logout()"> Logout </VBtn>
			</VCol>
		</VRow>
	</VContainer>
</template>
<script setup lang="ts">
import { useAuthStore } from '@store/auth';
const authStore = useAuthStore();
</script>
