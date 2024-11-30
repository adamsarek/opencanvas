import IOptions from "./classes/IOptions";
import Options from "./classes/Options";

export default class OpenCanvas {
	private options: Options;
	
	public constructor(options: IOptions) {
		this.options = new Options(options);

		this.create();
	}

	public create(): void {
		this.replaceElements();
	}

	private selectElements(): Element[] {
		const selector: string = this.options.selector;
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
}
