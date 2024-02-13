const express = require('express');

const router = express.Router();

const User = require('../../models/users');

router.post('/', async (req, res, next) => {
	try {
		if (req.user) {
			res.send(req.user);
			next();
		} else {
			res.status(401).json({ message: 'Invalid token' });
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
