const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../models/users');

router.post('/', async (req, res) => {
	const { email, username, password } = req.body;
	try {
		const user = new User({ email, username, password });
		user.password = bcrypt.hashSync(password, 10);
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
