const express = require('express');

const User = require('./user');

const router = express.Router();

// create a new user
router.post('/users', async (req, res) => {
	const { name, email, age } = req.body;

	try {
		const user = new User({ name, email, age });
		await user.save();
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Get all users
router.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;