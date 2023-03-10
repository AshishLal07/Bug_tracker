import Bugs from '../Models/Bugs.js';
import mongoose from 'mongoose';

export const createBug = async (req, res) => {
	try {
		console.log(req.body, req.params.id);
		const newBug = await Bugs.create(req.body);
		console.log(newBug);
		if (!newBug)
			return res.status(400).json({ msg: 'cannot able to create bug ' });
		newBug.User = req.params.id;
		await newBug.save();
		const ObjectId = mongoose.Types.ObjectId(req.params.id);
		const bugs = await Bugs.find({ User: ObjectId });
		console.log(bugs.length);
		return res.status(200).json(bugs);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export const getBugs = async (req, res) => {
	try {
		const userId = mongoose.Types.ObjectId(req.params.id);
		const bugs = await Bugs.find({ User: userId });
		if (!bugs) return res.status(400).json('cannot find user Bugs');

		return res.status(200).json(bugs);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export const deleteBug = async (req, res) => {
	try {
		// console.log(req.params.id, req.params.bugId);
		const ObjectId = mongoose.Types.ObjectId(req.params.id);
		// console.log(ObjectId);
		const bugId = req.params.bugId;
		await Bugs.findByIdAndDelete(bugId);
		const bugs = await Bugs.find({ User: ObjectId });
		// console.log(bugs);

		return res.status(200).json(bugs);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export const updateBug = async (req, res) => {
	try {
		console.log(req.params.bugId);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
