'use strict';

angular.module('toollife')

  .factory('auth', ['config', '$log', '$http', '$window', '$rootScope', '$q',
    function (config, $log, $http, $window, $rootScope, $q) {
    
    //$rootScope.currentUser = $window.get('user') || null;
    //$cordovaLocalStorage.remove('user');

      var _resetTokenAndUser = function(){

        //////////////////////////////////////////////////////// DEBUG zone
        $log.debug('services/Auth.js');
        $log.debug('Funcion resetTokenAndUser');
        //////////////////////////////////////////////////////// DEBUG zone

        $window.localStorage.removeItem('sessionToken');
        $http.defaults.headers.common['X-Access-Token'] = '';
        $window.localStorage.removeItem('user');
        $rootScope.currentUser = '';
      };

      var auth = {
        
        init: function(){

          //////////////////////////////////////////////////////// DEBUG zone
          $log.debug('services/Auth.js');
          $log.debug('Funcion init');
          //////////////////////////////////////////////////////// DEBUG zone

          //set the session token in the http header
          $http.defaults.headers.common['X-Access-Token'] = $window.localStorage.getItem('sessionToken') || ''; 

          // getting the userdata if there's any from the localstorage
          $rootScope.currentUser = JSON.parse($window.localStorage.getItem('user')) || '';
        },

        resetTokenAndUser: function(){

            //////////////////////////////////////////////////////// DEBUG zone
            $log.debug('services/Auth.js');
            $log.debug('Funcion resetTokenAndUser');
            //////////////////////////////////////////////////////// DEBUG zone

            $window.localStorage.removeItem('sessionToken');
            $http.defaults.headers.common['X-Access-Token'] = '';
            $window.localStorage.removeItem('user');
            $rootScope.currentUser = '';
        },

        isLoggedIn: function(){
            var login = false;

            if($rootScope.currentUser)
                login = true;

            return login;
        },

        login: function(user) {

            //////////////////////////////////////////////////////// DEBUG zone
            $log.debug('services/Auth.js');
            $log.debug('Funcion login');
            console.log(user);
            //////////////////////////////////////////////////////// DEBUG zone

            var deferred = $q.defer();

            var success = function(res) {
              $log.debug('service.login>>success');
              console.log(typeof(res));

              var token = res.payload.token;
              var user = res.payload.user;

              $http.defaults.headers.common['X-Access-Token'] = token;
              $window.localStorage.setItem('sessionToken',token);
              $window.localStorage.setItem('user',JSON.stringify(user));
              $rootScope.currentUser = user;

              deferred.resolve(res);              
            };

            var error = function(err) {
              $log.debug('service.login>>error');
              console.log(err); 
              deferred.reject(err);
            };

            $http.post(config.API + '/auth/login', user)
              .success(success)
              .error(error);

            return deferred.promise;
        },

        logout: function() {

            //////////////////////////////////////////////////////// DEBUG zone
            $log.debug('services/Auth.js');
            $log.debug('Funcion logout');
            //////////////////////////////////////////////////////// DEBUG zone

            var deferred = $q.defer();

            var success = function(res) {
              $log.debug('service.logout>>success');
              console.log(res);

              auth.resetTokenAndUser();

              deferred.resolve(res);
            };

            var error = function(err) {
              $log.debug('service.logout>>error');
              console.log(err);

              auth.resetTokenAndUser();

              deferred.reject(err);
            };

            $http.get(config.API + '/auth/logout')
              .success(success)
              .error(error);

            return deferred.promise;        
        },

        createUser: function(user) {

          //////////////////////////////////////////////////////// DEBUG zone
          $log.debug('services/Auth.js');
          $log.debug('Funcion createUser');
          //////////////////////////////////////////////////////// DEBUG zone  

          // Agregamos valores por defecto: avatar, pic-background, provider.

          user.provider = config.provider;
          user.avatar = config.IMG.avatar;
          user.picbg = config.IMG.picBackground;
          user.state = 'YOU ARE MIGHTY';

          var deferred = $q.defer();

          var success = function(res) {
            $log.debug('service.createUser>>success');
            console.log(res.payload);
            deferred.resolve(res.payload.user);
          };

          var error = function(err) {
            $log.debug('service.createUser>>error');
            console.log(err);       
            deferred.reject(err);
          };

          $http.post(config.API + '/auth/register', user)
            .success(success)
            .error(error);

          return deferred.promise;        
        }
      };

    return auth;

  }]);