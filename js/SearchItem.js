//https://developers.themoviedb.org/3/search/search-movies

(function (m) {
    'use strict';

    m.Search = ng.core.Component({

        templateUrl: 'html/SearchItem.html'
    })
        .Class({
            constructor: [
                m.LsController,
                m.HttpService,
                ng.router.ActivatedRoute,
                Search
            ]
        });


    function Search(ls, http, route) {

        Object.assign(this, {
            ls: ls,
            http: http,
            key_word: '',
            include_adult: false,
            foundMovies: [],
            ar: [],
            page_id: 0,
            keypass: true
        })

    }

    Search.prototype.getClass = function (arg) {

        if (arg == this.page_id) {
            return "page-link active"
        } else {
            return "page-link"
        }
    };

    Search.prototype.page_control = function (p) {
        this.page_id = p;
        this.keypass = false;
        this.startSearch();

    };

    Search.prototype.startSearch = function () {
        var t = this;
        this.http.getSearch(t.key_word, t.include_adult)
            .then(function (list) {

                var len = list.results.length,
                    n;
                if(len >3) {
                    var left = len%3;
                    n = parseInt(len/3);

                    for (var ind = 0; ind<n; ind++) {
                        t.ar[ind]=list.results.slice(3*ind, 3*ind + 3);
                    }

                    if (left != 0 && t.keypass ) {
                        t.ar[t.ar.length] = list.results.slice(len - left, len );
                    }

                    t.foundMovies = t.ar[t.page_id];
                } else {
                    t.ar= [];
                    t.foundMovies = list.results;

                }

            })
            .catch(function (err) { console.log(err)});
    };



    Search.prototype.navigate = function (path) {
        m.AppComponent.router.navigateByUrl(path);
    };

    Search.prototype.ngAfterViewInit = function () {};

    Search.prototype.ngOnDestroy = function () {};

})(window.m || (window.m = {}));
