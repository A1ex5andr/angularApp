app.service('productService', function() {

    var productList = [];

    var addProduct = function(obj) {
        obj.qty = 1;
        productList.push(obj);
    };

    // TODO create a callback func
    var getProducts = function(){
        return productList;
    };

    var removeProduct = function(index) {
        productList.splice(index, 1);
    };

    return {
        addProduct: addProduct,
        getProducts: getProducts,
        removeProduct: removeProduct
    };
});