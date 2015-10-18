(function() {
    var app = angular.module('Store', ['ngRoute']);

    app.factory("productFactory", ["$q", "$timeout", function($q, $timeout) {
        this.products = {};
        this.products.list = items; /*Get from http.get*/
        this.products.add = function(product) {
            var self = this;
            var deferred = $q.defer();
            product.id = Math.random();
            $timeout(function() {
                self.list.push(product);
                deferred.resolve({
                    succes: true
                });
            }, 100);


            return deferred.promise;
        };
        this.products.getAll = function() {

            return this.list;
        };
        this.products.remove = function($id) {
            var i = 0;
            for (; i < this.products.list.length - 1; i++) {
                if (this.products.list[i].id === id) {
                    delete this.products.list[i].id;
                }
                break;
            }
        }
        this.products.show = function($id) {
            var i = 0;
            for (; i < this.products.list.length - 1; i++) {
                if (this.products.list[i].id === id) {
                    return this.products.list[i].id;
                }
            }
        };
        return this.products;
    }]);

    app.controller('AppController', function() {
        this.products = items;
    });

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/list', {
                templateUrl: 'partials/list-products.html',
                controller: 'ListProductsController'
            }).
            when('/new', {
                templateUrl: 'partials/add-product.html',
                controller: 'NewProductController',
                controllerAs: 'store'
            }).when('/:id/edit', {
                templateUrl: 'partials/edit-.html',
                controller: 'EditProductController'
            }).
            when('/:id/show', {
                templateUrl: 'partials/product-details.html',
                controller: 'ProductDetailsController'
            }).
            otherwise({
                redirectTo: '/list'
            });
        }
    ]);

    app.controller('NewProductController', ["$location", "productFactory", function($location, productFactory) {
        var self = this;
        self.newProduct = {};
        self.addProduct = function() {
            console.log("Products: ", productFactory);
            console.log("newProduct: ", self.newProduct);
            productFactory.add(self.newProduct).then(function(successResp) {
                    $location.path("/list");
                },
                function(err) {
                    console.log("Error: ", err);

                });


        };


    }]);

    app.controller("ProductDetailsController", function(productFactory) {

    });

    app.controller("ListProductsController", function(productFactory) {
        var self = this;
        self.products = productFactory.getAll();

    });

    app.controller("EditProductController", function(productFactory) {

    });

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
