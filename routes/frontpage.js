// var Cart = require('../models/cart');


var Product = require('../models/product');
// var Order = require('../models/order');

exports.get = async function(ctx, next) {
	try {
		var result = await Product.find()
	} catch(e) {
		throw (e);
	};

	if (!result) {

		throw(e);
	} else {

		// ctx.body = ctx.render('shop/index', { title: 'Shopping Cart', products: result, successMsg: successMsg, noMessages: !successMsg});
		ctx.body = ctx.render('shop/index', { title: 'Shopping Cart', products: result});
	}

};