(function (m) {
    'use strict';

  
    m.HttpService = ng.core.Class({
        constructor: [
            ng.http.Http,
            HttpService
        ]
    });



    function HttpService(http) {
        Object.assign(this, {
            http: http,
            apiKey: 'myApiKeyString',
                path : 'https://api....'
        })
    }



    HttpService.prototype.toJson = function(response) {
        var res;
        try {
            res = JSON.parse(response.responseText || response.text() || '{}');
        } catch (ex) {
            console.warn(ex);
        }
        return res;
    };



    HttpService.prototype.getMovies = function (page) {
        var t = this;
        var options = new ng.http.Request({
            body: '',
            method: 'get',
            headers: '',
            url: t.path + 'movie/popular?'+ $.param({'api_key': t.apiKey}) + '&' + $.param({'language': 'en-US'})
                + '&' +$.param({'page': page})
        });

        return this.http.request(options)
            .map(this.toJson)
            .toPromise();
    };


    HttpService.prototype.navigate = function (path) {
        m.AppComponent.router.navigateByUrl(path);
    };


    HttpService.prototype.getMovie = function (id) {
        var t = this;
        var options = new ng.http.Request({
            body: '',
            method: 'get',
            headers: '',
            url: t.path + 'movie/' + id + '?'+ $.param({'api_key': t.apiKey}) + '&' + $.param({'language': 'en-US'})
        });

        return this.http.request(options)
            .map(this.toJson)
            .toPromise();
    };


    HttpService.prototype.getGenres = function () {
        var t = this;
        var options = new ng.http.Request({
            body: '',
            method: 'get',
            headers: '',
            url: t.path + 'genre/movie/list?'+ $.param({'api_key': t.apiKey}) + '&' + $.param({'language': 'en-US'})
        });

        return this.http.request(options)
            .map(this.toJson)
            .toPromise();
    };


    HttpService.prototype.getRecommendation = function (id) {
        var t = this;
        var options = new ng.http.Request({
            body: '',
            method: 'get',
            headers: '',
            url: t.path + 'movie/' + id + '/recommendations?'+ $.param({'api_key': t.apiKey}) + '&'
            + $.param({'language': 'en-US'}) + $.param({'page': 1})
        });

        return this.http.request(options)
            .map(this.toJson)
            .toPromise();
    };


    HttpService.prototype.getSearch = function (key, adult) {
        var t = this;
        var options = new ng.http.Request({
            body: '',
            method: 'get',
            headers: '',
            url: t.path + 'search/movie?' + $.param({'api_key': t.apiKey}) + '&' + $.param({'language': 'en-US'})  + '&'
            + $.param({'query': key})  + '&' + $.param({'page': 1})  + '&'+ $.param({'include_adult': adult}) + '&'
            + $.param({'region': t.region}) + '&' + $.param({'year':t.year})  + '&'
            + $.param({'primary_release_year': t.relYear})
        });

        return this.http.request(options)
            .map(this.toJson)
            .toPromise();
    };

})(window.m || (window.m = {}));
