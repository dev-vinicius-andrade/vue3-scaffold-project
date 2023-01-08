<template>
	<Suspense>
		<VLocaleProvider>
			<VApp>
				<VMain>
					<NavigationBar />

					<RouterView />
				</VMain>
				<Footer />
			</VApp>
			<template #fallback>
				<VApp>
					<VMain>
						<VContainer v-fill-height fluid v-fill-parent>
							<VRow align="center" justify="center" v-fill-parent>
								<VSpacer />
								<VCol cols="auto"><VProgressCircular indeterminate color="primary" :size="56" /></VCol>
								<VSpacer />
							</VRow>
						</VContainer>
					</VMain>
				</VApp>
			</template>
		</VLocaleProvider>
	</Suspense>
</template>

<script setup lang="ts">
import { useConfigurationsStore } from '@store/configurations';
import NavigationBar from '@components/navigationBar/index.vue';
import Footer from '@components/footer/index.vue';
const configurationsStore = useConfigurationsStore();
onMounted(async () => {
	await configurationsStore.get(false);
	document.title = configurationsStore.data?.site.title ?? 'Loading...';
});
</script>
