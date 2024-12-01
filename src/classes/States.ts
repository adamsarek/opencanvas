import Secret from './Secret';
import IStates from './IStates';

const States = (() => {
	class States implements IStates {
		public constructor(states: IStates | null = null) {
			this.created = states?.created;
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

		public toObject(): object {
			return {
				created: this.created
			};
		}
	}

	return Object.freeze(States);
})();

export default States;
