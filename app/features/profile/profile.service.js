angular.module('toollife')

  .factory('profile', ['config', '$log', '$http', '$window', '$rootScope', '$q',
    function (config, $log, $http, $window, $rootScope, $q) {
    	   
    	   console.log('servicio de profile');

    	   var profile = {

    	   		edit: function (user) {

					var deferred = $q.defer();

					var success = function(res) {
						console.log(res.payload);
						deferred.resolve(res.payload.user);
					};

					var error = function(err) {
						console.log(err);       
						deferred.reject(err);
					};

					$http.post(config.API + '/user/update', user)
					.success(success)
					.error(error);

					return deferred.promise;    	   			
    	   		}
    	   };

    	   return profile;
    	   

  }]);