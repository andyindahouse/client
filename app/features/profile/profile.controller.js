'use strict';

angular.module('toollife')

	.controller('ProfileCtrl', ['$log','$scope','$state', '$rootScope', 'Profile', 'auth', 
		function ($log, $scope, $state, $rootScope, Profile, auth){

			console.log($rootScope.currentUser);
			$scope.user = $rootScope.currentUser;

			$scope.navigateTo = function(estado){
				$state.go(estado);
			};

			$scope.logout = function(){

				//////////////////////////////////////////////////////// DEBUG zone
					$log.debug('controllers/tabprofile.js');
					$log.debug('Funcion logout');
				//////////////////////////////////////////////////////// DEBUG zone

				var success = function(res) {
					$log.debug('controller.logout>>success');
	      			$log.debug('res: ', res);

	      			$state.go('app.start');
				};

				var error = function(err) {
					$log.debug('controller.logout>>error');
	      			$log.debug('err: ' + err);				

					$state.go('app.start');
				};

				auth.logout().then(success, error); 				
			};

			$scope.edit = function () {

				//////////////////////////////////////////////////////// DEBUG zone
					$log.debug('controllers/tabprofile.js');
					$log.debug('Funcion edit');
				//////////////////////////////////////////////////////// DEBUG zone

				var success = function(res) {
					$log.debug('controller.edit>>success');
	      			$log.debug('res: ', res);

	      			$state.go('app.start');
				};

				var error = function(err) {
					$log.debug('controller.edit>>error');
	      			$log.debug('err: ' + err);				

					$state.go('app.start');
				};				
			};

			$scope.showContacts = function () {
				
				$state.go('tab.list-users');
					
			};	

	}]);