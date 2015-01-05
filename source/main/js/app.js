var app = angular.module('store', [
	'ui.router',
	'ngResource',
	'contact',
	'scopeTest'
])
.controller('PageCtrl', ['$log', function ($log/* $scope, $location, $http */) {
	$log.info("Page Controller reporting on duty.");
}]);