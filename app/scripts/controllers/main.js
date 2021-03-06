'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('MainCtrl', ['$scope', 'todoService', function ($scope, todoService) {
    //var todosInStore = localStorageService.get('todos');
    console.log('MainCtrl loaded');
    $scope.todos = [];

    /*$scope.$watch('todos', function () {
      localStorageService.set('todos', $scope.todos);
    }, true);*/
    $scope.todos = [];

    $scope.getTodos = function () {
      todoService.getTodos(function (data) {
        console.log(data);
        $scope.todos = data;
      }, function (data, status) {
        console.log(data, status);
      });
    };

    $scope.addTodo = function () {
      if ($scope.todo) {
        todoService.save($scope.todo, function (data) {
          console.log(data);
          $scope.todos.push($scope.todo);
          $scope.todo = '';
        }, function (data, status) {
          console.log(data, status);

        });
      }
    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };
    $scope.init = function () {
      console.log('Main ctrl init is been called');
      $scope.getTodos();
    };
    $scope.init();
  }]);
