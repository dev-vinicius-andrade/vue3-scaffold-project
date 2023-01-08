<template>
	<VFooter app>
		<VContainer fluid>
			<VRow no-gutters justify="center" align="center">
				<VCol cols="2" />
				<VCol>
					<span>
						&copy;
						{{ new Date().getFullYear() }}
						Made With
						<VIcon icon="mdi-heart-outline" color="error" size="1.25rem" class="mx-1" />
						By
						<RouterLink :to="{ name: '/company/site' }" class="text-primary ms-1" target="_blank">
							{{ configurationsStore?.data?.site?.company }}
						</RouterLink>
					</span>
				</VCol>
				<VCol>
					<FacebookIcon />
					<VBtn>mdi-facebook-</VBtn>
				</VCol>
			</VRow>
		</VContainer>
	</VFooter>
</template>
<script setup lang="ts">
import { useConfigurationsStore } from '@store/configurations';
const configurationsStore = useConfigurationsStore();
const companyRoute = computed(() => {
	if (configurationsStore?.data?.site?.companyUrl)
		return { path: configurationsStore?.data?.site?.companyUrl, replace: true };
	return { name: '/' };
});
</script>
