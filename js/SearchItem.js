//https://developers.themoviedb.org/3/search/search-movies

(function (m) {
    'use strict';

    m.Search = ng.core.Component({

        templateUrl: 'html/SearchItem.html'
    })
        .Class({
            constructor: [
                m.HttpService,
                ng.router.ActivatedRoute,
                Search
            ]
        });

    function Search( http, route) {
        var search = route;
        Object.assign(this, {
            http: http,
            done: m.done,
            add: m.add(),
            foundMovies: [],
            key_word: 'One',
            // genres: []
        });

    }

    Search.prototype.startSearch = function () {
        var t = this;
        console.log(this);
        this.http.getSearch()
            .then(function (list) {
                t.foundMovies = list.results;
                console.log(t.foundMovies);
            })
            .catch(function (err) { console.log(err)})

        // this.http.getGenres()
        //     .then(function (list) {
        //         t.genres = list.genres;
        //         console.log(t.genres);
        //     })
        //     .catch(function (err) { console.log(err)})
    };

    /* function validation (key_word, include_adult) {

        if (key_word) {
            console.log("Validation - " + key_word);
            Search.prototype.startSearch(key_word, include_adult);
        }
    };
    */


    Search.prototype.navigate = function (path) {
        m.AppComponent.router.navigateByUrl(path);
    };

    Search.prototype.ngAfterViewInit = function () {};

    Search.prototype.ngOnDestroy = function () {};

})(window.m || (window.m = {}));