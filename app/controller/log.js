import Log from '../models/log';

export const addLog = (payload) => {
	return new Promise(async (resolve, reject) => {
		let log = {};
		try {
			log = new Log(payload, false);
		} catch (error) {
			reject(error);
		}

		try {
			const result = await log.save();
			resolve(result);
		} catch (err) {
			reject(err);
		}
	});
};

export const getLogs = (identifier, limit) => {
	return new Promise(async (resolve, reject) => {
		try {
			const data = await Log.find(identifier).sort('-datetime').limit(limit).exec();
			resolve(data);
		} catch (err) {
			reject(err);
		}
	});
};

export const getDHTData = () => {
	return getLogs({ deviceName: 'DHT Sensor', type: 'sensor' }, 1000);
};
