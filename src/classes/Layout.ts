import Secret from './Secret';
import ILayout from './ILayout';

const Layout = (() => {
	class Layout implements ILayout {
		public constructor() {}

		public get container(): Element | undefined {
			return Secret.get(this, 'container');
		}
		public set container(container: Element | undefined) {
			if (container && container instanceof Element) {
				Secret.set(this, 'container', container);

			} else {
				Secret.set(this, 'container', undefined);
			}
		}

		public get frame(): Element | undefined {
			return Secret.get(this, 'frame');
		}
		public set frame(frame: Element | undefined) {
			if (frame && frame instanceof Element) {
				Secret.set(this, 'frame', frame);

			} else {
				Secret.set(this, 'frame', undefined);
			}
		}

		public get canvas(): Element | undefined {
			return Secret.get(this, 'canvas');
		}
		public set canvas(canvas: Element | undefined) {
			if (canvas && canvas instanceof Element) {
				Secret.set(this, 'canvas', canvas);

			} else {
				Secret.set(this, 'canvas', undefined);
			}
		}

		public get overlay(): Element | undefined {
			return Secret.get(this, 'overlay');
		}
		public set overlay(overlay: Element | undefined) {
			if (overlay && overlay instanceof Element) {
				Secret.set(this, 'overlay', overlay);

			} else {
				Secret.set(this, 'overlay', undefined);
			}
		}

		public toObject(): object {
			return {
				container: this.container,
				frame: this.frame,
				canvas: this.canvas,
				overlay: this.overlay
			};
		}
	}

	return Object.freeze(Layout);
})();

export default Layout;
