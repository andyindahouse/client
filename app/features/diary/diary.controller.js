'use strict';

angular.module('toollife')

	.controller('DiaryCtrl', ['$log','$scope','$state', 
		function ($log, $scope, $state){  

			console.log('DiaryCtrl');


			$scope.uploadImage = function() {

				console.log("subiendo imagen...");
			}


	}]);