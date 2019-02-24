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

	    	//Items after filter
	    	let filteredItems = [];

	    	let pageLength = opt.pagination.pageLength;	
	    	let currentPage = opt.pagination.currentPage;

	    	//Items fetched
	    	let items = response.data;

        	for(let cat in categories) {
		    	categories[cat] = getValuesOfCategory(cat, items);
		    }

	    	let filters = opt.filter.applied;

    		filteredItems = items;
    		console.log('Filtered Items ', filteredItems);

	    	if (opt.filter.amount !== 0) {
	    		console.log('Filters', filters);

	    		for (let prop in filters) {
	    			console.log(prop, ' ', filters[prop]);

	    			if (filters[prop].length) { //This criteria has been used for filtering
	    				filteredItems = _.filter(filteredItems, (item) => {
							return Array.isArray(item[prop]) ? 
								_.intersection(item[prop], filters[prop]).length > 0 : 
								_.includes(filters[prop], item[prop]);
			    		});
	    			}
	    		}
	    	} 
    		console.log('filtered items', filteredItems, filteredItems.length);

	    	let end = currentPage * pageLength;
	    	let start = end - pageLength;

    	    response.pagination = {
    	    	totalItems: filteredItems.length,
    	    	currentPage: currentPage,
    	    	pageLength: pageLength
    	    };

    	    response.data = filteredItems.slice(start, end);

    	    response.categories = categories;

    		return response;
    	});
    };

	function getValuesOfCategory(cat, collection) {
    	let values = [];
    	let count = [];
    	collection.forEach(item => values = values.concat(item[cat]));	
    	count = _.countBy(values);
    	values = _.uniq(values);

    	console.log('Count', count, 'values', values);
    	values.forEach((item, index) => {
    		console.log('CONSOLE', item, index);
    		values[index] = { id: item, label: item + ' (' + count[item] + ')' };
    	});	

    	return values;
    }
});




