const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get = async function (ctx, next) {

	// let productId = ctx.params.id;

	// if(!mongoose.Types.ObjectId.isValid(productId)) {
	// 	ctx.throw(404, 'Invalid product id');

	// };

	// let product = await Product.findById(productId);




	ctx.body = ctx.render('shop/chat');
}