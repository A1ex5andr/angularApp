app.controller('CartController', ['$scope', 'CartService', function($scope, CartService) {
    this.count = function() {
        return CartService.itemCount;
    };

    this.get = function() {
        return CartService.items;
    };

    this.add = function(product) {
        CartService.save(product);
    };
}]);