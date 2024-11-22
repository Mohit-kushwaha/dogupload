const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const { response } = require('express');

dotenv.config();

exports.register = async (req, res) =>
{
    try
    {
        const { username, password } = req.body;
        const isUserPresent = await User.find({ username: username});

        if(isUserPresent.length > 0){
            res.status(403).json({ message: 'User already exist' });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) =>
{
    try
    {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password)))
        {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};
