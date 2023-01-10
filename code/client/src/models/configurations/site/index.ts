import { ISiteSocialConfiguration } from '@models/configurations/site/social';
export interface ISiteConfiguration {
	name: string;
	title: string;
	description: string;
	company: string;
	companyUrl?: string;
	social?: ISiteSocialConfiguration;
}
export declare type SiteConfiguration = ISiteConfiguration;
export default SiteConfiguration;
