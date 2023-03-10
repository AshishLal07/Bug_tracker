import bcryct from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../models/Users.js';

export const createUser = async (req, res) => {
	try {
		console.log(req.body);
		const { password } = req.body;
		const salt = await bcryct.genSalt();
		const passwordHash = await bcryct.hash(password, salt);

		const newUser = await User.create(req.body);
		newUser.password = passwordHash;
		await newUser.save();
		console.log(newUser);
		return res.status(200).json(newUser);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export const login = async (req, res) => {
	try {
		console.log(req.body);
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		console.log(user, email);
		if (!user) return res.status(400).json({ msg: 'user does not exist' });

		const isMatch = await bcryct.compare(password, user.password);
		console.log(isMatch);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid Credential ' });

		const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		// user.remove({ password });
		const tempUser = user.toObject();
		// console.log(tempUser, user);
		delete tempUser.password; // delete password of found user from database before sending to frontend
		// tempUser.save();
		// console.log(tempUser, user);
		res.status(200).json({ token, tempUser });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
