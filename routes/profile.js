const Order = require('./../models/order');
const Cart = require('./../models/cart');

exports.get = async function(ctx, next) {
	try {
		let orders = await Order.find({user: ctx.req.user});

		let cart;
		console.log(orders);
		orders.forEach((order) => {
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		
		ctx.body = ctx.render('user/profile', {orders: orders});
	} catch (e) {
		ctx.throw(e);
	}

};