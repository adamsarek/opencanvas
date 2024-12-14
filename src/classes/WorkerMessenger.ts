const WorkerMessenger = (() => {
	class WorkerMessenger {
		private static _instance: WorkerMessenger;
		private static _requestId: number = 0;
		public static requests: Map<string, object> = new Map();

		private constructor() {}

		public static get instance(): WorkerMessenger {
			if (!this._instance) {
				this._instance = new WorkerMessenger();
			}
			return this._instance;
		}

		public static post(worker: Worker | Window & typeof globalThis, task: object, waitForResponse: boolean = false, processResult: Function | null = null): Promise<unknown> | void {
			// Request for response
			if (waitForResponse) {
				return new Promise((resolve, reject) => {
					const requestId = (++this._requestId).toString();

					this.requests.set(requestId, { resolve, reject, processResult });

					worker.postMessage({
						requestId,
						task,
					});
				});
			}

			// Request only
			worker.postMessage({ task });
		}

		public static get(worker: Worker | Window & typeof globalThis, requestId: string, result: object | null = null, error: string | null = null): Promise<unknown> | void {
			worker.postMessage({
				requestId,
				result,
				error,
			});
		}
	}

	return WorkerMessenger;
})();

export default WorkerMessenger;
