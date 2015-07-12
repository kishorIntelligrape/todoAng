'use strict';

angular.module('mytodoApp')
  .service('todoService',  ['$http', '$rootScope', 'httpUtilService', function ($http, $rootScope, httpUtilService) {

    var todoService = {
      getTodos: function (successCallback, failCallback) {
        $http({
            url: 'http://localhost:8080/todo-rest-api/api/todos',
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': $rootScope.user.authorizationHeader
            }
          }
        ).success(function (data) {
            console.log('appointmentService:: data', data);
            successCallback(data);
          }).error(function (data, status) {
            failCallback(data, status);
          });
      },
      save: function (todo, successCallback, failCallback) {
        console.log('todo', todo);
        $http({
            url: 'http://localhost:8080/todo-rest-api/api/todos',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': $rootScope.user.authorizationHeader
            },
            transformRequest: httpUtilService.transformRequest,
            data: todo
          }
        ).success(function (data) {
            console.log('appointmentService:: data', data);
            successCallback(data);
          }).error(function (data, status) {

            console.log('save fail ', data);
            failCallback(data, status);
          });
      }
    };

    return todoService;
  }]);
