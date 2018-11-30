'use strict';

let obj = {};

const movies = [];

obj.addMovie = function(movie) {
	// Only add a Pokemon if it isn't already there
	
	movies.push(movie);
};

obj.getmovies = function() {
	return movies;
};

obj.emptyList  = function() {
    return movies.length = 0;
};

obj.find = function(id){
	
	let target = movies.find(function(element){
		return element.id == id;
	});
	return target;
};


module.exports = obj;