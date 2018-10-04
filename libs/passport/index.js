const passport = require('koa-passport');
const User = require('../../models/user');

require('./serialize');

require('./localStrategy');
require('./facebookStrategy');
require('./googleStrategy');
require('./githubStrategy');

module.exports = passport;