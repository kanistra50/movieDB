(function(m) {

    'use strict';

    function LsController() {
        var t = this;
        t.name = 'movieDB';

        t._saveData = function(data) {
            localStorage.setItem(t.name, JSON.stringify(data));
        };

        t._getData = function() {
            var data = JSON.parse(localStorage.getItem(t.name)) || {
                    favs: []
                };
            console.log(data);
            return data;
        };

    };

    LsController.prototype.addFav = function(id) {
       if (id != null ) {
           var t = this,
               data = t._getData();

           if (data.favs.indexOf(id) < 0) {
               data.favs.push(id);
           }

           t._saveData(data);
       }

    };

    LsController.prototype.getFav = function() {

            var t = this,
                data = t._getData();
            console.log(data);


    };

    LsController.prototype.removeFav = function(id) {
        console.log("Remove on LocStore");
        var  t = this,
            data = t._getData(),
            indexId = data.favs.indexOf(id);

        if (indexId >= 0) {
            data.favs.splice(indexId, 1);
        }

        t._saveData(data);
    };

    m.Ls = m.Ls || new LsController();

})(window.m || (window.m = {}));
