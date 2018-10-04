const User = require('../../models/user');
const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config');


passport.use(new FacebookStrategy({
	clientID:      config.providers.facebook.appId,
	clientSecret:  config.providers.facebook.appSecret,
	callbackURL:   config.server.siteHost + '/auth/facebook/callback',
	profileFields: ['email'],
	passReqToCallback: true
}, async function(req, accessToken, refreshToken, profile, done){

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
}));



module.exports