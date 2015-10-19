(function() {
    var app = angular.module('Store', ['ngRoute']);

    app.factory("productFactory", function($q, $timeout) {
        this.products = {};
        this.products.list = items; /*Get from http.get*/
        this.products.add = function(product) {
            var self = this;
            var deferred = $q.defer();
            product.id = Math.floor((Math.random() * 10000) + 10);

            $timeout(function() {
                self.list.push(product);
                deferred.resolve({
                    success: "Add a product with id: " + product.id
                });
            }, 100);


            return deferred.promise;
        };

        this.products.save = function(product) {
            var self = this;
            var i = 0;
            var deferred = $q.defer();
            for (; i < self.list.length; i++) {
                if (self.list[i].id == product.id) {
                    self.list[i] = product;
                    deferred.resolve({
                        success: "Saved a product with id: " + product.id
                    });
                    return deferred.promise;
                }
            }
            deferred.reject({
                error: "Item not found, can't edit"
            });
            return deferred.promise;
        };

        this.products.getAll = function() {
            var deferred = $q.defer();
            var self = this;
            if (self.list.length != 0) {
                deferred.resolve(self.list);
            } else {
                deferred.reject("No products to list");
            }

            return deferred.promise;
        };
        this.products.remove = function(id) {
            var i = 0;
            var self = this;
            var deferred = $q.defer();
            console.log("Old list: ",self.list);
            for (; i < self.list.length; i++) {
                if (self.list[i].id == id) {
                    self.list.splice(i,1);
                    console.log("New list: ",self.list);
                    deferred.resolve({
                        success: "Deleted Item"
                    });
                    return deferred.promise;
                }
            }
            deferred.reject({
                error: "Item not found! No deletion was possible"
            });
            return deferred.promise;
        }
        this.products.show = function(id) {
            var i = 0;
            var deferred = $q.defer();
            var self = this;

            $timeout(function() {
                for (; i < self.list.length; i++) {
                    if (self.list[i].id == id) {
                        deferred.resolve(self.list[i]);
                        return;
                    }
                }
                deferred.reject({
                    reason: "No such item exists"
                });
            }, 0);

            return deferred.promise;
        };

        this.products.fail = function(reason) {
            var deferred = $q.defer();
            $timeout(deferred.reject(reason), 2000);
            return deferred.promise;
        };
        return this.products;
    });

    app.controller('AppController', function($rootScope, $location, $scope) {
        $scope.upload = function() {

        };
        $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
            alert(eventObj);
            $location.path(previous);
        });
    });

    app.controller('NewProductController', function($location, productFactory, $scope) {
        var self = this;
        self.newProduct = {};


        self.addProduct = function() {
            console.log("Product to add:", self.newProduct);
            productFactory.add(self.newProduct).then(function(success) {
                    $location.path("/list");
                },
                function(err) {
                    console.log("Error: ", err);

                });


        };


    });

    app.controller("ProductDetailsController", function(product) {
        var self = this;
        self.product = product;
    });

    app.controller("ListProductsController", function(productFactory) {
        var self = this;
        productFactory.getAll().then(function(listedProducts) {
                self.products = listedProducts;
            },
            function(reason) {
                console.log("Reason");
            });
    });

    app.controller("EditProductController", function(product, productFactory,$location) {
        var self = this;
        self.newProduct = product;
        self.saveProduct = function() {
            productFactory.save(self.newProduct).then($location.path("/list"));

        };
        self.deleteProduct = function() {
            console.log(self.newProduct.id);
            productFactory.remove(self.newProduct.id).then($location.path("/list"));

        };

    });

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/list', {
                templateUrl: 'partials/list-products.html',
                controller: 'ListProductsController',
                controllerAs: 'store',
                resolve: {
                    product: function(productFactory) {
                        return productFactory.getAll();
                    }
                }
            }).
            when('/new', {
                templateUrl: 'partials/add-product.html',
                controller: 'NewProductController',
                controllerAs: 'store'
            }).when('/:id/edit', {
                templateUrl: 'partials/edit-product.html',
                controller: 'EditProductController',
                controllerAs: 'store',
                resolve: {
                    product: function(productFactory, $route) {
                        return productFactory.show($route.current.params.id);
                    }
                }
            }).
            when('/:id/show', {
                templateUrl: 'partials/product-details.html',
                controller: 'ProductDetailsController',
                controllerAs: 'store',
                resolve: {
                    product: function(productFactory, $route) {
                        return productFactory.show($route.current.params.id);
                    }
                }
            }).
            when('/fail', {
                templateUrl: 'partials/product-details.html',
                controller: 'ProductDetailsController',
                resolve: {
                    failure: function(productFactory) {

                        return productFactory.fail("This doesn't work!");
                    }
                }
            }).
            otherwise({
                redirectTo: '/list'
            });
        }
    ]);

    var items = [{
        id: 1,
        name: '1990 Toyota Corolla',
        category: 'car',
        price: 1500.00,
        photo: 'car1.jpg',
        description: "It's fast but has not AC"
    }, {
        id: 2,
        name: '1995 Suzuki Swift',
        category: 'car',
        price: 7500.00,
        photo: 'car2.jpg',
        description: "It's has the AC but ain't so swift"
    }, {
        id: 3,
        name: '2000 Toyota Corolla',
        category: 'car',
        price: 9500.00,
        photo: 'car3.jpg',
        description: "It's fast and the AC works"
    }];
})();
