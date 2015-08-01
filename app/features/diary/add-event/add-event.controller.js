'use strict';

angular.module('toollife')

	.controller('AddEventCtrl', ['$log','$scope','$state', 'event'
		function ($log, $scope, $state){  

			$scope.event = {};

			$scope.createEvent = function(){
				console.log($scope.event);

				var success =  function() {					

				};

				var error = function () {
					
				};

				event.create($scope.event).then(success, error);

			};

	}]);   