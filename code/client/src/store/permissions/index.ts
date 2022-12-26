import RolesEnum from '@enums/auth/roles';
import axios from 'axios';
import { defineStore } from 'pinia';
import { IPermissionWrapper } from '@/models/permissions/wrapper';
import { IUser } from '@models/user';
import { Nullable } from '@/types/nullable';
import { useNullableStorage } from '@composables/useNullableStorage';
import { useConfigurationsStore } from '@store/configurations';
const defaulPermissions: Nullable<IPermissionWrapper> = {};
const rolesMap = new Map<string, RolesEnum>(Object.values(RolesEnum).map(v => [v.toLowerCase(), v]));
export const usePermissionsStore = defineStore('PermissionsStore', {
	state: () => ({
		permissions: useNullableStorage<IPermissionWrapper>('permissions', defaulPermissions),
	}),
	actions: {
		set(permissions: Nullable<IPermissionWrapper>) {
			this.permissions = permissions;
		},
		async get() {
			return this.permissions;
		},
		setPermissions(userData?: Nullable<IUser>): Nullable<RolesEnum[]> {
			if (!userData) return [];
			const configurationsStore = useConfigurationsStore();
			const rolesNamespace = configurationsStore?.configurations?.authentication?.rolesNamespace || import.meta.env.VITE_APP_AUTH_ROLES_NAMESPACE;
			const roles = (userData[`${rolesNamespace}/roles`] as Nullable<string[]>) ?? [];
			const permissions = roles.map(role => this.getRole(role)).filter(role => !!role) as RolesEnum[];
			return permissions;
		},
		getRole(role?: string): Nullable<RolesEnum> {
			if (!role) return null;
			try {
				return rolesMap.get(role.toLowerCase()) ?? null;
			} catch (error) {
				console.error(error);
				return null;
			}
		},
	},
});
