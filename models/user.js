const mongoose = require('mongoose');
const crypto = require('crypto');
const _= require('lodash');
const config = require('config');

const userShema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		validate: [
			{
				validator: function checkEmail(value) {
					return this.deleted ? true : /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
				},
				msg: 'Please enter valid email.'
			}
		]
	},
	deleted: Boolean,
	passwordHash: {
		type: String,
	},

	salt: {
		type: String,
	},
	token: {
		type: String,
		index: true
	},
	confirmed: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

userShema.virtual('password')
	.set(function(password) {
		if (password !== undefined) {
			if (password.length < 4) {
				this.invalidate('password', 'Password must not be less than 4 symbols.');
			}
		}

		this._plainPassword = password;

		if (password) {
			this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
			this.passwordHash = crypto.pbkdf2Sync(password, this.salt, config.crypto.hash.iterations, config.crypto.hash.length,'sha1').toString('base64');
		} else {
			this.salt = undefined;
			this.passwordHash = undefined;
		}
	})
	.get(function() {
		return this._plainPassword;
	});

userShema.methods.checkPassword = function(password) {
	if (!password) return false;
	if (!this.passwordHash) return false;

	return crypto.pbkdf2Sync(password, this.salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha1').toString('base64') == this.passwordHash;
};

module.exports = mongoose.model('User', userShema);