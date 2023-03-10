import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	details: {
		type: String,
	},
	steps: {
		type: String,
	},
	priority: {
		type: Number,
	},
	creator: {
		type: String,
	},
	assigned: {
		type: String,
	},
	version: {
		type: String,
	},
	User: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
	},
});

const Bugs = mongoose.model('Bugs', bugSchema);

export default Bugs;
