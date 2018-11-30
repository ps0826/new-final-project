// get method
// send request
//  https://api.themoviedb.org/3/authentication/token/new?api_key=ea848ecf7dcc6630ee9db544ee777786
var data = "{}";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.themoviedb.org/3/authentication/token/new?api_key=ea848ecf7dcc6630ee9db544ee777786");

xhr.send(data);




//post method

// send request
// https://api.themoviedb.org/3/authentication/session/new?api_key=ea848ecf7dcc6630ee9db544ee777786
var data = JSON.stringify({
    "request_token": "6bc047b88f669d1fb86574f06381005d93d3517a"
  });
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "https://api.themoviedb.org/3/authentication/session/new?api_key=ea848ecf7dcc6630ee9db544ee777786");
  xhr.setRequestHeader("content-type", "application/json");
  
  xhr.send(data);



  // twitter code

  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>. <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a> <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a></p>&mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>