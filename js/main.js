$(function() {

	//user object
	var user = {
		title: '@bradwestfall',
		image: 'images/brad.png'
	};


	//State management for expansions when composing tweets
	$(document).on('click','.compose', function() {

		$(this).toggleClass('expand');

	});

	//State management for expanding current tweets
	$(document).on('click', '.tweet', function() {
		$(this).parents('.thread').toggleClass('expand');
	});


	//render Tweet function
	function renderTweet(message){
		var source = $('#template-tweet').html();
		var template = Handlebars.compile(source);
		user.message = message;
		var output = template({
			title: user.title,
			message: message,
			image : user.image
		});
		return output;	
	};

	//render Thread function
	function renderThread(user, message) {
		var source = $('#template-thread').html();
		var template = Handlebars.compile(source);
		var output = template({
			tweet: renderTweet(message),
			compose : renderCompose()
		})
		return output;
	}


	//render Compose Function
	function renderCompose(){
		var source = $('#template-compose').html();
		var template = Handlebars.compile(source);
		return template;
	}


	//Templating for composing a Tweet
	$('header form').on('submit', function(event) {
		event.preventDefault();
		var message = $('header textarea').val();
		var output = renderThread(user, message);
		$('.tweets').prepend(output);
		$('textarea').val('');		
	});

	//Template for response
	$(document).on('submit','.replies form', function(event){
		event.preventDefault();
		var message = $(this).find('textarea').val();
		var output = renderTweet(message);
		$(this).parent().append(output);
		$('textarea').val('');
	});


	//Count down EXTRA CREDIT
	$(document).on('keydown', 'textarea', function(event){

		var maxLength = 140;
		var msgLength = $(this).val().length;
		if(maxLength > msgLength || event.keyCode == '8') {
			$('.count', $(this).parents('.compose')).text(maxLength - msgLength); 
			$('.compose .count').text();

		} else {
			event.preventDefault();
			var message = $(this).find('textarea').val();
			$('.count', $(this).parents('.compose')).text('0');
		}

	});


});