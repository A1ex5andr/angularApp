app.controller('CartController', ['$scope', 'CartService', function($scope, CartService) {
    //this.items = CartService.items;

    this.get = function () {
        return CartService.items;
    };

/*
    this.add = function (item) {
        this.items = CartService.save(item);
    };
*/
}]);