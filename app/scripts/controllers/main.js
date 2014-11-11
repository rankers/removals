'use strict';

/**
 * @ngdoc function
 * @name removalsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the removalsApp
 */
angular.module('removalsApp')
  .controller('MainCtrl', function ($scope, storageSrvc, roomType, _) {

    storageSrvc.getAll(roomType).then(function(){
        $scope.rooms = storageSrvc.rooms;
    });

    $scope.newRoomName = '';
    $scope.error = false;

    $scope.addRoom = function(){
        $scope.error = false;

        if ($scope.newRoomName === ''){
            $scope.error = true;
            return;
        }

        if (_.contains(_.map($scope.rooms, function(room){return room.name}), $scope.newRoomName)){
            $scope.error = true;
            return;
        }

        storageSrvc.insert(roomType, {id: $scope.rooms.length, name: $scope.newRoomName});
        $scope.newRoomName = '';
    };

    $scope.editRoom = function(){
        //TODO
    };

  });
