'use strict';

/**
 * @ngdoc function
 * @name deputyApp.controller:MainCtrl
 * @description
 * # SearchCtrl
 * Controller of the deputyApp
 */
angular.module('deputyApp')
.controller('SearchCtrl', ['$scope', 'jsonService', function ($scope, jsonService) {
	$scope.maxSize = 5; 
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;
	$scope.currentPage = 1;

	$scope.filter = {
		industry: [],
		location: [],
		companySize: [],
		useCase: []
	};

	$scope.formattedFilter = {
		amount: 0,
		applied: {
			industry: [],
			location: [],
			companySize: [],
			useCase: []
		}
	};

	$scope.selectSettings = {styleActive: true, showCheckAll: false};

	$scope.selectTextIndustry 		= {buttonDefaultText: 'Industry'};
	$scope.selectTextLocation 		= {buttonDefaultText: 'Location'};
	$scope.selectTextCompanySize	= {buttonDefaultText: 'Company Size'};
	$scope.selectTextUseCase 		= {buttonDefaultText: 'Use Case'};

	$scope.categories = {
		'use_case': [],
		'industry': [],
		'location': [],
		'company_size': []
	};

	$scope.$watch('filter', () => {
		let filtersApplied = 0;

		for (let f in $scope.filter) {
			filtersApplied += $scope.filter[f].length;
    		$scope.formattedFilter.applied[f] = $scope.filter[f].map(x => x.id);
		}

		$scope.formattedFilter.amount = filtersApplied;

		getUseCaseList();
		console.log('Filtered', $scope.formattedFilter);
	}, true);

	init();

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function() { 
		getUseCaseList();
	};

	function init() {
		getUseCaseList();
	};

	function getUseCaseList() {
		let options = {
			pagination: {
				currentPage: $scope.currentPage,
				pageLength: $scope.maxSize
			},
			filter: $scope.formattedFilter
		};

	    jsonService.getUseCaseList(options)
	    .then(function(response) {
	    	$scope.items = response.data;
	    	$scope.totalItems = response.pagination.totalItems;

	    	if (!areCategoriesLoaded()) {
		        for(let cat in $scope.categories) {
			    	$scope.categories[cat] = getValuesOfCategory(cat, $scope.items);
			    }
	    	}
	    });
	};

    function getValuesOfCategory(cat, collection) {
    	let values = [];
    	collection.forEach(item => values = values.concat(item[cat]) );	
    	values = _.uniq(values);

    	values.forEach((item, index) => {
    		values[index] = { id: item, label: item };
    	});	

    	return values;
    }

    function areCategoriesLoaded() {
    	return $scope.categories[Object.keys($scope.categories)[0]].length > 0;
    }
}]);
