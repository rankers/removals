'use strict';

/**
 * @ngdoc function
 * @name removalsApp.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of the removalsApp
 */
angular.module('removalsApp')
  .controller('RoomCtrl', function ($scope, $routeParams, _, storageSrvc, roomType, itemType) {
    var roomIdInt = parseInt($routeParams.roomId);
    storageSrvc.getById(roomType, roomIdInt).then(function(room){
        $scope.room = room;
    });

    storageSrvc.getAll(itemType).then(function(){
        $scope.items = _.filter(storageSrvc.items, function(item){
            return item.roomId === roomIdInt;
        });
    });

    $scope.name= '';
    $scope.weight = '';
    $scope.desc = '';
    $scope.fragile = false;

    $scope.addItem = function(){
        storageSrvc.insert(itemType, {
            id: $scope.items.length,
            roomId: roomIdInt,
            name: $scope.name,
            weight: $scope.weight,
            desc: $scope.desc,
            fragile:$scope.fragile
        });
    };

  });