let User = require('../models/user');

exports.get = async function(ctx, next) {
	let token = ctx.params.token;

	let user = await User.findOne({ token: token});

	if (!user || user.confirmed) ctx.throw(404);

	user.confirmed = true;
	user = await user.save();

	await ctx.login(user);
	ctx.redirect('/');
}