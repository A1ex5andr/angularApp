(function () {
    var app = angular.module('store-gallery', []);
    app.directive('productGallery', function () {
        return{
            restrict: 'A',
            templateUrl: 'layout/product-gallery.html',
            controller: function () {
                this.pic = 1;
                this.setPic = function(pic){
                    if (pic !== null) {
                        this.pic = pic;
                    } else {
                        this.pic = 0;
                    }
                };
            },
            controllerAs: 'gallery'
        };
    });
}());