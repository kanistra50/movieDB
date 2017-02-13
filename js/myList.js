//https://developers.themoviedb.org/3/search/search-movies
(function (m) {
    'use strict';

    m.Favorites = ng.core.Component({
        templateUrl: 'html/myList.html'
    })
        .Class({
            constructor: [
                m.HttpService,
                m.LsController,
                Favorites
            ]
        });

    function Favorites(http, ls) {
        Object.assign(this, {
            ls: ls,
            http: http,
            movies: []
        });
    }
    Favorites.prototype.remove = function (id) {
        var n = this.movies.find(function (el) {
            return el.id === id;
        });

        if (n) {
            var nId = this.movies.indexOf(n);
            this.movies.splice(nId, 1);
        }
        this.ls.removeFav(id);
    };

     Favorites.prototype.loadList = function () {
         var t = this,
             list = t.ls.getFav();

         list.forEach(function(el){
                t.http.getMovie(el)
                    .then(function (movie) {
                        t.movies.push(movie);
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            });
    };

    Favorites.prototype.navigate = function (path) {
        m.AppComponent.router.navigateByUrl(path);
    };

    Favorites.prototype.ngOnInit = function () {
        this.loadList();
    };

    Favorites.prototype.ngOnDestroy = function () {};

})(window.m || (window.m = {}));
