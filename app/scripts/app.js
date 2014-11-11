'use strict';

/**
 * @ngdoc overview
 * @name removalsApp
 * @description
 * # removalsApp
 *
 * Main module of the application.
 */
angular
  .module('removalsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'underscore'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: function(storageSrvc){
          return storageSrvc;
        }
      })
      .when('/room/:roomId', {
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('roomType', 'rooms')
  .constant('itemType', 'items');
