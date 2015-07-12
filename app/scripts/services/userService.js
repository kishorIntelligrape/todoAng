'use strict';

angular.module('mytodoApp')
  .service('userService', ['$http', '$rootScope', 'localStorageService', function ($http, $rootScope, localStorageService) {

    var userService = {
      user: null,
      authenticate: function (user, successCallback, failCallback) {
        $http.post('http://localhost:8080/todo-rest-api/api/login',
          {username: user.username, password: user.password})
          .success(function (result) {
            console.log('result', result);

            var user = result;
            user.authorizationHeader = 'Bearer ' + result['access_token'];
            localStorageService.set('user', user);
            $rootScope.user = user;
            successCallback(result);
          })
          .error(function (error) {
            failCallback(error);
          });
      },
      logout: function () {
        localStorageService.set('user', null);
        $rootScope.user = null;
      }
    };

    return userService;
  }]);
