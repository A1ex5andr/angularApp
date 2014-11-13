(function() {

	// TODO: would be good to iterate over each 'angular.module' in /modules and add to dependencies
	var app = angular.module('store', [
		'ngRoute',
		'catalog',
		'storeService',
		'store-gallery',
		'store-panel',
		'contact',
		'scopeTest',
		'cart'
	]);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			// Home
			.when("/", {templateUrl: "layout/home.html", controller: "PageCtrl"})

			// main page modules
			.when("/catalog", {templateUrl: "layout/catalog.html", controller: "PageCtrl"})
			.when("/contact", {templateUrl: "layout/contact.html", controller: "ContactCtrl"})
			.when("/cart", {templateUrl: "layout/cart.html", controller: "PageCtrl"})
			.when("/test", {templateUrl: "layout/test.html", controller: "PageCtrl"})

			// else 404
			.otherwise("/404", {templateUrl: "layout/404.html", controller: "PageCtrl"})
	}]);

	app.controller('PageCtrl', function (/* $scope, $location, $http */) {
		console.log("Page Controller reporting on duty.");
	});

}());