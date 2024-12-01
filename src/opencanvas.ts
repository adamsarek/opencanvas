import Secret from './classes/Secret';
import IOptions from './classes/IOptions';
import Options from './classes/Options';
import IStates from './classes/IStates';
import States from './classes/States';

const OpenCanvas = (() => {
	class OpenCanvas {
		public constructor(options: IOptions) {
			const states = Secret.set(this, 'states', new States());
			this.options = options;

			if (!states?.created) {
				this.create();
			}
		}

		public create(): void {
			const states = Secret.get(this, 'states');
			states.created = false;

			this.replaceElements();

			states.created = true;
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

			// If theme changes, change class
			// #TODO

			// If any of specified properties change, call create()
			const checkChanges = ['selector'];
			for (const checkChange of checkChanges) {
				if (oldOptions?.[checkChange] !== newOptions?.[checkChange]) {
					this.create();
					return;
				}
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

		private createElement(className: string | null): Element {
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

			return containerElement;
		}

		private replaceElements(): void {
			const selectedElements: Element[] = this.selectElements();

			for (const selectedElement of selectedElements) {
				const parentElement: ParentNode | null = selectedElement.parentNode;
				const createdElement: Element = this.createElement(selectedElement.className);

				// Insert new created element
				if (parentElement && createdElement) {
					parentElement?.insertBefore(createdElement, selectedElement);
				}
				
				// Remove original selected element
				selectedElement.remove();
			}
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
