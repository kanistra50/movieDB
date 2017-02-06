/**
 * Created by nickon on 30.01.2017.
 */
//https://developers.themoviedb.org/3/search/search-movies
(function (m) {
    'use strict';

    m.Favorites = ng.core.Component({

        templateUrl: 'html/myList.html'




    })
        .Class({
            constructor: [
                m.HttpService,
                ng.router.ActivatedRoute,
                Favorites
            ]
        });

    function Favorites( http, route ) {

        Object.assign(this, {
            http: http,
            foundMovies: [],
            id_base: [],
            genres: []
        });

    }

    // MovieList.prototype.loadList = function () {
    //     var t = this;
    //     this.http.getMovies(1)
    //         .then(function (list) {
    //             t.movies = list.results;
    //             //console.log(t.movies);
    //         })
    //         .catch(function (err) { console.log(err)})
    //
    //     this.http.getGenres()
    //         .then(function (list) {
    //             t.genres = list.genres;
    //
    //         })
    //         .catch(function (err) { console.log(err)})
    // };

    Favorites.prototype.navigate = function (path) {
        m.AppComponent.router.navigateByUrl(path);
    };

})(window.m || (window.m = {}));