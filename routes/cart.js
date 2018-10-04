const Cart = require('../models/cart');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.add = async function(ctx, next) {
	let productId = ctx.params.id;
	let cart = new Cart(ctx.session.cart ? ctx.session.cart : {items: {}});

	if (!mongoose.Types.ObjectId.isValid(productId)) {
		ctx.throw(404, 'Invalid product id.');
	};

		let product = await Product.findById(productId);

	if(!product) {
		return ctx.redirect('/');
	}

	cart.add(product, productId)
	ctx.session.cart = cart;
	// ctx.redirect('/');
	ctx.status = 200;
};

exports.get = async function(ctx, next) {

	if (!ctx.session.cart) {
		return ctx.body = ctx.render('shop/shopping-cart', {products: null});
	};

	let cart = new Cart(ctx.session.cart);
	
	ctx.body = ctx.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
};

exports.reduce = async function(ctx, next) {
	let productId = ctx.params.id;
	let cart = new Cart(ctx.session.cart ? ctx.session.cart : {items: {}});

	if (!mongoose.Types.ObjectId.isValid(productId)) {
		ctx.throw(404, 'Invalid product id.');
	};

	cart.reduceByOne(productId);
	ctx.session.cart = cart;
	// ctx.redirect('/shopping-cart');
	ctx.body = cart;
};

exports.addOneMore = async function(ctx, next) {
	let productId = ctx.params.id;
	let cart = new Cart(ctx.session.cart ? ctx.session.cart : {items: {}});

	if (!mongoose.Types.ObjectId.isValid(productId)) {
		ctx.throw(404, 'Invalid product id.');
	};

	cart.addOneMore(productId);
	ctx.session.cart = cart;
	// ctx.redirect('/shopping-cart');
	ctx.body = cart;

};

exports.remove = async function(ctx, next) {
	let productId = ctx.params.id;
	let cart = new Cart(ctx.session.cart ? ctx.session.cart : {items: {}});

	if (!mongoose.Types.ObjectId.isValid(productId)) {
		ctx.throw(404, 'Invalid product id.');
	};

	cart.removeItem(productId);
	ctx.session.cart = cart;
	// ctx.redirect('/shopping-cart');
	ctx.body = cart;
}