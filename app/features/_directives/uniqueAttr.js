'use strict';

angular.module('toollife')

  .directive('uniqueUsername', function (config, $http) {
    console.log(config.API);
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        function validate(value) {
          if(!value) {
            ngModel.$setValidity('unique', true);
            return;
          }
          $http.get(config.API + '/auth/check_username/' + value)

          .success(function(user) {
            if(!user.exists) {              
              ngModel.$setValidity('unique', true);
            } else {             
              ngModel.$setValidity('unique', false);
            }
          });
        }

        scope.$watch( function() {
          return ngModel.$viewValue;
        }, validate);
      }
    };
  })

  .directive('uniqueEmail', function (config, $http) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {

        function validate(value) {

            if(!value) {
              ngModel.$setValidity('unique', true);
              return;
            }

            $http.get(config.API + '/auth/check_email/' + value)

            .success(function(user) {
              if(!user.exists) {
                ngModel.$setValidity('unique', true);
              } else {
                ngModel.$setValidity('unique', false);
              }
          });         

        }

        scope.$watch( function() {
          return ngModel.$viewValue;
        }, validate);
      }
    };
  })

  .directive('emailRegistered', function (config, $http) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {

        function validate(value) {

            if(!value) {
              ngModel.$setValidity('notexists', true);
              return;
            }

            $http.get(config.API + '/auth/check_email/' + value)

            .success(function(user) {
              if(!user.exists) {
                ngModel.$setValidity('notexists', false);
              } else {
                ngModel.$setValidity('notexists', true);
              }
          });         

        }

        scope.$watch( function() {
          return ngModel.$viewValue;
        }, validate);
      }
    };
  });

