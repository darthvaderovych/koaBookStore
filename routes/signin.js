const passport = require('koa-passport');

exports.get = async function(ctx, next) {
	let messages = ctx.locals.flash;
	try {
		ctx.body = ctx.render('user/signin', {title: 'Sign In', csrf: ctx.csrf, messages: messages})
	} catch(e) {
		ctx.throw(e);
	};
};



exports.post = async function(ctx, next) {
	let oldUrl = ctx.session.oldUrl;
	if (oldUrl) {
		await passport.authenticate('local.signin', {
			successRedirect: oldUrl,
			failureRedirect: '/user/signin',
			failureFlash: true
		})(ctx, next);
		ctx.session.oldUrl = null;
	}else {
		await passport.authenticate('local.signin', {
			successRedirect: '/user/profile',
			failureRedirect: '/user/signin',
			failureFlash: true
		})(ctx, next);
	}

	// function () {
	// 	if(ctx.session.oldUrl) {
	// 		ctx.redirect(ctx.session.oldUrl);
	// 		ctx.session.oldUrl = null;
	// 	} else {
	// 		ctx.redirect('/user/profile');
	// 	};
	// }

};