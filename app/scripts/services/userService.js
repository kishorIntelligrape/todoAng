'use strict';

angular.module('mytodoApp')
.service('userService', ['$http', '$rootScope', function ($http, $rootScope){

	var userService = {
        user: null,
        authenticate: function(user, successCallback, failCallback){
            $http.post('http://localhost:8080/todo-rest-api/api/login',
                {username: user.username, password: user.password})
                .success(function(result){
                    console.log('result', result);
                    $rootScope.user = result;
                    $rootScope.user.authorizationHeader = 'Bearer '+result['access_token'];
                    successCallback(result);
                })
                .error(function(error){
                    failCallback(error);
                });
        }
	};

	return userService;
}]);