const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({

    imageUrl: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dog', DogSchema);
