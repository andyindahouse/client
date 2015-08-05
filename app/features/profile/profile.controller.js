'use strict';

angular.module('toollife')

	.controller('ProfileCtrl', ['$log','$scope','$state', '$rootScope', 'profile', 'auth', 
		function ($log, $scope, $state, $rootScope, profile, auth){

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

			$scope.showContacts = function () {
				
				$state.go('tab.list-users');
					
			};	

	}]);