import WorkerChannel from './WorkerChannel';

let obj = {};

const workerChannel = new WorkerChannel(self, {
	get: (data) => {
		console.log('worker', 'get', data);
		return obj;
	},
	set: (data) => {
		console.log('worker', 'set', data);
		obj = data;
	},
});
