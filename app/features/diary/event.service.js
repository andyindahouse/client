'use strict';

angular.module('toollife')

  	.factory('event', ['config', '$http', '$window', '$rootScope', '$q', 
  		function (config, $http, $window, $rootScope, $q) {

  			var event = {	  			

		       	get: function (id) {		       		
		       	},

		       	getAll: function () {		       		
		       	},

		       	create: function(event) {

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

						$http.post(config.API + '/event/create', event)
						.success(success)
						.error(error);

						return deferred.promise;        
		        },

		        update: function (event) {
		        	
		        },

		        delete: function (id) {
		        	
		        }
		    };

		    return event;

	}]);