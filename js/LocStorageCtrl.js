(function(m) {

    'use strict';

    m.LsController = ng.core.Class({
        constructor: [
            LsController
        ]
    });

    function LsController() {
        var t = this;
        t.name = 'movieDB';

        t._saveData = function(data) {
            localStorage.movieDB = JSON.stringify(data);
        };

        t._getData = function() {

            var data = JSON.parse(localStorage.getItem(t.name)) || [];
            return data;
        };
    }

    LsController.prototype.checkById = function(id) {
        return this._getData().indexOf(id) == -1;
    };

    LsController.prototype.addFav = function(id) {
       if (id != null ) {
           var t = this,
               data = t._getData();

           if (data.indexOf(id) < 0) {
               data.push(id);
           }

           t._saveData(data);
       }

    };

    LsController.prototype.getFav = function() {
        return this._getData();
    };

    LsController.prototype.removeFav = function(id) {

        var  t = this,
            data = t._getData(),
            indexId = data.indexOf(id);

        if (indexId >= 0) {
            data.splice(indexId, 1);
        }

        t._saveData(data);
    };

    m.Ls = m.Ls || new LsController();

})(window.m || (window.m = {}));
