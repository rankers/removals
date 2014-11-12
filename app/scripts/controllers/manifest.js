'use strict';

/**
 * @ngdoc function
 * @name removalsApp.controller:ManifestCtrl
 * @description
 * # ManifestCtrl
 * Controller of the removalsApp
 */
angular.module('removalsApp')
  .controller('ManifestCtrl', function ($scope, $routeParams, _, storageSrvc, roomType, itemType) {

    storageSrvc.getAll(itemType).then(function(){
        $scope.items = storageSrvc.items;
    });

    storageSrvc.getAll(roomType).then(function(){
        $scope.rooms = storageSrvc.rooms;
        _.each($scope.rooms, function(room){
            var roomItems = _.filter($scope.items, function(item){
                return item.roomId === room.id;
            });

            room.byFragility = _.filter(roomItems, function(item){
                return item.fragile;
            });

            room.byWeight = _.last(_.sortBy(roomItems, function(item){
                return item.weight;
            }), 2);

            //Sort by big to small
            room.byWeight.reverse();

            room.allOthers = _.filter(roomItems, function(item){
                return !(_.contains(room.byFragility, item)|| _.contains(room.byWeight, item));
            });
        });
    });
});