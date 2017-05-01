'use strict';

// App Module: the name AngularStore matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page

var storeApp = angular.module('AngularStore', []).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/Images', {
                templateUrl: 'partials/Images.htm',
                controller: storeController
            }).
            when('/Gallery/:ImageID', {
                templateUrl: 'partials/Gallery.htm',
                controller: storeController
            }).
            when('/SignUp', {
                templateUrl: 'partials/SignUp.htm',
                controller: storeController
            }).
            when('/SignIn', {
                templateUrl: 'partials/SignUp.htm',
                controller: storeController
            }).
            otherwise({
                redirectTo: '/Images'
            });

    }]);


storeApp.filter('split', function () {
    return function (input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    };
});

// create a data service that provides a Gallery and a Images that
// will be shared by all views (instead of creating fresh ones for each view).
storeApp.factory("DataService", function ($http) {

    //flickr api for load images
    var allphotos = "http://api.flickr.com/services/feeds/photos_public.gne?&format=json&jsoncallback=?";

    var tempArr = [];
    var q = $.getJSON(allphotos, function (data) { });
    q.then(function (getItems) {
        
        angular.forEach(getItems.items, function (value, key) {
            //Images Constructor Parameters (uniCode, imageUrl, author, dateTaken, datePublished, tags, title)
            var res = value.media.m.split("/")[3];
            //push in between array for transfer data to cache and get it from cache
            tempArr.push(new product(res, value.media.m, value.author, value.date_taken, value.published, value.tags, value.title));
        });

        //push data to cashe
        localStorage["myData"] = JSON.stringify(tempArr);

    }, function () {
        //erorr
        alert('Error in getting records');
    });


    //create instance of store object
    var myStore = new store();

    // return data object with Gallery 
    return {
        store: myStore
    };
});