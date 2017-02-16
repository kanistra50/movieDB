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
            movies: [],
            ar: [],
            page_id: 0,
            keypass: true
        });
    }

    Favorites.prototype.getClass = function (arg) {

        if (arg == this.page_id) {
            return "page-link active"
        } else {
            return "page-link"
        }
    };

    Favorites.prototype.page_control = function (p) {
        this.page_id = p;
        this.keypass = false;
        this.loadList();
    };

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
        var t = this, n,
            list = t.ls.getFav(),
            len = list.length;

        if(len > 4) {
            var left = len % 4;
            n = parseInt(len / 4);

            for (var ind = 0; ind < n; ind++) {
                t.ar[ind] = list.slice(4 * ind, 4 * ind + 4);
            }

            if (left != 0 && t.keypass ) {
                t.ar[t.ar.length] = list.slice(len - left, len);
            }

            list = t.ar[t.page_id];
        }

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
