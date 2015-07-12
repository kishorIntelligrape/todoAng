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
  }])
  .config(function ($routeProvider) {
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
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run ( ['$rootScope', 'localStorageService', function ($rootScope, localStorageService){
    $rootScope.user = localStorageService.get('user');
  }]

);
