'use strict';

angular.module('mytodoApp')
.service('todoService', '$rootScope', ['$http', function ($http, $rootScope){

	var todoService = {
		getTodos: function (successCallback, failCallback) {
			$http({
                        url: '',
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                                    'Authorization' : $rootScope.user.authorizationHeader
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
            $http({
                    url: '',
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization' : $rootScope.user.authorizationHeader
                              }
                              
                }
            ).success(function (data) {
                console.log('appointmentService:: data', data);
                successCallback(data);
            }).error(function (data, status) {
                failCallback(data, status);
            });
        }
	};

	return todoService;
}]);