var app = angular.module('catalog', []);

    app.controller('CatalogController', ['$http', function ($http) {
        var store = this;
        store.products = [];


        //todo as a service
        $http.get('products.json').
            success(function (data) {
                store.products = data;
            });


    }]);