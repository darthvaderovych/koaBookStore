const Koa = require('koa');
const app = new Koa();
const passport = require('koa-passport')

const PORT = process.env.PORT || 3000;


const config = require('config');
const mongoose = require('./libs/mongoose')
const CSRF = require('koa-csrf');

app.keys = [config.secret];

const path = require('path');
const fs = require('fs');

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
	app.use(require('./middlewares/' + middleware));
});

if (process.env.NODE_ENV === 'production') {
	app.use(new CSRF());
};



app.use(async function(ctx, next) {
	let sessCart = ctx.session.cart;
	ctx.locals.login = ctx.isAuthenticated();
	ctx.locals.cart = sessCart;
	ctx.locals.cartQty = sessCart ? sessCart.totalQty : 0;
	await next();
});

isLoggedIn = async function isLoggedIn(ctx, next) {
	if (ctx.isUnauthenticated()) {
		ctx.session.oldUrl = ctx.request.url;
		ctx.redirect('/user/signin');
	}
	await next();
};

notLoggedIn = async function notLoggedIn(ctx, next) {
	if (ctx.isAuthenticated()) {
		ctx.redirect('/');
	}
	await next();
}

const Router = require('koa-router');

const router = new Router();


router.get('/', require('./routes/frontpage').get);
router.get('/user/register', notLoggedIn, require('./routes/register').get);
router.post('/user/register', notLoggedIn, require('./routes/register').post);
router.get('/user/profile', isLoggedIn, require('./routes/profile').get);
router.get('/user/signin', require('./routes/signin').get);
router.post('/user/signin', require('./routes/signin').post);
router.get('/user/logout', isLoggedIn, require('./routes/logout').get);
router.get('/add-to-cart/:id', require('./routes/cart').add);
router.get('/shopping-cart/', require('./routes/cart').get);
router.get('/add/:id', require('./routes/cart').addOneMore);
router.get('/remove/:id', require('./routes/cart').remove);
router.get('/reduce/:id', require('./routes/cart').reduce);
router.get('/checkout', isLoggedIn, require('./routes/checkout').get);
router.post('/checkout', isLoggedIn, require('./routes/checkout').post);
router.get('/auth/facebook', require('./routes/facebookAuth').get);
router.get('/auth/facebook/callback', require('./routes/facebookAuth').getCallback);
router.get('/auth/google', require('./routes/googleAuth').get);
router.get('/auth/google/callback', require('./routes/googleAuth').getCallback);
router.get('/auth/github', require('./routes/githubAuth').get);
router.get('/auth/github/callback', require('./routes/githubAuth').getCallback);
router.get('/confirm', async (ctx, next) => {ctx.body = ctx.render('shop/confirm')});
router.get('/verify-email/:token', require('./routes/verify').get);
router.get('/chat', require('./routes/chat').get);


app.use(router.routes());

const socket = require('./libs/socket');

const server = app.listen(PORT, function(){
	console.log('app is listening on ort ', PORT )
	console.log('run in "' + process.env.NODE_ENV + '" environment ');
});

socket(server);

module.export = app;
