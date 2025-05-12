const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.get('/', async (req, res) => {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
});

router.post('/', async (req, res) => {
    const { sender, content } = req.body;
    const message = new Message({ sender, content });
    await message.save();
    res.status(201).json(message);
});

module.exports = router;