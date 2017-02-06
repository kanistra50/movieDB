
(function (m) {
    'use strict';


    m.MovieItem = ng.core.Component({
        //selector: 'm-item',
        templateUrl: 'html/MovieItem.html'
        // host: {
        //     class: 'm-item'
        // }

    })
        .Class({
            constructor: [
                m.HttpService,
                ng.router.ActivatedRoute,
                MovieItem
            ]
        });

    function MovieItem( http, route) {
        var t = this,
            id = route.params.getValue().id;

        Object.assign(this, {
            http: http,
            done: m.done,
            add: m.add(id),
            id: id,
            item: { id : 'id', title : 'title', popularity: 'popularity',  overview : 'overview',
                backdrop_path : 'backdrop_path'}
        });

        this.subOnIdChange = route.params.subscribe(function(p) {
            t.id = parseInt(p.id);
            t.loadItem(p.id);
        });
    };


    MovieItem.prototype.loadItem = function (id) {
        var t = this;
        this.http.getMovie(id)
            .then(function (movie) {
                t.item = movie;
            })
            .catch(function (err) {console.log(err)});

        this.http.getRecommendation(id)
            .then(function (list) {
                t.recomMovies = list.results;
                //console.log(t.movies);
            })
            .catch(function (err) { console.log(err)})
    };


    MovieItem.prototype.navigate = function (path) {
        m.AppComponent.router.navigateByUrl(path);
    };

    MovieItem.prototype.ngAfterViewInit = function () {
        this.loadItem(this.id);
    };

   
    MovieItem.prototype.ngOnDestroy = function () {

    };
})(window.m || (window.m = {}));  