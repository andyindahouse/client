'use strict';

angular.module('toollife')

	.controller('listUsersCtrl', ['$log','$scope','$state', '$rootScope', 
		function ($log, $scope, $state, $rootScope){

			console.log($rootScope.currentUser);
			$scope.contacts = $rootScope.currentUser.contacts;
		
			$scope.search = function () {
				console.log('test');
			};


	}]);