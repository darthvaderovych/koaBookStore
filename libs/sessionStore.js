const MongooseStore = require('koa-session-mongoose');

module.exports = new MongooseStore ({
	model:   'Session',
	expires: 3600 * 4
});
