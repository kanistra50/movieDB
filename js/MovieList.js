(function (m) {
    'use strict';


    m.MovieList = ng.core.Component({

        templateUrl: 'html/MovieList.html'

    })
        .Class({
            constructor: [
                m.HttpService,
                MovieList

            ]
        });



    function MovieList(http) {

        Object.assign(this, {
            http: http,
            done: m.done,
            add: m.add(),
            movies: [],
            genres: []
        });
    };


    MovieList.prototype.loadList = function () {
        var t = this;
        this.http.getMovies(1)
            .then(function (list) {
                t.movies = list.results;
                //console.log(t.movies);
            })
            .catch(function (err) { console.log(err)})

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


    MovieList.prototype.ngAfterViewInit = function () {};

    MovieList.prototype.ngOnDestroy = function () {};

})(window.m || (window.m = {}));    