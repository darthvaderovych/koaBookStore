

exports.get = async function(ctx, next) {
	ctx.logout();
	ctx.redirect('/');
};