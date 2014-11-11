angular.module('removalsApp')
    .factory('storageSrvc', function ($q, _) {
        'use strict';

        var STORAGE_ID = 'storageSrvc';

        var storageSrvc = {
            rooms : [],
            items : [],

            _storeName: function(objectType){
                return objectType + '-' + STORAGE_ID;
            },

            _getFromLocalStorage: function (objectType) {
                return JSON.parse(localStorage.getItem(storageSrvc._storeName(objectType)) || '[]');
            },

            _saveToLocalStorage: function (objectType, objects) {
                localStorage.setItem(storageSrvc._storeName(objectType), JSON.stringify(objects));
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

            getAll: function (objectType) {
                var deferred = $q.defer();

                angular.copy(storageSrvc._getFromLocalStorage(objectType), storageSrvc[objectType]);
                deferred.resolve(storageSrvc[objectType]);

                return deferred.promise;
            },

            getById: function(objectType, objectId){
                var deferred = $q.defer();
                var allItems = storageSrvc._getFromLocalStorage(objectType);
                var itemToReturn;
                _.each(allItems, function(item){
                    if (item.id === objectId){
                        itemToReturn = item;
                    }
                });

                deferred.resolve(itemToReturn);

                return deferred.promise;
            },

            insert: function (objectType, object) {
                var deferred = $q.defer();
                var objectTypeArray = storageSrvc[objectType];
                objectTypeArray.push(object);

                storageSrvc._saveToLocalStorage(objectType, objectTypeArray);
                deferred.resolve(objectTypeArray);

                return deferred.promise;
            },

            put: function (objectType, object, index) {
                var deferred = $q.defer();
                var objectTypeArray = storageSrvc[objectType];
                objectTypeArray[index] = object;

                storageSrvc._saveToLocalStorage(objectType, objectTypeArray);
                deferred.resolve(objectTypeArray);

                return deferred.promise;
            }
        };

        return storageSrvc;
    });