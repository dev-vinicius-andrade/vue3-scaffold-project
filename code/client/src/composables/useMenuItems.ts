import { Ref } from 'vue';
import { getText } from '@/helpers';
import { IMenuItem } from '@/types/menu/item';
const menuItems: IMenuItem[] = [
	{
		title: getText({ key: 'menu.home' }),
		appendIcon: 'mdi-home',
		to: { name: '/' },
	},
	{
		title: getText({ key: 'menu.about' }),
		appendIcon: 'mdi-information',
		to: { name: '/about' },
	},
	{
		title: getText({ key: 'menu.contact' }),
		appendIcon: 'mdi-phone',
		to: { name: '/contact' },
	},
];

export function useMenuItemsWithIcons(): MenuItemsWithIcons {
	return { menuItemsWithIcons: ref<IMenuItem[]>(menuItems) };
}
export function useMenuItemsWithoutIcons(): MenuItemsWithoutIcons {
	const menuItemsWithoutIcons = menuItems.map(item => {
		const { prependIcon, appendIcon, ...itemWithoutIcons } = item;
		return itemWithoutIcons;
	});
	return { menuItemsWithoutIcons: ref<IMenuItem[]>(menuItemsWithoutIcons) };
}
export function useMenuItems(): MenuItems {
	const { menuItemsWithIcons } = useMenuItemsWithIcons();
	const { menuItemsWithoutIcons } = useMenuItemsWithoutIcons();
	return { menuItemsWithIcons, menuItemsWithoutIcons };
}

export declare type MenuItemsWithIcons = { menuItemsWithIcons: Ref<IMenuItem[]> };
export declare type MenuItemsWithoutIcons = { menuItemsWithoutIcons: Ref<IMenuItem[]> };
export declare type MenuItems = MenuItemsWithIcons & MenuItemsWithoutIcons;
