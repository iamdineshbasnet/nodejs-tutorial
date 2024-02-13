const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../../models/users');

// login
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ message: 'Authentication Failed' });
        }
        const token = jwt.sign({ email: user.email, _id: user._id }, 'RESTFULAPIs');
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
