const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const registerUser = async (req, res = response) => {
	let { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				ok: false,
				message: 'A user exists with that email'
			})
		}
		user = new User(req.body);
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);
		await user.save();
		const token = await generateJWT(user.id, user.name);
		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message: 'Please talk to the administrator'
		})
	}
}
const loginUser = async (req, res = response) => {
	let { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				ok: false,
				message: 'User does not exist'
			})
		}
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				message: 'Incorrect password'
			})
		}
		const token = await generateJWT(user.id, user.name);
		res.json({
			ok: true,
			message: 'login',
			uid: user.id,
			name: user.name,
			token
		})
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message: 'Please talk to the administrator'
		})
	}
}
const revalidateToken = async (req, res = response) => {
	const { uid, name } = req;
	const token = await generateJWT(uid, name);
	res.json({
		ok: true,
		token
	})
}

module.exports = {
	registerUser,
	loginUser,
	revalidateToken
};