import Secret from './Secret';
import IOptions from './IOptions';

const Options = (() => {
	class Options implements IOptions {
		public constructor(options: IOptions | null = null) {
			this.selector = options?.selector;
			this.theme = options?.theme;
		}

		public get selector(): string {
			return Secret.get(this, 'selector');
		}
		public set selector(selector: string | string[] | undefined) {
			if (Array.isArray(selector) && selector.every((value: string) => typeof value === 'string') && selector?.length > 0) {
				Secret.set(this, 'selector', `.${(selector as string[]).join(' .')}`);

			} else if (typeof selector === 'string' && selector?.length > 0) {
				Secret.set(this, 'selector', (selector as string));

			} else {
				Secret.set(this, 'selector', '.opencanvas');
			}
		}

		public get theme(): string {
			return Secret.get(this, 'theme');
		}
		public set theme(theme: string | undefined) {
			if (typeof theme === 'string' && theme?.length > 0) {
				Secret.set(this, 'theme', theme);

			} else {
				Secret.set(this, 'theme', 'default');
			}
		}

		public toObject(): object {
			return {
				selector: this.selector,
				theme: this.theme
			};
		}
	}

	return Object.freeze(Options);
})();

export default Options;
