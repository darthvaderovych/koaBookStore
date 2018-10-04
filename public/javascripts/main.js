
$(document).ready(function(){
	$('.ajaxAdd').on("click", function(e){
		e.preventDefault();
		let link = $(this).attr('href');
		$.get(link, function() {
		console.log('ajax added one item')
	}).done(function(){

			if ($('#cartQty').length) {

				let cartQty = $('#cartQty').text();
				$('#cartQty').text(+cartQty + 1);
			} else {
				$('#newCartQty').html('<span class="badge badge-pill badge-secondary ml-1" id="cartQty">1</span>')
			};
		});
	});


	$('.ajaxAddOne').on("click", function(e){

		e.preventDefault();

		let elm = $(this);
		let link = $(this).attr('href');

		$.get(link, function() {
	}).done(function(data) {
			$('#cartQty').text(data.totalQty);
			$('#cartTotalPrice').text('Total: $ ' + data.totalPrice);

			let itemQty = elm.parents('#item').find('.itemQty').text()
			let itemPrice = elm.parents('#item').find('.itemPrice').text();
			let itemTotalPrice = elm.parents('#item').find('.itemTotalPrice').text();
			let num = +(itemTotalPrice.match(/\d+/)[0]) + +(itemPrice.match(/\d+/)[0]);

			elm.parents('#item').find('.itemTotalPrice').text('$ ' + num);
			elm.parents('#item').find('.itemQty').text(+itemQty + 1);
			
		});
	});

	$('.ajaxReduceOne').on('click', function(e){

		e.preventDefault();

		let elm = $(this);
		let link = $(this).attr('href');
		console.log(link);

		$.get(link, function() {
	}).done(function(data) {
			$('#cartQty').text(data.totalQty);
			$('#cartTotalPrice').text('Total: $ ' + data.totalPrice);

			let itemQty = elm.parents('#item').find('.itemQty').text()
			console.log(itemQty);
			let itemPrice = elm.parents('#item').find('.itemPrice').text();
			let itemTotalPrice = elm.parents('#item').find('.itemTotalPrice').text();
			let num = +(itemTotalPrice.match(/\d+/)[0]) - +(itemPrice.match(/\d+/)[0]);

			elm.parents('#item').find('.itemTotalPrice').text('$ ' + num);
			elm.parents('#item').find('.itemQty').text(+itemQty - 1);
			console.log(elm.parents('#item').find('.itemQty').text())

			if(elm.parents('#item').find('.itemQty').text() <= 0) {

				elm.parents('#item').remove();
			};

			if(data.totalQty <= 0) {
				$('span').remove('#cartQty');
				$('div').remove('.emptyCart');
				$('hr').remove();
				$('#cartNotif').prepend('<div class="col-sm-6 col-md-6"><h1 class="text-center mt-3"><i class="fa fa-shopping-cart"></i></h1><h2 class="text-center mt-1">Your Cart is empty</h2><h4 class="text-center">Click <a href="/">here</a> to continue shopping</h4></div>');
			};
		});

	});


	$('.ajaxRemoveAll').on('click', function(e){

		e.preventDefault();

		let elm = $(this);
		let link = $(this).attr('href');

		$.get(link, function() {
	}).done(function(data) {
			$('#cartQty').text(data.totalQty);

			elm.parents('#item').remove();

			if(data.totalQty <= 0) {
				$('span').remove('#cartQty');
				$('div').remove('.emptyCart');
				$('hr').remove();
				$('#cartNotif').prepend('<div class="col-sm-6 col-md-6"><h1 class="text-center mt-3"><i class="fa fa-shopping-cart"></i></h1><h2 class="text-center mt-1">Your Cart is empty</h2><h4 class="text-center">Click <a href="/">here</a> to continue shopping</h4></div>');
			};
			
		});

	});


})