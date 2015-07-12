'use strict';
/**
 * http method is sending data as JSON in POST which is not parsed by grails controller.
 * To send data as post form data util service have method transformRequest.
 */
angular.module('mytodoApp').factory('httpUtilService', [function () {
    var isUndefinedOrNull =  function(obj) {
        return angular.isUndefined(obj) || obj===null;
    };
    return {

        transformRequest: function(obj) {
            var str = [];
            for(var p in obj) {
                var value = !isUndefinedOrNull(obj[p]) ? obj[p] : '';
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(value));
            }
            return str.join('&');
        }
    };
}]);
