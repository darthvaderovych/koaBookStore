const passport = require('koa-passport');
const User = require('./../models/user');
const config = require('config');
// const sendMail = require('../libs/sendMail');
// const uuidv4 = require('uuid/v4');



exports.get = async function(ctx, next) {
	let messages = ctx.locals.flash;
	try{
		ctx.body = ctx.render('user/register', {title: 'Register', csrf: ctx.csrf});
	} catch (e) {
		ctx.throw(e);
	}
};

exports.post = async function(ctx, next) {


	// const token = uuidv4();

	// try {

	// 	let user = await User.findOne({ email: ctx.request.body.email});
	// 	if (user) {
	// 		ctx.flash('error', 'Email is already in use.');
	// 		ctx.redirect('/user/register');
	// 	}

	// 	const newUser = new User({
	// 		email: ctx.request.body.email,
	// 		password: ctx.request.body.password,
	// 		// token: token
	// 	});

	// // 	await newUser.save(); 

	// 	// await sendMail({
	// 	// 	to: newUser.email,
	// 	// 	template: 'verify-email',
	// 	// 	subject: 'Email confirmation',
	// 	// 	link: config.server.siteHost + '/verify-email/' + token
	// 	// });

	// 	// ctx.redirect('/confirm');


	// } catch (e) {
	// 	if (e.name == 'ValidationError') {
	// 		ctx.flash('error', 'ValidationError')
	// 		ctx.redirect('/user/register');
	// 	} else throw(e);

	// }
	console.log(ctx);

	let oldUrl = ctx.session.oldUrl;
	if (oldUrl) {
		await passport.authenticate('local.register', {
			successRedirect: oldUrl,
			failureRedirect: '/user/register',
			failureFlash: true
		})(ctx, next);
		ctx.session.oldUrl = null;
	}else {
		await passport.authenticate('local.register', {
			successRedirect: '/user/profile',
			failureRedirect: '/user/register',
			failureFlash: true
		})(ctx, next);
	}
};

