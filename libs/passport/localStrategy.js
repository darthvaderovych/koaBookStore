const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

passport.use('local.register', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},

async function(req, email, password, done) {
		
	try{
		let user = await User.findOne({ email });

		if (user) {
			return done(null, false, { message: 'Email is already in use' });
		}

		let newUser = new User();
		newUser.email = email;
		newUser.password = password;

		await newUser.save();

		return done(null, newUser);

	} catch(e) {
		return done(e)
		}

	}));

passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},

async function(req, email, password, done) {
	try{
		let user = await User.findOne({ 'email': email });
			console.log(user);

		if(!user) {
			return done(null, false, { message: 'Incorrect email.' });
		};

		if (!user.checkPassword(password)) {
			return done(null, false, { message: 'Incorrect password.' });
		}

		return done(null, user);

	} catch (e) {
		return done(e);
	}

	}));


module.exports