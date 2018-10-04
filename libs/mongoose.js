const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = Promise;

const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.connect(config.mongoose.db, {
	useMongoClient: true
});
mongoose.set('debug', config.mongoose.debug);

mongoose.plugin(beautifyUnique);

module.exports = mongoose;