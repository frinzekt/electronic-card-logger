import middleware from '../../middleware/index';
import LogController from '../../controller/log';
// import mail from '../../controller/nodemailer';

export default (req, res) => {
	// Get data from your database
	if (req.method === 'GET') {
		LogController.getLogs()
			.then(data => res.status(200).json(data))
			.catch(err => {
				console.log(err);
				res.status(400);
			});
	} else if (req.method === 'POST') {
		LogController.addLog(req.body)
			.then(data => res.status(200).json(data))
			.catch(err => {
				console.log(err);
				res.status(400);
			});
	}
};
