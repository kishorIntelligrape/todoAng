"use strict";
describe('Service: todoService', function () {

  // load the controller's module
  beforeEach(module('mytodoApp'));

  var todoService,
    scope;

  // iitialize todoservice
  beforeEach(inject(function (_todoService_) {
    todoService = _todoService_
  }));
 

});