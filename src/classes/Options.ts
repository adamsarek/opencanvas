import IOptions from "./IOptions";

export default class Options implements IOptions {
	#selector: string | string[] | null = null;
	#theme: string | null = null;
	
	public constructor(options: IOptions) {
		this.selector = options?.selector;
		this.theme = options?.theme;
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

	get theme(): string {
		const theme = this.#theme;

		if (typeof theme === 'string' && theme?.length > 0) {
			return theme;

		} else {
			return 'default';
		}
	}
	set theme(theme: string) {
		this.#theme = theme;
	}
}
