(function(){
var app = angular.module('Store',[]);

app.controller('StoreController', function(){
 this.products = items;
 this.showProducts = false;
 this.newProduct ={};
 this.detailedProduct = {};
 
 this.addProduct = function(){
 	this.products.push(this.newProduct);
 	this.newProduct.id = 4; //there is some function to generate a new id
 };
 this.browseProducts = function(){
 	this.showProducts = true;

 };
 this.editProducts = function(){};
 this.removeProducts = function(){};
 

 this.showDetails = function(id){

 };

});

app.directive("productDetails",function(){
	return {
		restrict:'E',
		templateUrl:'product-details.html'
	};
});

var items = [
{id: 1, name: '1990 Toyota Corolla', category: 'car', price: 1500.00, photo: 'car1.jpg', description:"It's fast but has not AC"},
{id: 2, name: '1995 Suzuki Swift', category: 'car', price: 7500.00, photo: 'car2.jpg', description:"It's has the AC but ain't so swift"},
{id: 3, name: '2000 Toyota Corolla', category: 'car', price: 9500.00, photo: 'car3.jpg', description:"It's fast and the AC works"}
]
})();