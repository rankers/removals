'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('removalsApp'));

  var MainCtrl, scope, storageSrvc, roomType;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _storageSrvc_, _roomType_) {
    scope = $rootScope.$new();
    storageSrvc = _storageSrvc_;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      storageSrvc: storageSrvc,
      roomType: _roomType_
    });
    scope.$digest();
  }));

  it('should start with an empty string room name', function () {
    expect(scope.newRoomName).toBe('');
  });

  it('should add a room', function(){
    scope.newRoomName = 'Test';
    scope.addRoom();
    scope.$digest();
    expect(storageSrvc.rooms.length).toBe(1);
    expect(storageSrvc.rooms[0].id).toBe(0);
    expect(storageSrvc.rooms[0].name).toBe('Test');
  });
});
