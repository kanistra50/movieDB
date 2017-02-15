(function (m) {
    'use strict';


    m.MovieList = ng.core.Component({

        templateUrl: 'html/MovieList.html'

    })
        .Class({
            constructor: [
                m.LsController,
                m.HttpService,
                MovieList
            ]
        });


    function MovieList(ls, http) {
        Object.assign(this, {
            ls: ls,
            http: http,
            movies: [],
            genres: [],
            ar: [],
            page_id: 0
        })
    }


    MovieList.prototype.getClass = function (arg) {

       if (arg == this.page_id) {
           return "page-link active"
       } else {
           return "page-link"
       }
    };


   MovieList.prototype.page_control = function (p) {
        this.page_id = p;
        this.loadList();
   };

    MovieList.prototype.loadList = function () {

        var t = this;
        this.http.getMovies(1)
            .then(function (list) {

                var len = list.results.length,
                    n;

                if(len >4) {
                    var left = len%4;
                    n = parseInt(len/4);

                    for (var ind = 0; ind<n; ind++) {
                        t.ar[ind]=list.results.slice(4*ind, 4*ind + 4);
                    }

                    if (left != 0 ) {
                        t.ar[t.ar.length] = list.results.slice(len - left, len );
                    }

                    t.movies = t.ar[t.page_id];

                } else {t.ar = list.results}

            })
            .catch(function (err) { console.log(err)});

        this.http.getGenres()
            .then(function (list) {
                t.genres = list.genres;

            })
            .catch(function (err) { console.log(err)})
    };


    MovieList.prototype.getGenre = function (item){

            var t = this, len;

            if(t.genres != undefined) {
                 len = t.genres.length;
                  for (var i=0; i < len; i++) {

                     if (item == t.genres[i].id) {
                         return t.genres[i].name+" ";
                     }
                 }
            } else {console.log("errorMessage: МАССИВ ДАННЫХ С ЖАНРАМИ НЕ НАЙДЕН !")}
    };


    MovieList.prototype.navigate = function (path) {
        m.AppComponent.router.navigateByUrl(path);
    };

    MovieList.prototype.ngOnInit = function () {
        this.loadList();
    };


    MovieList.prototype.ngAfterViewInit = function () {

    };

    MovieList.prototype.ngOnDestroy = function () {};

})(window.m || (window.m = {}));    
