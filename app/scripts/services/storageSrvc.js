angular.module('removalsApp')
    .factory('storageSrvc', function ($q) {
        'use strict';

        var STORAGE_ID = 'storageSrvc';

        var storageSrvc = {
            rooms : [],
            items : [],

            _getFromLocalStorage: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            _saveToLocalStorage: function (objects) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(objects));
            },

            delete: function (objectType, object) {
                var deferred = $q.defer();
                var objectTypeArray = storageSrvc[objectType];
                var indexToRemove = objectTypeArray.indexOf(object);
                objectTypeArray.splice(indexToRemove, 1);

                storageSrvc._saveToLocalStorage(objectTypeArray);
                deferred.resolve(objectTypeArray);

                return deferred.promise;
            },

            get: function (objectType) {
                var deferred = $q.defer();

                angular.copy(storageSrvc._getFromLocalStorage(), storageSrvc[objectType]);
                deferred.resolve(storageSrvc[objectType]);

                return deferred.promise;
            },

            insert: function (objectType, object) {
                var deferred = $q.defer();
                var objectTypeArray = storageSrvc[objectType];
                objectTypeArray.push(object);

                storageSrvc._saveToLocalStorage(objectTypeArray);
                deferred.resolve(objectTypeArray);

                return deferred.promise;
            },

            put: function (objectType, object, index) {
                var deferred = $q.defer();
                var objectTypeArray = storageSrvc[objectType];
                objectTypeArray[index] = object;

                storageSrvc._saveToLocalStorage(objectTypeArray);
                deferred.resolve(objectTypeArray);

                return deferred.promise;
            }
        };

        return storageSrvc;
    });