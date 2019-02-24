'use strict';

angular.module('deputyApp')
.service("jsonService", function($http, $q, _) {
    // var deferred = $q.defer();

    // this.getUseCaseList = function() {
    // 	console.log('PROMISE', deferred.promise);
    //     return deferred.promise;
    // }

    this.getUseCaseList = function(options) {
	    return $http.get('assets/json/data.json')
	    .then(function(response) {
	    	let pageLength = options.pagination.pageLength;
	    	let currentPage = options.pagination.currentPage;

	    	let items = response.data;
	    	let end = currentPage * pageLength;
	    	let start = end - pageLength;

    	    response.pagination = {
    	    	totalItems: items.length,
    	    	currentPage: currentPage,
    	    	pageLength: pageLength
    	    };

    	    response.data = items.slice(start, end);

    		return response;
    	});
    };


});