const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
    maxBookId: { type: String },
    maxAuthorId: { type: String },
    maxLogId: { type: String },
    maxUserId: { type: String }
});

module.exports = mongoose.model('Sequence', sequenceSchema);