var topics = ['Ricky and Morty', 'Power Rangers', 'Simpsons', 'Harry Potter'];
var staticURL = [];
var animatedURL = [];
 
function render() {

	$('#buttonArea').empty();
	for (var i = 0; i < topics.length; i++) {
		var newButton = $('<button>');
		newButton.text(topics[i]);
		newButton.attr('data-name', topics[i]);
		newButton.addClass('topic');
		$('#buttonArea').append(newButton);
	};


	$('.topic').click(function() {

		animatedURL = [];
		staticURL = [];

		$('#gifArea').empty();

		var replace = $(this).attr('data-name');
		var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + replace + '&api_key=dc6zaTOxFJmzC&limit=10';

		$.ajax({url: queryURL, method: 'GET'}).done(function(gif) {

			for (var i = 0; i < 10; i++) {

				var newDiv = $('<div>');
				var p = $('<p>');
				var newGif = $('<img>');

				animatedURL.push(gif.data[i].images.fixed_height.url);
				staticURL.push(gif.data[i].images.fixed_height_still.url);

				newDiv.addClass('gifDiv')
				p.text('Rating: ' + gif.data[i].rating);
				newGif.attr('data-number', i)
				newGif.attr('src', gif.data[i].images.fixed_height_still.url);
				newDiv.append(p);
				newDiv.append(newGif);

				$('#gifArea').append(newDiv);
				newGif.click(function() {
					if ( $(this).attr('src') == staticURL[$(this).attr('data-number')] ) {
						$(this).attr('src', animatedURL[$(this).attr('data-number')])
					} else {
						$(this).attr('src', staticURL[$(this).attr('data-number')]);
					};
				});
			};
		});
	});
};

render();

$('#addTopic').click(function() {
	var addedButton = $('#inputBox').val();
	$('inputBox').val(null);
	topics.push(addedButton);
	render();
});
