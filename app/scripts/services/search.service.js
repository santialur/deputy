'use strict';

angular.module('deputyApp')
.service("jsonService", function($http, _) {

    this.getUseCaseList = function(opt) {
	    return $http.get('assets/json/data.json')
	    .then(function(response) {
	    	let filteredItems = [];
	    	let pageLength = opt.pagination.pageLength;
	    	let currentPage = opt.pagination.currentPage;
	    	let items = response.data;

	    	let filters = opt.filter.applied;

    		filteredItems = items;

	    	if (opt.filter.amount !== 0) {

	    		for (let f in filters) {
	    			if (filters[f].length) {
	    				filteredItems = _.filter(filteredItems, (i) => {
			    			console.log(f, ' ', filters[f]);
			    			return _.includes(filters[f], i[f]);
			    		});
	    			}
	    		}

	    		// filteredItems = _.filter(filteredItems, (i) => {
	    		// 	console.log('Industry', filters.industry);
	    		// 	return _.includes(filters.industry, i.industry);
	    		// });
	    		// console.log('Pinc,', filteredItems);
	    		// filteredItems = _.filter(filteredItems, (i) => {
	    		// 	console.log('Location', filters.location);
	    		// 	console.log('includes', _.includes(filters.location, i.location));
	    		// 	return _.includes(filters.location, i.location);
	    		// });
	    		// filteredItems = _.filter(filteredItems, (i) => {
	    		// 	console.log('CompanySize', filters.companySize);
	    		// 	console.log('includes', _.includes(filters.companySize, i.companySize));
	    		// 	return _.includes(filters.companySize, i.companySize);
	    		// });
	    	} 

	    	let end = currentPage * pageLength;
	    	let start = end - pageLength;

    	    response.pagination = {
    	    	totalItems: filteredItems.length,
    	    	currentPage: currentPage,
    	    	pageLength: pageLength
    	    };

    	    response.data = filteredItems.slice(start, end);

    		return response;
    	});
    };
});




