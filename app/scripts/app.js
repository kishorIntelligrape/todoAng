'use strict';

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
    'ui.sortable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/todos', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })    
      .otherwise({
        redirectTo: '/'
      });
  });
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