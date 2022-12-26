import { Nullable } from '@/types/nullable';
export interface IConfigurationAuthentication {
	timeoutInSeconds: Nullable<number>;
	scope: Nullable<string[]>;
	audience: Nullable<string>;
	domain: Nullable<string>;
	clientId: Nullable<string>;
	rolesNamespace: Nullable<string>;
}
export declare type ConfigurationAuthentication = IConfigurationAuthentication;
export default ConfigurationAuthentication;
