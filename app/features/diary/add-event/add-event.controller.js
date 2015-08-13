'use strict';

angular.module('toollife')

	.controller('AddEventCtrl', ['$log','$scope','$state', 'event',
		function ($log, $scope, $state, event){  

			$scope.event = {};

			$scope.createEvent = function(){
				console.log($scope.event);

				var success =  function() {					
					console.log('creado con exito...');

					// http://stackoverflow.com/questions/21309366/angularjs-ui-router-state-go-only-changin-url-in-address-bar-but-not-load
					$state.go('^');
				};

				var error = function () {
					console.log('error...');
				};

				event.create($scope.event).then(success, error);

			};

	}]);   