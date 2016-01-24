//Fetch is used to make http requests
var Fetch = require("whatwg-fetch");
var baseUrl = "http://localhost:6060";

var service = {
    get: function(url){
        return fetch(baseUrl + url)
        .then(function (res) {
            return res.json();
        })
    },
    post: function(url, ingredient){
        //This is simple fetch implementation
        return fetch(baseUrl + url, {
            //We are setting our headers
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            //Indicating what type of request we are making
            method: 'post',
            //We are converting your ingredient to json before sending it.
            body: JSON.stringify(ingredient)
        }).then((res) => {
            return res;
        })
    }
};

module.exports = service;