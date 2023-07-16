const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    description: { type: String, required: true },
    imageUrl: { type: String },
    required: { type: Boolean },
});

module.exports = mongoose.model('Book', bookSchema);