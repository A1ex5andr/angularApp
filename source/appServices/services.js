var app  = angular.module('storeService', []);

    app.service('productService', function() {

        var productList = [];

        var addProduct = function(id) {
            productList.push(id);
        };

        // ToDO create a callback func
        var getProducts = function(){
            return productList;
        };

        return {
            addProduct: addProduct,
            getProducts: getProducts
        };

    });