"use strict";
describe('Service: userService', function () {

  // load the service's module
  beforeEach(module('mytodoApp'));

  var userService;

  // intialize user service
  beforeEach(inject(function (_userService_) {
    userService = _userService_
    spyOn()
  }));

  it('canary test for user service', function () {
  	expect(true).toBeTruthy();
  });

  it('scope should not contain any user information', function() {
  	expect(userService.user).toBeNull();
  });

  /*describe('with spies', function() {
    beforeEach(inject(function($controller, $rootScope, githubApi) {
      $scope = $rootScope.$new();

      spyOn(githubApi, 'getJasonMore').and.callFake(function() {
        return {
          success: function(callback) { callback({things: 'and stuff'})}
        };
      });

      MainCtrl = $controller('MainCtrl', { $scope: $scope, githubApi: githubApi });
    }));
    
    it('should set data to "things and stuff"', function() {
      expect($scope.data).toEqual({
        things: 'and stuff'
      });
    });
  
  });

  describe('with httpBackend', function() {
    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      $scope = $rootScope.$new();
      
      $httpBackend.when('GET', 'https://api.github.com/users/jasonmore')
        .respond({things: 'and stuff'});

      MainCtrl = $controller('MainCtrl', { $scope: $scope });
      $httpBackend.flush();
    }));
    
    it('should set data to "things and stuff"', function() {
      expect($scope.data).toEqual({
        things: 'and stuff'
      });
    });
  });*/

});