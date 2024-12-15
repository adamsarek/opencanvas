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

		public static set(self: object, key: string, value: unknown, proxy: boolean = true) {
			const wm = wmInit(self);

			if (proxy && value && typeof value === 'object') {
				wm[key] = new Proxy(value, {
					get: (prop: object, propKey: keyof object) => {
						return prop[propKey];
					},
					set: (prop: object, propKey: keyof object, propValue: unknown) => {
						// If class has setter for specified key, use it
						if (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(self), key)?.set) {
							let propClone;

							try {
								propClone = structuredClone(prop);
							} catch(err) {
								propClone = prop;
							}

							self[key as keyof object] = Object.assign(
								propClone,
								{ [propKey]: propValue }
							);

						} else {
							prop[propKey as keyof object] = propValue;
						}
						return true;
					}
				});

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
