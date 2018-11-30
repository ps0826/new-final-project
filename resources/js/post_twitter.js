'use strict';

const post = function(value){
    const xhrPost = new XMLHttpRequest();
    xhrPost.open('POST', '/postContent');
    xhrPost.setRequestHeader('Content-Type', 'application/json');

    xhrPost.send(JSON.stringify({
        content: value
    }));
};


document
    .querySelector('#twitter-share-button')
    .addEventListener('submit', function(evt){
        evt.preventDefault();

        const value = document.querySelector('#post_content').innerHTML;
        console.log(value);
        post(value);
    });