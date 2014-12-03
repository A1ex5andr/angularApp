var app = angular.module('store', [
	'ngRoute',
	'ngResource',
	'contact',
	'scopeTest'
]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		// Home
		.when("/", {templateUrl: "layout/home.html", controller: "PageCtrl"})

		// main page modules
		.when("/contact", {templateUrl: "layout/contact.html" })
		.when("/test", {templateUrl: "layout/test.html" })

		// else 404
		.otherwise("/404", {templateUrl: "layout/404.html" })
}]);

app.controller('PageCtrl', ['$log', function ($log/* $scope, $location, $http */) {
	$log.info("Page Controller reporting on duty.");
}]);

