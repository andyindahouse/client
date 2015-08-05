'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('toollife', [
  'ionic',
  'ngResource',
  'ngCordova'
  ])

.run(['$log','$ionicPlatform','$state', 'auth', '$ionicLoading', '$rootScope',
  function ($log, $ionicPlatform, $state, auth, $ionicLoading, $rootScope) {

    $log.debug('Iniciando .run de app.js');

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    auth.init();

    //HTTP Auth Interceptor Module (Intercepta respuestas con 401)
    $rootScope.$on('event:auth-loginRequired', function() {
      console.log('Interceptor de 401');
      auth.resetTokenAndUser();
      $state.go('app.start');
    });

    // Manejador de cambio de estado para controlar los accesos.
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){

        console.log(toState);
        console.log(auth.isLoggedIn());

      if(!toState.authenticate && auth.isLoggedIn()){
        // User is logged in redirect to profile page
        console.log('estado no-privado y estas authenticated');
        $state.go('tab.profile');
        event.preventDefault(); 
      }else if(toState.authenticate && !auth.isLoggedIn()){
        // User isn’t authenticated
        console.log('estado privado y no estas authenticated');      
        $state.go('app.start');
        event.preventDefault(); 
      }
    });

}])

.config(['$logProvider','$stateProvider','$urlRouterProvider',
  function($logProvider, $stateProvider, $urlRouterProvider) {

    // DEBUGMODE SERVICIO $log
    $logProvider.debugEnabled(true);

    // Callbacks usadas en el DEBUGMODE.
    var _onEnter = function(config, $state, $log){
      if(config.DEBUGMODE)
        $log.debug('Entrando en el estado: ' + $state.current.name);
    };

    var _onExit = function(config, $state, $log){
      if(config.DEBUGMODE)
        $log.debug('Saliendo del estado: ' + $state.current.name);
    };

    $stateProvider

    //////////////////////////////////////////////////////// Auth zone

    // Primer estado de la app, menu para elegir sing in o sing up.
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'features/app.html'      
    })

    .state('app.start', {
      url: '/start',
      views: {
        'content@app': {
          controller: 'AuthCtrl',
          templateUrl: 'features/auth/index.html'
        }
      },
      authenticate : false,
      onEnter: _onEnter,
      onExit: _onExit
    })

    .state('app.login', {
      url: '/login',
      views: {
        'content@app': {
          controller: 'AuthCtrl',
          templateUrl: 'features/auth/login.html'
        }
      },
      authenticate : false, 
      onEnter: _onEnter,
      onExit: _onExit
    })

    .state('app.signup', {
      url: '/signup',
      views: {
        'content@app': {
          controller: 'AuthCtrl',
          templateUrl: 'features/auth/signup.html'
        }
      },
      authenticate : false, 
      onEnter: _onEnter,
      onExit : _onExit
    })

    //////////////////////////////////////////////////////// Tabs zone

    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'features/tabs.html',
      authenticate : true
    })

    //////////////////////////////////////////////////////// Diary zone

    .state('tab.diary',{
      url: '/diary',
      views: {
        'tab-diary': {
          templateUrl: 'features/diary/diary.html',          
          controller: 'DiaryCtrl'          
        }
      },
      authenticate : true
    })

    
    .state('tab.add-event',{
      url: '/add-event',
      views: {
        'tab-diary': {
          templateUrl: 'features/diary/add-event/add-event.html',
          controller: 'AddEventCtrl'
        }
      },
      authenticate : true
    })

    //////////////////////////////////////////////////////// Notify zone

    .state('tab.notifys',{
      url: '/notifys',
      views: {
        'tab-notifys': {
          templateUrl: 'features/notifys/notifys.html',          
          controller: 'NotifysCtrl'          
        }
      },
      authenticate : true
    })

    //////////////////////////////////////////////////////// News zone

    .state('tab.news',{
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'features/news/news.html',          
          controller: 'NewsCtrl'          
        }
      },
      authenticate : true
    })

    //////////////////////////////////////////////////////// Profile zone
    
    .state('tab.profile',{
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'features/profile/profile.html',          
          controller: 'ProfileCtrl'          
        }
      },
      onEnter: _onEnter,
      onExit: _onExit,
      authenticate : true
    })

    

    .state('tab.edit-profile',{
      url: '/edit-profile',
      views: {
        'tab-profile': {
          templateUrl: 'features/profile/edit-profile/edit-profile.html',
          controller: 'EditProfileCtrl'
        }
      },
      authenticate : true
    })

    //////////////////////////////////////////////////////// Common zone

    .state('tab.list-users',{
      url: '/list-users',
      views: {
        'tab-content': {
          templateUrl: 'features/common/list-users/list-users.html',          
          controller: 'listUsersCtrl'          
        }
      },
      authenticate : true
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/start');
}]);

