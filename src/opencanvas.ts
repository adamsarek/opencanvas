import Secret from './classes/Secret';
import WorkerChannel from './classes/WorkerChannel';
import IOptions from './classes/IOptions';
import Options from './classes/Options';
import IStates from './classes/IStates';
import States from './classes/States';
import ILayout from './classes/ILayout';
import Layout from './classes/Layout';

const OpenCanvas = (() => {
	const worker = new Worker(new URL('./classes/Worker.js', import.meta.url));
	const workerChannel = new WorkerChannel(worker);

	class OpenCanvas {
		public constructor(options: IOptions) {
			// Functions which can be called from worker
			workerChannel.fn = {
				// #TODO
			};

			const states = Secret.set(this, 'states', new States());

			this.options = options;

			if (!states?.created) {
				this.create();
			}
		}

		public get options(): IOptions {
			return Object.seal(Secret.get(this, 'options'));
		}
		public set options(options: IOptions) {
			const oldOptions = this.options;
			
			if (typeof options === 'object') {
				Secret.set(this, 'options', new Options(options));

			} else {
				Secret.set(this, 'options', new Options());
			}

			const newOptions = this.options;

			// If any of specified properties change, call create()
			const checkChanges = ['selector'];
			for (const checkChange of checkChanges) {
				if (oldOptions?.[checkChange as keyof object] !== newOptions?.[checkChange as keyof object]) {
					this.create();
					return;
				}
			}

			// If theme changes, update theme
			if (newOptions?.theme !== oldOptions?.theme) {
				this.updateTheme();
			}
		}

		public get states(): IStates {
			return Object.freeze(Secret.get(this, 'states'));
		}

		private selectElements(): Element[] {
			const options: IOptions = Secret.get(this, 'options');
			const selector: string = options.selector;
			const elements: NodeListOf<Element> = document.querySelectorAll(selector);

			// Do not select inner elements that match the same selector
			return Array.from(elements).filter(el => {
				return !el.closest(`${selector} ${selector}`);
			});
		}

		private updateTheme(): void {
			const layouts: ILayout[] = Secret.get(this, 'layouts');

			if (!layouts) {
				return;
			}
			
			const options: IOptions = Secret.get(this, 'options');
			
			for (const layout of layouts) {
				if (!layout.container) {
					continue;
				}

				// Remove old theme
				for (const className of layout.container.classList) {
					if (className.startsWith('opencanvas-theme-')) {
						layout.container.classList.remove(className);
					}
				}

				// Apply new theme
				layout.container.classList.add(`opencanvas-theme-${options.theme}`);
			}
		}

		private createLayout(selectedElement: Element): ILayout {
			const parentElement: ParentNode | null = selectedElement.parentNode;
			const className: string | null = selectedElement.className;

			const containerElement: Element = document.createElement('div');
			containerElement.className = className || ''; // Apply original selected element's classList
			containerElement.classList.add(...[
				'opencanvas',
				'opencanvas-container',
			]);

			const frameElement: Element = document.createElement('div');
			frameElement.classList.add(...[
				'opencanvas-frame',
			]);

			const canvasElement: Element = document.createElement('canvas');
			canvasElement.classList.add(...[
				'opencanvas-canvas',
			]);

			const overlayElement: Element = document.createElement('div');
			overlayElement.classList.add(...[
				'opencanvas-overlay',
			]);

			frameElement.append(canvasElement);
			containerElement.append(frameElement);
			containerElement.append(overlayElement);

			// Insert new created element
			if (parentElement && containerElement) {
				parentElement?.insertBefore(containerElement, selectedElement);
			}
			
			// Remove original selected element
			selectedElement.remove();

			const layout = new Layout();
			layout.container = containerElement;
			layout.frame = frameElement;
			layout.canvas = canvasElement;
			layout.overlay = overlayElement;

			return layout;
		}

		private createLayouts(): void {
			const layouts = Secret.set(this, 'layouts', []);

			const selectedElements: Element[] = this.selectElements();

			for (const selectedElement of selectedElements) {
				layouts.push(this.createLayout(selectedElement));
			}

			this.updateTheme();
		}

		public create(): void {
			const states = Secret.get(this, 'states');
			states.created = false;

			this.createLayouts();

			states.created = true;
		}

		public toObject(): object {
			return {
				options: this.options,
				states: this.states
			};
		}
	}

	return Object.freeze(OpenCanvas);
})();

export default OpenCanvas;
