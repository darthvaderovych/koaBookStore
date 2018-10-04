const mongoose = require('mongoose');

const messsageSchema = new mongoose.Schema({
	nickname: {type: String, required: true},
	message: {type: String, required: true}

});

module.exports = mongoose.model('Message', messsageSchema);