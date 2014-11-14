(function () {

    var app = angular.module('cart', []);

    app.controller('CartCtrl', function ($scope, productService) {

            $scope.products = productService.getProducts();
            this.products = $scope.products;
            this.qty = 1;

            console.log(this.products.length);

        });
}());