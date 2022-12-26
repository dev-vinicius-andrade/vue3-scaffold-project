import { defineStore } from 'pinia';
import { User } from '@models/user';
import { Nullable } from '@/types/nullable';
import RolesEnum from '@enums/auth/roles';
import { RouteLocation, RouteLocationRaw, RouteLocationNormalized } from 'vue-router';
import { createAuth0, Auth0VueClientOptions } from '@auth0/auth0-vue';
import { useConfigurationsStore } from '@store/configurations';
import { useNullableStorage } from '@composables/useNullableStorage';

const defaultUserData = null as Nullable<User>;
const defaultLastRoute = { path: '/' } as RouteLocationRaw;
const defaultUserRoles = [RolesEnum.USER] as RolesEnum[];
export interface IAuthStoreState {
	userData: Nullable<User>;
	accessToken: Nullable<string>;
}
const defaultState: IAuthStoreState = {
	userData: defaultUserData,
	accessToken: null,
};
export const useAuthStore = defineStore('AuthStore', {
	state: () => {
		const configurationsStore = useConfigurationsStore();
		const authOptions = {
			domain: configurationsStore.configurations?.authentication?.domain || import.meta.env.VITE_APP_AUTH_URL,
			client_id: configurationsStore.configurations?.authentication?.clientId || import.meta.env.VITE_APP_AUTH_CLIENT_ID,
			redirect_uri: `${window.location.origin}/login/callback`,
		} as Auth0VueClientOptions;
		const authService = createAuth0(authOptions);
		return {
			state: useNullableStorage<IAuthStoreState>('authData'),
			authService,
		};
	},
	actions: {
		async isLogged(): Promise<boolean> {
			try {
				if (this.authService.isAuthenticated) return true;
				const token = await this.getToken();
				return !!token;
			} catch (error) {
				return false;
			}
		},
		async getToken(): Promise<string | undefined> {
			try {
				const configurationsStore = useConfigurationsStore();
				return await this.authService.getAccessTokenSilently({
					timeoutInSeconds: configurationsStore?.configurations?.authentication?.timeoutInSeconds || 1,
				});
			} catch (error) {
				return undefined;
			}
		},
		async login(): Promise<boolean> {
			try {
				await this.authService.loginWithRedirect();
				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
		async logout(): Promise<boolean> {
			try {
				await this.authService.logout({
					returnTo: `${window.location.origin}`,
					federated: true,
					localOnly: false,
				});
				this.clearData();
				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
		setUserData(): Nullable<User> {
			if (!this.authService?.user) return;
			const user = this.authService.user;
			const userId = user.sub?.split('|') ?? [];
			if (!this.state) this.state = defaultState;
			this.state.userData = {
				id: userId[userId.length - 1],
				sub: user.sub,
				email: user.email,
				name: user.name,
				picture: user.picture,
				nickname: user.nickname,
				updated_at: user.updated_at,
			};
			return this.state.userData;
		},
		clearData() {
			if (!this.state) this.state = defaultState;
			this.state.userData = defaultUserData;
		},
		getUserHomeRoute(): Nullable<RouteLocation | RouteLocationRaw | RouteLocationNormalized | string> {
			return { name: '/logged/home' };
		},
	},
});
