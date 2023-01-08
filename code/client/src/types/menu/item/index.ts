import { RouteLocationRaw } from 'vue-router';
import { PositionEnum } from '@enums/position';
export interface IMenuItem {
	title: string;
	to?: RouteLocationRaw;
	position?: PositionEnum;
	prependIcon?: string;
	appendIcon?: string;
}
export declare type MenuItem = IMenuItem;
export default MenuItem;
