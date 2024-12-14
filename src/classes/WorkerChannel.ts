import WorkerMessenger from './WorkerMessenger';

const WorkerChannel = (() => {
	class WorkerChannel {
		private _worker: Worker | Window & typeof globalThis;
		private _fn: object = {};

		public constructor(worker: Worker | Window & typeof globalThis, fn: object | null = null) {
			this._worker = worker;

			if (fn) {
				this.fn = fn;
			}

			this._worker.onmessage = (event: MessageEvent) => {
				const { requestId, task, result, error } = event.data;

				if ((result || error) && requestId && WorkerMessenger.requests.has(requestId)) {
					const { resolve, reject, processResult } = WorkerMessenger.requests.get(requestId);
					WorkerMessenger.requests.delete(requestId);

					if (!error) {
						resolve(processResult ? processResult(result) : result);
					} else {
						reject(error);
					}

				} else if (task && requestId) {
					try {
						const result = this._fn[task.fn as keyof object].apply({}, task.args.length ? task.args : []);
						WorkerMessenger.get(
							this._worker,
							requestId,
							result,
						);

					} catch (error) {
						WorkerMessenger.get(
							this._worker,
							requestId,
							null,
							error,
						);
					}

				} else if (task) {
					this._fn[task.fn as keyof object].apply({}, task.args.length ? task.args : []);
				}
			};
		}

		public set fn(fn: object) {
			this._fn = fn;
		}

		public post(task: object, waitForResponse: boolean = false, processResult: Function | null = null): Promise<unknown> | void {
			return WorkerMessenger.post(
				this._worker,
				task,
				waitForResponse,
				processResult,
			);
		}
	}

	return WorkerChannel;
})();

export default WorkerChannel;
