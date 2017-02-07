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

    m.movies = [];

    function Favorites( http, route ) {
        var t = this,
            id = route.params.getValue().id;

        Object.assign(this, {
            http: http,
            movies: m.movies,
            remove: function (id) {m.Ls.removeFav(id); console.log("Remove on the myListJS")}
 
        });

    }

     Favorites.prototype.loadList = function () {
         var list = JSON.parse(localStorage.getItem('movieDB')) || {
                 favs: []
             },
             ls = list["favs"],
             movies = m.movies;


            if (ls[0] != undefined) {
                for (var i in ls) {
                    console.log(ls[i]);

                    this.http.getMovie(ls[i])
                        .then(function (movie) {
                            m.movies.push(movie);
                        })
                        .catch(function (err) {console.log(err)})
                };
            };

            console.log(m.movies);
            return m.movies;
  
    };

    Favorites.prototype.navigate = function (path) {
        m.AppComponent.router.navigateByUrl(path);
    };

    Favorites.prototype.ngOnInit = function () {
        this.loadList();
    };


    Favorites.prototype.ngAfterViewInit = function () {};

    Favorites.prototype.ngOnDestroy = function () {};

})(window.m || (window.m = {}));
