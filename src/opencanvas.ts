import Secret from './classes/Secret';
import WorkerChannel from './classes/WorkerChannel';
import IOptions from './classes/IOptions';
import Options from './classes/Options';
import IStates from './classes/IStates';
import States from './classes/States';
import ILayout from './classes/ILayout';
import Layout from './classes/Layout';

const OpenCanvas = (() => {
	const workerURL = new URL('./classes/Worker.js', import.meta.url);
	const workerBlob = new Blob([`import "${workerURL}"`], { type: 'text/javascript' });
	const workerBlobURL = window.URL.createObjectURL(workerBlob);
	const worker = new Worker(workerBlobURL, { type: 'module' });
	const workerChannel = new WorkerChannel(worker);

	class OpenCanvas {
		public constructor(options: IOptions) {
			// Functions which can be called from worker
			workerChannel.fn = {
				// #TODO
			};

			window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
				this.updateTheme();
			});

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

				const browserTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
				const browserThemeName = browserTheme === 'light' ? 'Light' : 'Dark';

				// Apply new theme
				if (options.theme === 'auto') {
					layout.container.classList.add(`opencanvas-theme-${browserTheme}`);
				} else {
					layout.container.classList.add(`opencanvas-theme-${options.theme}`);
				}

				// Apply new theme
				const themeButtonOutputTextElement = layout.overlay.querySelector('.opencanvas-theme-button .opencanvas-output-text');
				const themeAutoButtonLabelIconElement = layout.overlay.querySelector('.opencanvas-auto-theme-button .opencanvas-label-icon');
				const themeAutoButtonLabelTextElement = layout.overlay.querySelector('.opencanvas-auto-theme-button .opencanvas-label-text');
				const themeDarkButtonLabelIconElement = layout.overlay.querySelector('.opencanvas-dark-theme-button .opencanvas-label-icon');
				const themeLightButtonLabelIconElement = layout.overlay.querySelector('.opencanvas-light-theme-button .opencanvas-label-icon');
				if (themeButtonOutputTextElement) {
					themeButtonOutputTextElement.innerHTML = options.theme === 'light' ? 'Light' : (options.theme === 'dark' ? 'Dark' : `Auto (${browserThemeName})`);
					themeAutoButtonLabelIconElement.innerHTML = options.theme === 'auto' ? 'check' : '&nbsp;';
					themeAutoButtonLabelTextElement.innerHTML = `Auto (${browserThemeName})`;
					themeDarkButtonLabelIconElement.innerHTML = options.theme === 'dark' ? 'check' : '&nbsp;';
					themeLightButtonLabelIconElement.innerHTML = options.theme === 'light' ? 'check' : '&nbsp;';
				}
			}
		}

		private createLayout(selectedElement: Element): ILayout {
			const browserTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
			const browserThemeName = browserTheme === 'light' ? 'Light' : 'Dark';

			const parentElement: ParentNode | null = selectedElement.parentNode;
			const className: string | null = selectedElement.className;

			const containerElement: Element = document.createElement('div');
			containerElement.className = className || ''; // Apply original selected element's classList
			containerElement.classList.add(...[
				'opencanvas',
				'opencanvas-container',
			]);
			containerElement.addEventListener('fullscreenchange', (event) => {
				const containerElement = event.target.closest('.opencanvas-container');
				const fullscreenButtonElement = event.target.querySelector('.opencanvas-fullscreen-button');
				
				if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
					containerElement.classList.add('opencanvas-fullscreen');
					fullscreenButtonElement.innerHTML = 'close_fullscreen';

				} else {
					containerElement.classList.remove('opencanvas-fullscreen');
					fullscreenButtonElement.innerHTML = 'open_in_full';
				}
			});

			const frameElement: Element = document.createElement('div');
			frameElement.classList.add(...[
				'opencanvas-frame',
			]);

			const canvasElement: Element = document.createElement('canvas');
			canvasElement.classList.add(...[
				'opencanvas-canvas',
			]);

			frameElement.append(canvasElement);
			containerElement.append(frameElement);

			const overlayElement: Element = document.createElement('div');
			overlayElement.classList.add(...[
				'opencanvas-overlay',
			]);
			overlayElement.addEventListener('click', (event) => {
				const containerElement = event.target.closest('.opencanvas-container');
				const popupElements = containerElement.querySelectorAll('.opencanvas-popup.visible');
				const popupMainContentElements = containerElement.querySelectorAll('.opencanvas-popup .opencanvas-popup-main-content:not(.visible)');
				const popupSubContentElements = containerElement.querySelectorAll('.opencanvas-popup .opencanvas-popup-sub-content.visible');
				const optionsButtonElement = containerElement.querySelector('.opencanvas-options-button');

				optionsButtonElement.classList.remove('active');

				for (const popupElement of popupMainContentElements) {
					popupElement.classList.add('visible');
				}

				for (const popupElement of [...popupElements, ...popupSubContentElements]) {
					popupElement.classList.remove('visible');
				}
			});

			const headerElement: Element = document.createElement('div');
			headerElement.classList.add(...[
				'opencanvas-header',
			]);

			const headerLeftElement: Element = document.createElement('div');
			headerLeftElement.classList.add(...[
				'opencanvas-header-left',
			]);

			const headerCenterElement: Element = document.createElement('div');
			headerCenterElement.classList.add(...[
				'opencanvas-header-center',
			]);

			const headerRightElement: Element = document.createElement('div');
			headerRightElement.classList.add(...[
				'opencanvas-header-right',
			]);

			headerElement.append(headerLeftElement);
			headerElement.append(headerCenterElement);
			headerElement.append(headerRightElement);
			overlayElement.append(headerElement);

			const bodyElement: Element = document.createElement('div');
			bodyElement.classList.add(...[
				'opencanvas-body',
			]);

			const optionsPopupElement = document.createElement('div');
			optionsPopupElement.classList.add(...[
				'opencanvas-popup',
				'opencanvas-options-popup',
			]);

			const optionsPopupMainContentElement = document.createElement('div');
			optionsPopupMainContentElement.classList.add(...[
				'opencanvas-popup-content',
				'opencanvas-popup-main-content',
				'visible',
			]);

			const themeButtonElement: Element = document.createElement('button');
			themeButtonElement.classList.add(...[
				'opencanvas-button',
				'opencanvas-theme-button',
			]);
			themeButtonElement.addEventListener('click', (event) => {
				event.stopPropagation();

				const popupElement = event.target.closest('.opencanvas-popup');
				const popupMainContentElement = popupElement.querySelector('.opencanvas-popup-main-content');
				const popupThemeContentElement = popupElement.querySelector('.opencanvas-popup-theme-content');

				popupMainContentElement.classList.remove('visible');
				popupThemeContentElement.classList.add('visible');
			});

			const themeButtonLabelElement: Element = document.createElement('div');
			themeButtonLabelElement.classList.add(...[
				'opencanvas-label',
			]);
			
			const themeButtonLabelIconElement: Element = document.createElement('div');
			themeButtonLabelIconElement.classList.add(...[
				'opencanvas-icon',
				'opencanvas-label-icon',
			]);
			themeButtonLabelIconElement.innerHTML = 'palette';

			const themeButtonLabelTextElement: Element = document.createElement('div');
			themeButtonLabelTextElement.classList.add(...[
				'opencanvas-label-text',
			]);
			themeButtonLabelTextElement.innerHTML = 'Theme';

			themeButtonLabelElement.append(themeButtonLabelIconElement);
			themeButtonLabelElement.append(themeButtonLabelTextElement);

			const themeButtonOutputElement: Element = document.createElement('div');
			themeButtonOutputElement.classList.add(...[
				'opencanvas-output',
			]);

			const themeButtonOutputTextElement: Element = document.createElement('div');
			themeButtonOutputTextElement.classList.add(...[
				'opencanvas-output-text',
			]);
			themeButtonOutputTextElement.innerHTML = this.options.theme === 'light' ? 'Light' : (this.options.theme === 'dark' ? 'Dark' : `Auto (${browserThemeName})`);

			const themeButtonOutputArrowElement: Element = document.createElement('div');
			themeButtonOutputArrowElement.classList.add(...[
				'opencanvas-icon',
				'opencanvas-output-arrow',
			]);
			themeButtonOutputArrowElement.innerHTML = 'chevron_right';

			themeButtonOutputElement.append(themeButtonOutputTextElement);
			themeButtonOutputElement.append(themeButtonOutputArrowElement);
			themeButtonElement.append(themeButtonLabelElement);
			themeButtonElement.append(themeButtonOutputElement);
			optionsPopupMainContentElement.append(themeButtonElement);
			optionsPopupElement.append(optionsPopupMainContentElement);

			const optionsPopupThemeContentElement = document.createElement('div');
			optionsPopupThemeContentElement.classList.add(...[
				'opencanvas-popup-content',
				'opencanvas-popup-sub-content',
				'opencanvas-popup-theme-content',
			]);

			const themeExitButtonElement: Element = document.createElement('button');
			themeExitButtonElement.classList.add(...[
				'opencanvas-button',
				'opencanvas-theme-exit-button',
			]);
			themeExitButtonElement.addEventListener('click', (event) => {
				event.stopPropagation();

				const popupElement = event.target.closest('.opencanvas-popup');
				const popupMainContentElement = popupElement.querySelector('.opencanvas-popup-main-content');
				const popupThemeContentElement = event.target.closest('.opencanvas-popup-theme-content');

				popupMainContentElement.classList.add('visible');
				popupThemeContentElement.classList.remove('visible');
			});

			const themeExitButtonLabelElement: Element = document.createElement('div');
			themeExitButtonLabelElement.classList.add(...[
				'opencanvas-label',
			]);
			
			const themeExitButtonLabelIconElement: Element = document.createElement('div');
			themeExitButtonLabelIconElement.classList.add(...[
				'opencanvas-icon',
				'opencanvas-label-icon',
			]);
			themeExitButtonLabelIconElement.innerHTML = 'chevron_left';

			const themeExitButtonLabelTextElement: Element = document.createElement('div');
			themeExitButtonLabelTextElement.classList.add(...[
				'opencanvas-label-text',
			]);
			themeExitButtonLabelTextElement.innerHTML = 'Theme';

			themeExitButtonLabelElement.append(themeExitButtonLabelIconElement);
			themeExitButtonLabelElement.append(themeExitButtonLabelTextElement);
			themeExitButtonElement.append(themeExitButtonLabelElement);
			optionsPopupThemeContentElement.append(themeExitButtonElement);

			const themeAutoButtonElement: Element = document.createElement('button');
			themeAutoButtonElement.classList.add(...[
				'opencanvas-button',
				'opencanvas-auto-theme-button',
			]);
			themeAutoButtonElement.addEventListener('click', (event) => {
				event.stopPropagation();

				const popupElement = event.target.closest('.opencanvas-popup');
				const popupMainContentElement = popupElement.querySelector('.opencanvas-popup-main-content');
				const popupThemeContentElement = popupElement.querySelector('.opencanvas-popup-theme-content');

				popupMainContentElement.classList.add('visible');
				popupThemeContentElement.classList.remove('visible');

				this.options.theme = 'auto';
			});

			const themeAutoButtonLabelElement: Element = document.createElement('div');
			themeAutoButtonLabelElement.classList.add(...[
				'opencanvas-label',
			]);
			
			const themeAutoButtonLabelIconElement: Element = document.createElement('div');
			themeAutoButtonLabelIconElement.classList.add(...[
				'opencanvas-icon',
				'opencanvas-label-icon',
			]);
			themeAutoButtonLabelIconElement.innerHTML = this.options.theme === 'auto' ? 'check' : '&nbsp;';

			const themeAutoButtonLabelTextElement: Element = document.createElement('div');
			themeAutoButtonLabelTextElement.classList.add(...[
				'opencanvas-label-text',
			]);
			themeAutoButtonLabelTextElement.innerHTML = `Auto (${browserThemeName})`;

			themeAutoButtonLabelElement.append(themeAutoButtonLabelIconElement);
			themeAutoButtonLabelElement.append(themeAutoButtonLabelTextElement);
			themeAutoButtonElement.append(themeAutoButtonLabelElement);
			optionsPopupThemeContentElement.append(themeAutoButtonElement);

			const themeDarkButtonElement: Element = document.createElement('button');
			themeDarkButtonElement.classList.add(...[
				'opencanvas-button',
				'opencanvas-dark-theme-button',
			]);
			themeDarkButtonElement.addEventListener('click', (event) => {
				event.stopPropagation();

				const popupElement = event.target.closest('.opencanvas-popup');
				const popupMainContentElement = popupElement.querySelector('.opencanvas-popup-main-content');
				const popupThemeContentElement = popupElement.querySelector('.opencanvas-popup-theme-content');

				popupMainContentElement.classList.add('visible');
				popupThemeContentElement.classList.remove('visible');

				this.options.theme = 'dark';
			});

			const themeDarkButtonLabelElement: Element = document.createElement('div');
			themeDarkButtonLabelElement.classList.add(...[
				'opencanvas-label',
			]);
			
			const themeDarkButtonLabelIconElement: Element = document.createElement('div');
			themeDarkButtonLabelIconElement.classList.add(...[
				'opencanvas-icon',
				'opencanvas-label-icon',
			]);
			themeDarkButtonLabelIconElement.innerHTML = this.options.theme === 'dark' ? 'check' : '&nbsp;';

			const themeDarkButtonLabelTextElement: Element = document.createElement('div');
			themeDarkButtonLabelTextElement.classList.add(...[
				'opencanvas-label-text',
			]);
			themeDarkButtonLabelTextElement.innerHTML = 'Dark';

			themeDarkButtonLabelElement.append(themeDarkButtonLabelIconElement);
			themeDarkButtonLabelElement.append(themeDarkButtonLabelTextElement);
			themeDarkButtonElement.append(themeDarkButtonLabelElement);
			optionsPopupThemeContentElement.append(themeDarkButtonElement);

			const themeLightButtonElement: Element = document.createElement('button');
			themeLightButtonElement.classList.add(...[
				'opencanvas-button',
				'opencanvas-light-theme-button',
			]);
			themeLightButtonElement.addEventListener('click', (event) => {
				event.stopPropagation();

				const popupElement = event.target.closest('.opencanvas-popup');
				const popupMainContentElement = popupElement.querySelector('.opencanvas-popup-main-content');
				const popupThemeContentElement = popupElement.querySelector('.opencanvas-popup-theme-content');

				popupMainContentElement.classList.add('visible');
				popupThemeContentElement.classList.remove('visible');

				this.options.theme = 'light';
			});

			const themeLightButtonLabelElement: Element = document.createElement('div');
			themeLightButtonLabelElement.classList.add(...[
				'opencanvas-label',
			]);
			
			const themeLightButtonLabelIconElement: Element = document.createElement('div');
			themeLightButtonLabelIconElement.classList.add(...[
				'opencanvas-icon',
				'opencanvas-label-icon',
			]);
			themeLightButtonLabelIconElement.innerHTML = this.options.theme === 'light' ? 'check' : '&nbsp;';

			const themeLightButtonLabelTextElement: Element = document.createElement('div');
			themeLightButtonLabelTextElement.classList.add(...[
				'opencanvas-label-text',
			]);
			themeLightButtonLabelTextElement.innerHTML = 'Light';

			themeLightButtonLabelElement.append(themeLightButtonLabelIconElement);
			themeLightButtonLabelElement.append(themeLightButtonLabelTextElement);
			themeLightButtonElement.append(themeLightButtonLabelElement);
			optionsPopupThemeContentElement.append(themeLightButtonElement);
			optionsPopupElement.append(optionsPopupThemeContentElement);
			bodyElement.append(optionsPopupElement);
			overlayElement.append(bodyElement);

			const footerElement: Element = document.createElement('div');
			footerElement.classList.add(...[
				'opencanvas-footer',
			]);

			const footerLeftElement: Element = document.createElement('div');
			footerLeftElement.classList.add(...[
				'opencanvas-footer-left',
			]);

			const footerCenterElement: Element = document.createElement('div');
			footerCenterElement.classList.add(...[
				'opencanvas-footer-center',
			]);

			const footerRightElement: Element = document.createElement('div');
			footerRightElement.classList.add(...[
				'opencanvas-footer-right',
			]);

			const optionsButtonElement: Element = document.createElement('button');
			optionsButtonElement.classList.add(...[
				'opencanvas-button',
				'opencanvas-icon',
				'opencanvas-options-button',
			]);
			optionsButtonElement.innerHTML = 'settings';
			optionsButtonElement.addEventListener('click', (event) => {
				event.stopPropagation();

				const containerElement = event.target.closest('.opencanvas-container');
				const optionsPopupElement = containerElement.querySelector('.opencanvas-options-popup');

				if (optionsPopupElement.classList.contains('visible')) {
					optionsButtonElement.classList.remove('active');
					optionsPopupElement.classList.remove('visible');

					const optionsPopupMainContentElements = optionsPopupElement.querySelector('.opencanvas-popup-main-content:not(.visible)');
					const optionsPopupSubContentElements = optionsPopupElement.querySelectorAll('.opencanvas-popup-sub-content.visible');

					if (optionsPopupMainContentElements) {
						optionsPopupMainContentElements.classList.add('visible');
					}

					for (const optionsPopupSubContentElement of optionsPopupSubContentElements) {
						optionsPopupSubContentElement.classList.remove('visible');
					}

					return;
				}

				optionsButtonElement.classList.add('active');
				optionsPopupElement.classList.add('visible');
			});

			footerRightElement.append(optionsButtonElement);

			if (document.fullscreenEnabled) {
				const fullscreenButtonElement: Element = document.createElement('button');
				fullscreenButtonElement.classList.add(...[
					'opencanvas-button',
					'opencanvas-icon',
					'opencanvas-fullscreen-button',
				]);
				fullscreenButtonElement.innerHTML = 'open_in_full';
				fullscreenButtonElement.addEventListener('click', (event) => {
					if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
						// Close fullscreen
						if (document.exitFullscreen) {
							document.exitFullscreen();
						} else if (document.mozCancelFullScreen) {
							document.mozCancelFullScreen();
						} else if (document.webkitExitFullscreen) {
							document.webkitExitFullscreen();
						} else if (document.msExitFullscreen) {
							document.msExitFullscreen();
						}

					} else {
						// Open fullscreen
						const containerElement = event.target.closest('.opencanvas-container');
						if (containerElement.requestFullscreen) {
							containerElement.requestFullscreen();
						} else if (containerElement.mozRequestFullScreen) {
							containerElement.mozRequestFullScreen();
						} else if (containerElement.webkitRequestFullscreen) {
							containerElement.webkitRequestFullscreen();
						} else if (containerElement.msRequestFullscreen) {
							containerElement.msRequestFullscreen();
						}
					}
				});

				footerRightElement.append(fullscreenButtonElement);
			}

			footerElement.append(footerLeftElement);
			footerElement.append(footerCenterElement);
			footerElement.append(footerRightElement);
			overlayElement.append(footerElement);
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
			const states = Secret.get(this, 'states');
			states.clearing = true;

			context.clearRect(0, 0, context.canvas.width, context.canvas.height);

			states.clearing = false;
		}

		private drawContext(context: CanvasRenderingContext2D): void {
			this.clearContext(context);

			const states = Secret.get(this, 'states');
			states.drawing = true;
			
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

			states.drawing = false;
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
