import middleware from '../../middleware/index';
import LogController from '../../controller/log';
import io from 'socket.io-client';
// import mail from '../../controller/nodemailer';

// SOCKET EMITTER
const socketURL = process.env.socketURL;
const socket = io(`${socketURL}`);

export default (req, res) => {
	// Get data from your database
	if (req.method === 'GET') {
		LogController.getLogs()
			.then((data) => res.status(200).json({ data }))
			.catch((err) => {
				console.log(err);
				res.status(400);
			});
	} else if (req.method === 'POST') {
		console.log(req.body);
		LogController.addLog(req.body)
			.then((data) => {
				socket.emit('message', data);
				return res.status(200).json({ data });
			})
			.catch((err) => {
				console.log(err);
				res.status(400);
			});
	}
};
