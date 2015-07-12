'use strict';

var checkRouting= function ($q, $rootScope, $location) {
  //console.log ("$rootScope.user:", $rootScope.user);
  if ($rootScope.user) {
    return true;
  } else {
    var deferred = $q.defer();
    deferred.reject();
    $location.path('/');
    return deferred.promise;
  }
};
var directToHomePageIfLoggedIn = function ($q, $rootScope, $location) {

  if ($rootScope.user) {
    var deferred = $q.defer();
    deferred.reject();
    $location.path('/todos');
    return deferred.promise;
  }
};


/**
 * @ngdoc overview
 * @name mytodoApp
 * @description
 * # mytodoApp
 *
 * Main module of the application.
 */
angular
  .module('mytodoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule'
  ]).config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }]).config(['$provide', '$httpProvider', function ($provide, $httpProvider) {

    // Intercept http calls.
    $provide.factory('CustomHttpInterceptor',['$q', '$rootScope', 'localStorageService', '$location', function ($q, $rootScope, localStorageService, $location) {
      return {
        // On request success
        request: function (config) {
          // Contains the data about the request before it is sent.
          config.headers['X-Requested-With'] = 'XMLHttpRequest';
          // Return the config or wrap it in a promise if blank.
          return config || $q.when(config);
        },
        responseError: function(rejection) {
          var status = rejection.status; // error code
          if(status === 0) {
            //$rootScope.$broadcast("SERVER:UNREACHABLE:ERROR", status);
            return;
          }
          /**
           * If authentication error send user to login page
           */
          if (status === 401) {
            //$rootScope.$broadcast("AUTH:ERROR", status);
            $rootScope.user = null;
            localStorageService.set('user', null);
            $location.path('/');
            return;
          }

          if ( (status >= 500) && (status < 600) ) {
            // TODO $rootScope.$broadcast("SERVER:ERROR", status);
            return;
          }
          return $q.reject(rejection);
        }
      };
    }]);

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('CustomHttpInterceptor');

  }]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
          factory: directToHomePageIfLoggedIn
        }
      })
      .when('/todos', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          factory: checkRouting
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: {
          factory: checkRouting
        }
      }).when('/logout', {
        template: ' ',
        controller: 'LogoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run ( ['$rootScope', 'localStorageService', function ($rootScope, localStorageService){
    $rootScope.user = localStorageService.get('user');
  }]

);
