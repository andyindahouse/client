'use strict';

angular.module('toollife')

	.controller('EditProfileCtrl', ['$log','$scope','$state', '$rootScope', 'profile', 'auth', 
		function ($log, $scope, $state, $rootScope, profile, auth){

			console.log($rootScope.currentUser);
			$scope.user = $rootScope.currentUser;

			$scope.navigateTo = function(estado){
				$state.go(estado);
			};

			$scope.edit = function () {

				var success = function(res) {
	      			$state.go('tab.profile');
				};

				var error = function(err) {
					console.log('error');
				};	

				profile.edit($scope.user);
			};

	}]);