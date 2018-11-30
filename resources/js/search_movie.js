'use strict';

const searchMovie = function(name) {
	const xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/favorite');
	xhrPost.setRequestHeader('Content-Type', 'application/json');

	xhrPost.addEventListener('load', function() {
		
		const movies = JSON.parse(xhrPost.response);
		console.log(movies);
		const movies_length = movies.length;
		const ul = document.querySelector('ul');
		while (ul.firstChild){
			ul.removeChild(ul.firstChild);
		}
		for (let i=0; i<movies_length; i++){
			console.log(movies[i].title);
			
			const li = document.createElement('li'),
				a = document.createElement('a');

			a.setAttribute('href',`/serverRequest?movie=${movies[i].id}`);
			a.innerHTML = `${movies[i].title}`;

			li.appendChild(a);
			ul.appendChild(li);
			
		}
		
	});

	xhrPost.addEventListener('error', function() {
		console.error('Error occured :(');
	});

	xhrPost.timeout = 3 * 1000;
	xhrPost.addEventListener('timeout', function() {
		console.warn('Timeout');
	});

	xhrPost.send(
		JSON.stringify({
			movie: name
		})
	);
};

document
	.querySelector('#movie-search')
	.addEventListener('submit', function(evt) {
		evt.preventDefault();

		const input = document.querySelector('#movie-name'),
            name = input.value;
        
		input.value = '';
		searchMovie(name);
	});
