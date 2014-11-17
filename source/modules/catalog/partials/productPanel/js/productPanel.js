(function(){

    var app = angular.module('store-panel', []);

    app.controller('ProductController', ['$scope', 'productService', function($scope, productService) {
        this.sendToCart = function(product){
            var productNew = product;
            var alreadyInCart = productService.getProducts();
            var existInCart = jQuery.inArray(productNew, alreadyInCart);

            function checkExist() {
                if (existInCart === -1 ){
                    productService.addProduct(productNew);
                }
            }
            checkExist();
            console.log(alreadyInCart);

        };
    }]);

    app.directive('productPanel', function () {
        return{
            restrict: 'A',
            templateUrl: 'layout/product-panel.html',
            controller: function () {
                this.tab = 1;
                this.selectTab = function(setTab) {
                    this.tab = setTab;
                };
                this.isSet = function (checkTab) {
                    return this.tab === checkTab;
                };
            },
            controllerAs: 'panel'
        };
    });

    app.directive('productDescription', function(){
        return {
            restrict: 'E',
            templateUrl: 'layout/product-description.html'
        };
    });

    app.directive('productSpecs', function () {
        return{
            restrict: 'E',
            templateUrl: 'layout/product-specs.html'
        };
    });

    app.directive('productReview', function () {
        return{
            restrict: 'E',
            templateUrl: 'layout/product-review.html',
            controller: function () {
                this.review = {};
                this.addReview = function(product){
                    this.review.createdOn = Date.now();
                    product.reviews.push(this.review);
                    this.review = {};
                };
            },
            controllerAs: 'reviewCtrl'

        };
    });

}());