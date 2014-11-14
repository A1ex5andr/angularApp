app.service('productService', function() {

    var productList = [];

    var addProduct = function(obj) {
        productList.push(obj);
    };

    // TODO create a callback func
    var getProducts = function(){
        return productList;
    };

    return {
        addProduct: addProduct,
        getProducts: getProducts
    };

});