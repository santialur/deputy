'use strict';

angular.module('deputyApp')
.service("SearchService", function($http, _) {

	const categories = {
		'use_case': [],
		'industry': [],
		'location': [],
		'company_size': []
	};

    this.getUseCaseList = function(opt) {
	    return $http.get('assets/json/data.json')
	    .then(function(response) {
	    	//Items fetched
	    	let items = response.data;

	    	//Category Setting
        	for(let cat in categories) {
		    	categories[cat] = getValuesOfCategory(cat, items);
		    }

	    	//Items after filter
	    	let filteredItems = [];
	    	let query = opt.filter.applied;

    		filteredItems = items;

	    	if (opt.filter.amount !== 0) { //Filters applied
	    		for (let prop in query) {
	    			if (query[prop].length) { //This criteria has been used for filtering
	    				filteredItems = _.filter(filteredItems, (item) => {
							return Array.isArray(item[prop]) ? 
								_.intersection(item[prop], query[prop]).length > 0 : 
								_.includes(query[prop], item[prop]);
			    		});
	    			}
	    		}
	    	} 

	    	//Pagination Settings
			let pageLength = opt.pagination.pageLength;	
	    	let currentPage = opt.pagination.currentPage;

	    	let end = currentPage * pageLength;
	    	let start = end - pageLength;

	    	response = {
	    		pagination: {
	    	    	totalItems: filteredItems.length,
	    	    	currentPage: currentPage,
	    	    	pageLength: pageLength
	    	    },
	    	    data: filteredItems.slice(start, end),
	    	    categories: categories
	    	}

    		return response;
    	});
    };

	function getValuesOfCategory(cat, collection) {
    	let values = [], 
    		count = [];

    	collection.forEach(item => values = values.concat(item[cat]));	
    	count = _.countBy(values);
    	values = _.uniq(values);

    	values.forEach((item, index) => {
    		values[index] = { 
    			id: item, 
    			label: `${item} (${count[item]})` 
    		};
    	});	

    	return values;
    }
});




