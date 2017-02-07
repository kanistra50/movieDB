(function (m) {
    'use strict';

    m.AppComponent = ng.core.Component({
            selector: '[m-app]',
            templateUrl: 'app.html'
        })
        .Class({constructor: [
            ng.router.Router,
            App
        ]});

    var routes =[
        { path: '', component: m.MovieList, useAsDefault: true },
        { path: 'search', component: m.Search},
        { path: 'favorites', component: m.Favorites},
        { path: 'movie/:id', component: m.MovieItem}

    ];

    function App( router ) {
        m.AppComponent.router = router;
        Object.assign(this, router);
    };

    m.add = function (id) {
        m.Ls.addFav(id);
    };

    var AppModule = ng.core.NgModule({
        declarations: [
            m.AppComponent,
            m.MovieList,
            m.Search,
            m.Favorites,
            m.MovieItem
        ],
        entryComponents: [
        ],
        schemas: [ng.core.CUSTOM_ELEMENTS_SCHEMA],
        imports: [
            ng.http.HttpModule,
            ng.platformBrowser.BrowserModule,
            ng.forms.ReactiveFormsModule,
            ng.router.RouterModule.forRoot(routes, { useHash: true })
        ],
        providers: [
            m.HttpService,
            { provide: ng.http.RequestOptions, useClass: m.RequestOptions }
        ],
        bootstrap: [App]
    })
        .Class({
            constructor: function() {}
            });

    App.prototype.navigate = function (path) {
        m.AppComponent.router.navigateByUrl(path);
    };

    document.addEventListener('DOMContentLoaded', function () {
  
        if (window.location.hostname.toLowerCase() !== 'localhost') {
            ng.core.enableProdMode();
        }
    
        ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);
    });

})(window.m || (window.m = {}));
