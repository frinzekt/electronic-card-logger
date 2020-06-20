import mongoose from 'mongoose';

const logSchema = mongoose.Schema(
	{
		deviceName: {
			type: String,
			required: true,
		},
		type: {
			type: String,
		},
	},
	{ collection: 'ECL_logs', timestamps: { createdAt: 'datetime' } }
);

module.exports = mongoose.models.Log || mongoose.model('Log', logSchema);
