var Product = require('../models/product');
var mongoose = require('mongoose');


mongoose.connect('localhost:27017/testShop');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

var products = [
	new Product({
		imagePath: 'https://s-media-cache-ak0.pinimg.com/originals/f4/28/e2/f428e252f8e36318716d06633cc430ce.jpg',
		title: 'A Farewell to Arms',
		author: 'Ernest Hemingway',
		description: 'A Farewell to Arms is about a love affair between the expatriate American Henry and Catherine Barkley against the backdrop of the First World War.',
		price: 19
	}),
	new Product({
		imagePath: 'https://images-na.ssl-images-amazon.com/images/I/516yP3uDS1L._SY344_BO1,204,203,200_.jpg',
		title: 'All Quiet on the Western Front',
		author: 'Erich Maria Remarque',
		description: 'The book describes the German soldiers\' extreme physical and mental stress during the war, and the detachment from civilian life felt by many of these soldiers upon returning home from the front.',
		price: 17
	}),
	new Product({
		imagePath: 'http://www.e-reading.club/cover/70/70961.jpg',
		title: 'The Final Diagnosis',
		author: 'Arthur Hailey',
		description: 'A look at the workings of a modern day hospital through the lens of the pathologists department.',
		price: 29
	}),
	new Product({
		imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51DUiPuAGZL._SY344_BO1,204,203,200_.jpg',
		title: 'The Shining',
		author: 'Stephen King',
		description: 'The Shining centers on the life of Jack Torrance, an aspiring writer and recovering alcoholic who accepts a position as the off-season caretaker of the historic Overlook Hotel in the Colorado Rockies.',
		price: 26
	}),
	new Product({
		imagePath: 'https://flavorwire.files.wordpress.com/2011/06/georgeorwellxobeygiantprintset-1984coverbyshepardfairey.jpeg',
		title: '1984',
		author: 'George Orwell',
		description: 'In a totalitarian future society, a man whose daily work is rewriting history tries to rebel by falling in love.',
		price: 21
	})
];


var done = 0;
for (var i = 0; i < products.length; i++) {
	products[i].save(function(err, result) {
		done++;
		if (done === products.length) {
			exit();
		}
	});
}

function exit() {
	mongoose.disconnect();
}

