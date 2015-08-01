'use strict';

angular.module('toollife')

  	.factory('auth', ['config', '$log', '$http', '$window', '$rootScope', '$q', 
  		function (config, $log, $http, $window, $rootScope, $q) {

  			var event = {
	  			createUser: function(user) {

			        	//Añadimos valores por defecto al evento

						var deferred = $q.defer();

						var success = function(res) {
						
							console.log(res.payload);
							deferred.resolve(res.payload.user);
						};

						var error = function(err) {
							console.log(err);       
							deferred.reject(err);
						};

						$http.post(config.API + '/event/1', user)
						.success(success)
						.error(error);

						return deferred.promise;        
		        }
		    };

	}]);