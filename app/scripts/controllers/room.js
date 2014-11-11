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

    function retreiveItems(){
        storageSrvc.getAll(itemType).then(function(){
            $scope.items = _.filter(storageSrvc.items, function(item){
                return item.roomId === roomIdInt;
            });
        });
    }

    function setForm(){
        $scope.name= '';
        $scope.weight = '';
        $scope.desc = '';
        $scope.fragile = false;
        $scope.editingItem = null;
        $scope.editing = false;
    }

    retreiveItems();
    setForm();
    
    

    $scope.saveItem = function(){
        if($scope.editing){
            $scope.editingItem.name = $scope.name;
            $scope.editingItem.weight = $scope.weight;
            $scope.editingItem.desc = $scope.desc;
            $scope.editingItem.fragile = $scope.fragile;

            storageSrvc.put(itemType, $scope.editingItem).then(function(){
                setForm();
                retreiveItems();
            });
        }else{
            storageSrvc.insert(itemType, {
                roomId: roomIdInt,
                name: $scope.name,
                weight: $scope.weight,
                desc: $scope.desc,
                fragile:$scope.fragile
            }).then(function(){
                setForm();
                retreiveItems();
            });
        }
    };

    $scope.deleteItem = function(item){
        storageSrvc.deleteObj(itemType, item).then(function(){
            retreiveItems();
        });
    };

    $scope.selectItem = function(item){
        $scope.editing = true;
        $scope.name= item.name;
        $scope.weight = item.weight;
        $scope.desc = item.desc;
        $scope.fragile = item.fragile;
        $scope.editingItem = item;
    };
  });