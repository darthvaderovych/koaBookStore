const config = require('config');
const pug = require('pug');
const path = require('path');
const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer-smtp-transport');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const juice = require('juice');


const transportEngine = new SMTPTransport({
	service: 'Gmail',
	debug: true,
	auth: {
		user: config.mailer.login,
		pass: config.mailer.password
	}
});

const transport = nodemailer.createTransport(transportEngine);

transport.use('compile', htmlToText());

module.exports = async function(options) {
	let message = {};
	let locals = Object.create(options);
	
	message.from = {
		name: config.mailer.sender.name,
		address: config.mailer.sender.address
	};

	message.html = pug.renderFile(path.join(config.template.root, 'email', options.template) + '.pug', locals	);
	message.html = juice(message.html);

	message.subject = options.subject;

	message.to = (typeof options.to == 'string') ? {address: options.to} : options.to;

	let transportResponse = await transport.sendMail(message);

}

