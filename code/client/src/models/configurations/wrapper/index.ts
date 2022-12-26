import { ConfigurationAuthentication } from '@models/configurations/authentication';
import { Nullable } from '@/types/nullable';

export interface IConfigurationWrapper {
	authentication: Nullable<ConfigurationAuthentication>;
}
export declare type ConfigurationWrapper = IConfigurationWrapper;
export default ConfigurationWrapper;
