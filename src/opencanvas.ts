export class Type {
	private static _instance: Type;

	private constructor() { }

	public static get instance(): Type {
		if (!Type._instance) {
			Type._instance = new Type();
		}

		return Type._instance;
	}
	
	public static isString(value: unknown): boolean {
		return typeof value === 'string';
	}

	public static isArray(values: unknown): boolean {
		return Array.isArray(values);
	}

	public static isStringArray(values: unknown): boolean {
		return Array.isArray(values) && values.every((value: unknown) => this.isString(value));
	}
}

export class OpenCanvasCache {
	private static _instance: OpenCanvasCache;

	private constructor() { }

	public static get instance(): OpenCanvasCache {
		if (!OpenCanvasCache._instance) {
			OpenCanvasCache._instance = new OpenCanvasCache();
		}

		return OpenCanvasCache._instance;
	}

	public static get createdElement(): Element {
		const containerElement: Element = document.createElement('div');
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
}

export interface OpenCanvasOptions {
	selector: string | Array<string>;
}

export default class OpenCanvas {
	private options: OpenCanvasOptions;
	
	public constructor(options: OpenCanvasOptions) {
		this.options = options;

		this.create();
	}

	public create(): void {
		this.replaceElements();
	}

	private getSelector(): string {
		const selector: string | Array<string> = this.options?.selector;

		if (Type.isStringArray(selector) && selector?.length > 0) {
			return `.${(selector as Array<string>).join(' .')}`;

		} else if (Type.isString(selector) && selector?.length > 0) {
			return (selector as string);

		} else {
			return '.opencanvas';
		}
	}

	private selectElements(): NodeListOf<Element> {
		const selector: string = this.getSelector();

		return document.querySelectorAll(selector);
	}

	private replaceElements(): void {
		const selectedElements: NodeListOf<Element> = this.selectElements();

		for (const selectedElement of selectedElements) {
			const parentElement: ParentNode | null = selectedElement.parentNode;
			const createElement: Element = OpenCanvasCache.createdElement;

			if (parentElement && createElement) {
				parentElement?.insertBefore(createElement, selectedElement);
			}
			
			selectedElement.remove();
		}
	}
}
