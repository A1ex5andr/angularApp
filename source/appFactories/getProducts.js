app.factory('getProductsJson', ['$http', function ($http) {
    return $http.get('products.json');
}]);
