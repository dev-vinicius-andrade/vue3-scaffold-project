import { App, DirectiveBinding } from 'vue';
import { VNodeRenderer } from '@types';

export default {
	install: (app: App, options: any) => {
		app.config.globalProperties.$utils = {
			// Create utils here case needed
		};
		app.directive('background-color', (el, binding: DirectiveBinding, vnode: VNodeRenderer) => {
			el.style.backgroundColor = binding.arg;
		});
		app.directive('fill-height', (el, binding: DirectiveBinding, vnode: VNodeRenderer) => {
			el.style.height = '100vh';
		});
		app.directive('fill-parent', (el, binding: DirectiveBinding, vnode: VNodeRenderer) => {
			el.className += ' fill-height ma-0';
		});
		app.directive('color', (el, binding: DirectiveBinding, vnode: VNodeRenderer) => {
			el.style.color = binding.arg;
		});
		app.directive('width', (el, binding: DirectiveBinding, vnode: VNodeRenderer) => {
			el.style.width = binding.arg;
		});
		app.directive('height', (el, binding: DirectiveBinding, vnode: VNodeRenderer) => {
			el.style.height = binding.arg;
		});
	},
};
