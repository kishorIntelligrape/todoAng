'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('LogoutCtrl',  ['$scope', 'userService', '$location',
    function ($scope, userService, $location) {
      console.log("logoutctrl is been called");
    	$scope.logout = function () {
        console.log("logout is been called");
    		userService.logout();
          $location.path('/');
    	};
      $scope.logout();
  }]);
