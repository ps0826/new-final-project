'use strict';
const express = require('express'),
    app = express(),
	request = require('request'),
	movieModule = require('./modules/storage'),
	passport = require('passport'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	Twitter = require('twitter'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
	

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static('resources'));

// line 13-18 without these we could not use body parameter
app.use(express.json()); // for parsing application/json
app.use(
	express.urlencoded({
		extended: true
	})
); // for parsing application/x-www-form-urlencoded

// Setup session handling
// Always do express-session config first
app.use(
	expressSession({
		secret: 'ihadacatnamedcat',
		resave: false,
		saveUninitialized: false
	})
);

// Setup Cookie Parser to parse our cookies, we won't really be using cookies,
// but we will be using a cookie for login
app.use(cookieParser());

// Setup Passport
app.use(passport.initialize());
// Make sure express-session was already configured
app.use(passport.session());


app.get('/', function(req, res){
	res.render('homepage');
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: '618260523710-9pok9v42quqb11pljb7jglugengoiv7a.apps.googleusercontent.com',
        clientSecret: 'FkO8XeAmy5Q-ZU8aWY2Hyyna',
		callbackURL: '/auth/google/callback',
		accessType: 'offline'
    }, (accessToken, refreshToken, profile, done) => {
		// Extract the minimal profile information we need from the profile object
		// provided by Google
		console.log('profile is', profile);
		done(null, {
			id: profile.id,
			name: profile.displayName,
			photos: profile.photos
		});

}));

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((id, done) => {
	done(null, id);
});


// auth login
app.get('/auth/login', function(req, res){
    res.render('login', { user: req.user });
});

// auth logout
app.get('/auth/logout', function(req, res) {
    
	req.logout();
	res.redirect('/');
});


// auth with google+
app.get('/auth/google', passport.authenticate('google', { scope: ['profile']}));


app.get('/auth/google/callback', passport.authenticate('google'),
    function(req, res){
        res.render('search', {
			user: req.user
		});
    }
);
// after login google
app.get('/movie', function(req, res){
	res.render('movie');
});

app.get('/tv', function(req, res){
	res.render('tv', {
		movies : movieModule.getmovies()
	});
});
app.get('/tvServerRequest', function(req, res) {
	const tvId = req.query.tv;

	let tv_result = movieModule.find(tvId);
	
	res.render('tv_result', tv_result);
	
});

app.get('/serverRequest', function(req, res) {
	const movieId = req.query.movie;
	let movie_result = movieModule.find(movieId);
	res.render('movie_result', movie_result);
});

app.post('/tvSearch', function(req, res) {
	const tvName = req.body.tv;
	request(
		{
			method: 'GET',
			url: `https://api.themoviedb.org/3/search/tv?api_key=ea848ecf7dcc6630ee9db544ee777786&query=${tvName}`,
			json: true
		},
		function(error, response, tv) {
			const status = response.statusCode;
			if (status >= 400) {
				res.status(400);
				res.send(`Invalid TV ${tvName}`);
				return;
			}
			const result_length = tv.results.length;
			
			movieModule.emptyList();
			
			for (let i=0; i<result_length; i++){
				movieModule.addMovie({
					vote_count : tv.results[i].vote_count,
					id : tv.results[i].id,
					vote_average : tv.results[i].vote_average,
					name : tv.results[i].name,
					poster_path : tv.results[i].poster_path,
					backdrop_path : tv.results[i].backdrop_path,
					overview : tv.results[i].overview
				});
				
			}
			const movie_list = movieModule.getmovies();			
			res.json(movie_list);
		}
	);
});


app.post('/favorite', function(req, res) {	
	const movieName = req.body.movie;
	request(
		{
			method: 'GET',
			url: `https://api.themoviedb.org/3/search/movie?api_key=ea848ecf7dcc6630ee9db544ee777786&query=${movieName}`,
			json: true
		},
		function(error, response, movie) {
			const status = response.statusCode;
			if (status >= 400) {
				res.status(400);
				res.send(`Invalid Movie ${movieName}`);
				return;
			}
			const result_length = movie.results.length;
			
			movieModule.emptyList();
			
			for (let i=0; i<result_length; i++){
				movieModule.addMovie({
					vote_count : movie.results[i].vote_count,
					id : movie.results[i].id,
					vote_average : movie.results[i].vote_average,
					title : movie.results[i].title,
					poster_path : movie.results[i].poster_path,
					backdrop_path : movie.results[i].backdrop_path,
					overview : movie.results[i].overview
				});
				
			}
			const movie_list = movieModule.getmovies();						
			res.json(movie_list);
		}
	);
});


// twitter part
const client = new Twitter({
	consumer_key: 'tdc56CRia6YuXsfdg0WTSaRen',
	consumer_secret: '8LFBUmb6EALkFhpE2IA3XkdPpzodoQt4mXc4p4iqPAvKP7iZ8c',
	access_token_key: '1067892984753135618-3EOskJoBwo7fuJ8Volahpamckb8ijP',
	access_token_secret: '2jCLc80EOibf5mXFpffqSIDgNqFEeSyD2WmGLaSWfi9uf'
});

app.post('/postContent', function(req, res){
	const content = req.body.content;
	client.post('statuses/update', {status: content},  function(error, tweet, response) {

	});
	
});

const server = app.listen(3000, function() {
	console.log(`Server started on port ${server.address().port}`);
});