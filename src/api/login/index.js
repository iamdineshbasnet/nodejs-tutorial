const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../models/users');

// login
router.post('/', async (req, res) => {
	const { email, password } = req.body;
	try {
		// validation
		if (!(email && password)) {
			res.status(400).send('invalid credentials');
		}
		// find user in DB
		const user = await User.findOne({ email });
		const isPasswordMatched = await bcrypt.compare(password, user.password)
		
		// match the password
		if (user && isPasswordMatched) {
			const accessToken = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
				expiresIn: '1h',
			});
			const refreshToken = jwt.sign({ id: user._id , email}, process.env.JWT_REFRESH_TOKEN_SECRET, {
				expiresIn: '5d',
			});
			user.password = undefined;

			res.status(201).json({
				message: 'login sucessfull',
				isLogged: 'true',
				user,
				accessToken,
				refreshToken,
			});
		}else{
			res.send("invalid credentials")
		}
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
