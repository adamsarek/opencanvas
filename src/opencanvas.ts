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

			Secret.set(this, 'resizeObserver', new ResizeObserver((entries) => {
				for (const entry of entries) {
					const containerElement = entry.target;
					const canvasElement = containerElement.querySelector('.opencanvas-canvas');
					
					canvasElement.width = containerElement.offsetWidth;
					canvasElement.height = containerElement.offsetHeight;
					
					this.drawCanvas(canvasElement);
				}
			}), false);

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

			return new Layout(containerElement, frameElement, canvasElement, overlayElement);
		}

		private createLayouts(): void {
			const layouts = Secret.set(this, 'layouts', []);
			const resizeObserver = Secret.get(this, 'resizeObserver');
			const selectedElements: Element[] = this.selectElements();

			for (const selectedElement of selectedElements) {
				const layout = this.createLayout(selectedElement);
				
				resizeObserver.unobserve(layout.container);
				resizeObserver.observe(layout.container);
				
				layouts.push(layout);
			}

			this.updateTheme();
		}

		private clearContext(context: CanvasRenderingContext2D): void {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		}

		private drawContext(context: CanvasRenderingContext2D): void {
			this.clearContext(context);
			
			const centerX = context.canvas.width / 2;
			const centerY = context.canvas.height / 2;
			const radius = 50;

			context.beginPath();
			context.arc(centerX, centerY, radius, 0, Math.PI * 2);
			context.fillStyle = '#0FA';
			context.fill();
			context.strokeStyle = '#888';
			context.stroke();

			console.log('DRAW');
		}

		private drawCanvas(canvasElement: Element): void {
			const context = canvasElement.getContext('2d');

			this.drawContext(context);
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
