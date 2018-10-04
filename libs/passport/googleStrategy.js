const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/user');
const config = require('config');

passport.use(new GoogleStrategy({
	clientID:     config.providers.google.appId,
	clientSecret: config.providers.google.appSecret,
	callbackURL:  config.server.siteHost + '/auth/google/callback'
},

async function(req, accessToken, refreshToken, profile, done) {
	try {
			let user = await User.findOne({'email': profile.emails[0].value});
			console.log(user);
			if (user) {

				return done(null, user);
			};


			let newUser = new User();
			newUser.email = profile.emails[0].value;

			await newUser.save();

			return done(null, newUser);

		} catch (e) {
			return done(e)
		}

}

));


module.exports

