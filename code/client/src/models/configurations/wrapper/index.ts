import { IConfigurationAuthentication } from '@models/configurations/authentication';
import { ISiteConfiguration } from '@models/configurations/site/index';
import { Nullable } from '@/types/nullable';

export interface IConfigurationWrapper {
	site: ISiteConfiguration;
	authentication: Nullable<IConfigurationAuthentication>;
}
export declare type ConfigurationWrapper = IConfigurationWrapper;
export default ConfigurationWrapper;
