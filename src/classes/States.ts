import Secret from './Secret';
import IStates from './IStates';

const States = (() => {
	class States implements IStates {
		public constructor(states: IStates | null = null) {
			this.created = states?.created;
			this.clearing = states?.clearing;
			this.drawing = states?.drawing;
		}

		public get created(): boolean {
			return Secret.get(this, 'created');
		}
		public set created(created: boolean | undefined) {
			if (created) {
				Secret.set(this, 'created', true);

			} else {
				Secret.set(this, 'created', false);
			}
		}

		public get clearing(): boolean {
			return Secret.get(this, 'clearing');
		}
		public set clearing(clearing: boolean | undefined) {
			if (clearing) {
				Secret.set(this, 'clearing', true);

			} else {
				Secret.set(this, 'clearing', false);
			}
		}

		public get drawing(): boolean {
			return Secret.get(this, 'drawing');
		}
		public set drawing(drawing: boolean | undefined) {
			if (drawing) {
				Secret.set(this, 'drawing', true);

			} else {
				Secret.set(this, 'drawing', false);
			}
		}

		public toObject(): object {
			return {
				created: this.created,
				clearing: this.clearing,
				drawing: this.drawing
			};
		}
	}

	return Object.freeze(States);
})();

export default States;
