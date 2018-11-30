'use strict';

const searchTv = function(name) {
	const xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/tvSearch');
	xhrPost.setRequestHeader('Content-Type', 'application/json');

	xhrPost.addEventListener('load', function() {
		
		const tv = JSON.parse(xhrPost.response);
		
		const tv_length = tv.length;
		const ul = document.querySelector('ul');
		while (ul.firstChild){
			ul.removeChild(ul.firstChild);
		}
		for (let i=0; i<tv_length; i++){
			const li = document.createElement('li'),
				a = document.createElement('a');

			a.setAttribute('href',`/tvServerRequest?tv=${tv[i].id}`);
			a.innerHTML = `${tv[i].name}`;

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
			tv: name
		})
	);
};

document
	.querySelector('#tv-search')
	.addEventListener('submit', function(evt) {
		evt.preventDefault();

		const input = document.querySelector('#tv-name'),
            name = input.value;
        
		input.value = '';
		searchTv(name);
	});