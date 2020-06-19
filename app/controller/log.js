import Log from '../models/log';

const addLog = (payload) => {
	return new Promise((resolve, reject) => {
		let log = {};
		try {
			log = new Log(payload, false);
		} catch (error) {
			reject(error);
		}
		console.log(log);

		log.save((err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

const getLogs = (identifier) => {
	return new Promise((resolve, reject) => {
		Log.find(identifier, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

module.exports = { addLog, getLogs };
