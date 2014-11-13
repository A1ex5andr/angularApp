(function () {

    var app = angular.module('cart', []);

    app.controller('CartCtrl', function ($scope, productService, $http) {

        $scope.products = productService.getProducts();
        this.inCart = $scope.products;
        this.qty = 1;

        console.log(this.inCart);

        var store = this;
        store.products = [];
        $http.get('products.json').
            success(function (data) {
                store.products = data;
            });


        });
}());