angular.module('cart', ['ngResource'])
    .factory('CartService', ['$resource',
        function CartFactory($resource) {
            CartFactory.resource = $resource('//localhost:3000/cart', {}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            });

            CartFactory.items = [];

            CartFactory.query = function() {
                CartFactory.items = CartFactory.resource.query();
            };

            CartFactory.save = function(item) {
                CartFactory.resource.save(item, function(response) {
                    CartFactory.items = response.items;
                    console.log(CartFactory.items);
                });
            };

            CartFactory.query();

            return CartFactory;
        }
    ]);