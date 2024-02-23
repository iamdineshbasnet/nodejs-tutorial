const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../models/users');

router.post('/', async (req, res) => {
	const { email, username, password } = req.body;
	try {
		// check all the data
		if (!(username && email && password)) {
			res.status(400).send('All fields are required.');
		}
		// check if user already exist
		const isExist = await User.findOne({ email });
		if (isExist) {
			res.status(400).send('user already exist');
		}

		// encrypt the password
		const encryptPwd = await bcrypt.hash(password, 10);

		// save the user in DB
		const user = new User({ email, username, password: encryptPwd });
		await user.save();

		user.password = undefined;
		res.status(201).json(user);

	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
