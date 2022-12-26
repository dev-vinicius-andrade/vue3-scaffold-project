<template>
	<VContainer fluid v-fill-height>
		<VRow justify="center" align="center" v-fill-parent>
			<VCol cols="8" v-background-color:[color.left] v-fill-parent />
			<VCol cols="4" v-background-color:[color.right] v-fill-parent>
				<VContainer fluid v-fill-parent>
					<VRow justify="center" align="center" v-fill-parent>
						<VCol class="text-center">
							<VBtn @click.stop="authStore.login">{{ getText({ key: 'buttons.login' }) }}</VBtn>
							<VImg :src="logo" width="200" height="200" />
						</VCol>
					</VRow>
				</VContainer>
			</VCol>
		</VRow>
	</VContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import logo from '@/assets/logo.png';
import { getText } from '@/helpers';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();
const color = ref({
	left: '#3fb27f',
	right: '#f7df1e',
});
</script>
