interface IGlobalOptions {
	// e.g. '.opencanvas' | ['opencanvas']
	get selector(): string;
	set selector(selector: string | string[]);
}

class GlobalOptions implements IGlobalOptions {
	#selector: string | string[] | null = null;
	
	public constructor(options: IGlobalOptions) {
		this.selector = options?.selector;
	}

	get selector(): string {
		const selector = this.#selector;

		if (Array.isArray(selector) && selector.every((value: string) => typeof value === 'string') && selector?.length > 0) {
			return `.${(selector as string[]).join(' .')}`;

		} else if (typeof selector === 'string' && selector?.length > 0) {
			return (selector as string);

		} else {
			return '.opencanvas';
		}
	}
	set selector(selector: string | string[]) {
		this.#selector = selector;
	}
}

export default class OpenCanvas {
	private options: GlobalOptions;
	
	public constructor(options: IGlobalOptions) {
		this.options = new GlobalOptions(options);

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
