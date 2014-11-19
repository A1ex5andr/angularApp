angular.module('cart', ['ngResource'])
    .factory('CartService', ['$resource',
        function CartFactory($resource) {
            CartFactory.resource = $resource('//localhost:3000/cart', {}, {
                query: {
                    method: 'GET'
                }
            });

            CartFactory.doCount = function() {
                var count = 0;
                for (var k in CartFactory.items)
                    if (CartFactory.items[k].qty)
                        count += CartFactory.items[k].qty;
                CartFactory.itemCount = count;
            };

            CartFactory.items = {};
            CartFactory.itemCount = 0;

            CartFactory.query = function() {
                CartFactory.items = CartFactory.resource.query(function(result) {
                    CartFactory.items = result.items;
                    CartFactory.doCount();
                });
            };

            CartFactory.add = function(product) {
                var item = CartFactory.items[product.id];

                if (angular.isUndefined(item)) {
                    item = {
                        id: product.id,
                        name: product.name,
                        model: product.model,
                        qty: 0,
                        price: product.price,
                        image: product.images[1]
                    };
                    CartFactory.items[product.id] = item;
                    CartFactory.doCount();
                }

                item.qty++;

                CartFactory.resource.save(item, function(result) {
                    CartFactory.items = result.items;
                    CartFactory.doCount();
                });
            };

            CartFactory.query();

            return CartFactory;
        }
    ]);