const Cart = require('../models/cart');
const Order = require('../models/order');

exports.get = async function(ctx, next) {
	let messages = ctx.locals.flash;
	console.log(messages);
	if (!ctx.session.cart) {
		return ctx.redirect('/shopping-cart');
	}

	let cart = new Cart(ctx.session.cart);

	ctx.body = ctx.render('shop/checkout', {totalPrice: cart.totalPrice, csrf: ctx.csrf, messages: messages})
	
};

exports.post = async function(ctx) {
	if (!ctx.session.cart) {
		return ctx.redirect('/shopping-cart');
	}

	let cart = new Cart(ctx.session.cart);

	let stripe = require('stripe')("sk_test_Uth9YAKZs9OeUNRq7VMPuG2P");

	try{
		var charge = await stripe.charges.create({
			amount: cart.totalPrice * 100,
			currency: "USD",
			source: ctx.request.body.stripeToken,
			description: "Test Charge"
		});
	} catch (e) {
		console.log(e);
		ctx.flash('error', e.message);
		ctx.redirect('/');
	}

	if (charge) {
		var order = new Order({
			user: ctx.req.user._id,
			cart: cart,
			address: ctx.request.body.address,
			name: ctx.request.body.name,
			paymentId: charge.id
		});


		try {
			let newOrder = await order.save();
			console.log(newOrder);

			ctx.flash('success', 'Successfully bought!');
			ctx.session.cart = null;
			ctx.redirect('/')
		} catch(e) {
			ctx.throw(e);
		}
	}
}