(function(){
var app = angular.module('Store',['ngRoute']);

app.controller('StoreController', function(){
 this.products = items;
 this.showProducts = false;
 this.newProduct ={};
 this.detailedProduct = {};
 this.showDetailsFlag = false;
 this.showForm = false;

 this.addProduct = function(){
 	this.products.push(this.newProduct);
 	this.newProduct.id = 4; //there is some function to generate a new id
 	this.showProducts();
 	this.newProduct = {};
 };
 this.browseProducts = function(){
 	this.detailedProduct = {}; 
 	this.showProducts = true;
 	this.showForm= false;

 };
 this.editProducts = function(){};
 this.removeProducts = function(){};
 this.showAddForm = function(){
 	this.showForm= true;
 	this.showProducts = false;

 }; 

 this.showDetails = function(id){
 	var i = 0;
 	for(;i <this.products.length -1 ;i++){
 		if(this.products[i].id === id){
 			this.detailedProduct = this.products[i];
 		}
 		break;
 		this.showProducts = false;
 	    this.showForm= false;

 	}


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