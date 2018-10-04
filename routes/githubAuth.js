const passport = require('koa-passport');

exports.get = async (ctx, next) => {
	await passport.authenticate('github', {scope: ['email']})(ctx, next);
};

exports.getCallback = async (ctx, next) => {
	let oldUrl = ctx.session.oldUrl;

	if (oldUrl) {
		await passport.authenticate('github', {
		successRedirect: oldUrl,
		failureRedirect: '/user/register'})(ctx, next);
		ctx.sessiion.oldUrl = null;
	} else {
		await passport.authenticate('github', {
		successRedirect: '/user/profile',
		failureRedirect: '/user/register'})(ctx, next);
	}
};
