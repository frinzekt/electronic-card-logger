import middleware from '../../middleware/index';
import { getLogs, addLog } from '../../controller/log';
import io from 'socket.io-client';
// import mail from '../../controller/nodemailer';

export default async (req, res) => {
	// Get data from your database
	if (req.method === 'GET') {
		try {
			const data = await getLogs({}, 20);
			res.status(200).json({ data });
		} catch (err) {
			console.log(err);
			res.status(400);
		}
	} else if (req.method === 'POST') {
		try {
			const result = await addLog(req.body);
			// SOCKET EMITTER
			const socketURL = process.env.socketURL;
			const socket = io(`${socketURL}`);
			socket.emit('message', result);
			return res.status(200).json({ result });
		} catch (err) {
			console.log(err);
			res.status(400);
		}
	}
};
