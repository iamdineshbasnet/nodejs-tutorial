const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../../models/users');

router.get('/', authenticateToken, async (req, res) => {
	try {
		const email = req.user.email;
		const user = await User.findOne({ email });
		user.password = undefined;
		res.json(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/', authenticateToken, async (req, res) => {
	try {
		const { username, dob, bio, gender } = req.body;
		const userEmail = req.user.email;

		// Find the user by email
		const user = await User.findOne({ email: userEmail });

		// Update user properties if provided in the request body
		if (username) user.username = username;
		if (dob) user.dob = dob;
		if (bio) user.bio = bio;
		if (gender) user.gender = gender;

		// Save the updated user object
		await user.save();

		user.password = undefined
		// Return the updated user object as response
		res.json(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];

	//Extracting token from authorization header
	const token = authHeader && authHeader.split(' ')[1];

	//Checking if the token is null
	if (!token) {
		return res.status(401).send('Authorization failed. No access token.');
	}

	//Verifying if the token is valid.
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(401).send('Could not verify token');
		}
		req.user = user;
		next();
	});
}

module.exports = router;
