const User = require('../..models/user');
const config = require('config');
const co = require('co');
const request = require('request-promise');

function UserAuthError(message) {
	this.message = message;
};

module.exports = async function(req, profile, done) {
	const userToConnect = req.user;

	const providerNameId = makeProviderId(profile);

	let user;

	if (userToConnect) {
		const alreadyConnectedUser = await User.findOne({
			"providers.nameId": providerNameid,
			_id: 				{$ne: userToConnect._id}
		});	

		if (alreadyConnectedUser) {

			for (let i = 0; i < alreadyConnectedUser.providers.length; i++) {
				const provider = alreadyConnectedUser.providers[i];
				if (provider.nameId == providerNameid) {
					provider.remove();
					i--;
				}

			}
			await alreadyConnectedUser.save();
		}

		user = userToConnect;

	} else {
		user = await User.findOne({"providers.nameId": providerNameid});

		if (!user) {

			user = await User.findOne({email: profile.emails[0].value});

			if(!user) {
				user = new User();
			}
		}
	}

	mergeProfile(user, profile);

	try {
		await user.validate();
	} catch (e) {
		console.log(e);

		throw new UserAuthError (" no email")
	};

	try {
		await user.save();
		done(null, user);
	} catch (err) {
		if (err instanceof UserAuthError) {
			done(null)
		}
	}


}