const Secret = (() => {
	const weakMap = new WeakMap();
	const wmInit = (self: object) => {
		return weakMap.get(self) || {};
	};
	const wmGet = (self: object, key: string) => {
		return weakMap.get(self)?.[key];
	};
	const wmSet = (self: object, data: object) => {
		return weakMap.set(self, data);
	};

	class Secret {
		private constructor() {}

		public static get instance(): Secret {
			const instance: Secret = wmGet(this, 'instance');

			if (!wmGet(this, 'instance')) {
				this.set(this, 'instance', new Secret());
			}

			return instance;
		}

		public static get(self: object, key: string) {
			return wmGet(self, key);
		}

		public static set(self: object, key: string, value: unknown) {
			const wm = wmInit(self);

			if (value && typeof value === 'object') {
				wm[key] = new Proxy(value, {
					get: (t, k) => {
						return t[k];
					},
					set: (t, k, v) => {
						// If class has setter for specified key, use it
						if (Object.getOwnPropertyDescriptor(self[key], key)?.set) {
							self[key] = Object.assign(
								t.toObject(),
								{ [k]: v }
							);

						} else {
							t[k] = v;
						}
						return true;
					}
				})

			} else {
				wm[key] = value;
			}

			wmSet(self, wm);
			
			return this.get(self, key);
		}
	}

	return Secret;
})();

export default Secret;
