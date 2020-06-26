import middleware from '../../middleware/index';
import { getDHTData } from '../../controller/log';

export default async (req, res) => {
	// Get data from your database
	if (req.method === 'GET') {
		try {
			const data = await getDHTData();
// 			console.log(data.slice(0, 3));
// 			const castedData = data.map((datum) => {
// 				const { payload, humidity, datetime } = Object(datum);
// 				return {
// 					payload,
// 					temperature: parseFloat(payload),
// 					humidity: parseFloat(humidity),
// 					datetime,
// 				};
// 			});
// 			console.log(castedData.slice(0, 3));
// 			const filteredCastedData = castedData.filter((datum) => {
// 				return datum.temperature && datum.humidty;
// 			});
			res.status(200).json({ data: data });
		} catch (err) {
			console.log(err);
			res.status(400);
		}
	}
};
