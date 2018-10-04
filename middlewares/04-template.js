const pug = require('pug');

const config = require('config');
const path = require('path');

module.exports = async function(ctx, next) {


	ctx.locals = {
		get user() {
			return ctx.req.user;
		},

		get flash() {
			return ctx.flash();
		}
	};

	ctx.locals.csrf = function() {
		return ctx.csrf;
	};


//TO DO
// ctx.locals
	ctx.render = function(templatePath, locals) {
		locals = locals || {};

		const localsFull = Object.create(ctx.locals);

		for(const key in locals) {
			localsFull[key] = locals[key];
		}

		const templatePathResolved = path.join(config.template.root, templatePath + '.pug');

		return pug.renderFile(templatePathResolved, localsFull);

	};

	await next();
};


