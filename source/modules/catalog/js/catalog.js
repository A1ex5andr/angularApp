(function () {

    var app = angular.module('catalog', []);

    app.controller('CatalogController', function (getProductsJson) {
        var store = this;
        store.products = [];
        getProductsJson.success(function (data) {
            store.products = data;
        });
    });

}());

