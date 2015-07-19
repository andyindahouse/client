'use strict';

angular.module('toollife')

	.controller('AuthCtrl', ['$log','$scope','$state', 'auth', 
		function ($log, $scope, $state, auth){  

			$scope.user = {};
			$scope.errorsubmit = false; //AVISO SERVER CAIDO.

			$scope.navigateTo = function(estado){
				$state.go(estado);
			},

			$scope.login = function(userForm){

				//////////////////////////////////////////////////////// DEBUG zone
				$log.debug('controllers/auth.js');
				$log.debug('Funcion login');
				$log.debug('User y Form recibido: ');
				console.log($scope.user);
				console.log(userForm);
				//////////////////////////////////////////////////////// DEBUG zone

				var success = function(res) {
					$log.debug('controller.login>>success');
          			$log.debug('res: ' + res);
					$state.go('tab.profile');
				};

				var error = function(err) {
					$log.debug('controller.login>>error');
          			$log.debug('err: ' + err);
					
					//Si no hay error, el server está caido...
					if(!err)
						$scope.errorsubmit = true;
					else {
						console.log(err);
						$scope.errors = {};

						angular.forEach(err.payload, function(error, field) {
								console.log(error.message);
				            	userForm[field].$setValidity('mongoose', false);
				            	$scope.errors[field] = error.message;
				        });
				        console.log($scope.errors.email);
					}
				};

				auth.login($scope.user).then(success, error); 
			},
			
			$scope.createUser = function (userForm){
				
				//////////////////////////////////////////////////////// DEBUG zone
				$log.debug('controllers/auth.js');
				$log.debug('Funcion createUser');
				$log.debug('User y Form recibido: ');
				console.log($scope.user);
				console.log(userForm);
				//////////////////////////////////////////////////////// DEBUG zone

				var success = function(res) {
					$log.debug('controller.createUser>>success');
					$scope.login();
				};

				var error = function(err) {
					$log.debug('controller.createUser>>error');
					$log.debug('err: ' + err);

					//Si no hay error, el server está caido...
					if(!err)
						$scope.errorsubmit = true;
					else {
						console.log(err);
						$scope.errors = {};


						angular.forEach(err.payload, function(error, field) {
							console.log(error.message);
			            	userForm[field].$setValidity('mongoose', false);
			            	$scope.errors[field] = error.message;
			            });			            
					}
				};

				auth.createUser($scope.user).then(success, error);  
			}

	}]);