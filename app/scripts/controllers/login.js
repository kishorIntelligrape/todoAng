'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('LoginCtrl',  ['$scope', 'userService', '$location', 
    function ($scope, userService, $location) {
    	
    	$scope.authenticate = function () {
    		userService.authenticate($scope.user, function (data) {
                console.log(data);
                $location.path('/todos');
            }, function (data){
                console.log(data);
            });
    	};

  }]);
