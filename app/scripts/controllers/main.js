'use strict';

/**
 * @ngdoc function
 * @name removalsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the removalsApp
 */
angular.module('removalsApp')
  .controller('MainCtrl', function ($scope, storageSrvc) {

    $scope.rooms = storageSrvc.rooms;
    $scope.newRoomName = '';
    var type = 'room';

    $scope.addRoom = function(){
        storageSrvc.insert(type, {id: $scope.rooms.length, name: $scope.newRoomName});
    };

    $scope.editRoom = function(){
        //TODO
    };

  });
