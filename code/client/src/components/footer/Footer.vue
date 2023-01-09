<template>
	<VFooter app>
		<VContainer fluid>
			<VRow no-gutters justify="center" align="center">
				<VCol cols="2" />
				<VCol>
					<span class="font-weight-medium">
						&copy;
						{{ new Date().getFullYear() }}
						Made With
						<IconifyLineMdHeartFilled :color="colors.red.base" size="2.25rem" />
						By
						<RouterLink :to="{ name: '/company/site' }" class="text-primary ms-1" target="_blank">
							{{ configurationsStore?.data?.site?.company }}
						</RouterLink>
					</span>
				</VCol>
				<VCol cols="2" class="d-flex justify-space-between">
					<!-- {{ colors.grey }} -->
					<IconifyFaFacebookF :color="socialIconsColors" />
					<IconifyFaInstagram :color="socialIconsColors" />
					<IconifyFaYoutubePlay :color="socialIconsColors" />
					<IconifyFaLinkedin :color="socialIconsColors" />
				</VCol>
				<VCol cols="2" />
			</VRow>
		</VContainer>
	</VFooter>
</template>
<script setup lang="ts">
import { useConfigurationsStore } from '@store/configurations';
const { theme } = useTheme();
const configurationsStore = useConfigurationsStore();
const companyRoute = computed(() => {
	if (configurationsStore?.data?.site?.companyUrl)
		return { path: configurationsStore?.data?.site?.companyUrl, replace: true };
	return { name: '/' };
});
const socialIconsColors = computed(() => theme.footer?.colors?.socialItems);
</script>
