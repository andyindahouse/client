'use strict';

angular.module('toollife')

	.controller('AddEventCtrl', ['$log','$scope','$state', 'event',
		function ($log, $scope, $state, event){  

			$scope.event = {};

			$scope.createEvent = function(){
				console.log($scope.event);

				var success =  function() {					
					console.log('creado con exito...');
				};

				var error = function () {
					console.log('error...');
				};

				event.create($scope.event).then(success, error);

			};

	}]);   