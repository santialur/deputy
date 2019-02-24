'use strict';

angular.module('deputyApp')
.service("jsonService", function($http, $q, _) {
    var deferred = $q.defer();

    $http.get('assets/json/data.json').then(function(data) {
        deferred.resolve(data);
    });

    this.getUseCaseList = function() {
        return deferred.promise;
    }
});