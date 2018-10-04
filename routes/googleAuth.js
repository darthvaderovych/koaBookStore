const passport = require('koa-passport');

exports.get = async (ctx, next) => {
	await passport.authenticate('facebook', {scope: ['email']})(ctx, next);
};

exports.getCallback = async (ctx, next) => {
	await passport.authenticate('google', {successRedirect: '/user/profile', failureRedirect: '/user/register'})
}