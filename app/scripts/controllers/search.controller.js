'use strict';

/**
 * @ngdoc function
 * @name deputyApp.controller:MainCtrl
 * @description
 * # SearchCtrl
 * Controller of the deputyApp
 */
angular.module('deputyApp')
.controller('SearchCtrl', ['$scope', 'SearchService', function ($scope, SearchService) {
	//Filter
	$scope.filter = {
		amount: 0,
		applied: {
			industry: [],
			location: [],
			company_size: [],
			use_case: []
		}
	};

	//Multiselect settings
	$scope.selectSettings = {styleActive: true, showCheckAll: false};

	$scope.selectTextIndustry 		= {buttonDefaultText: 'Industry'};
	$scope.selectTextLocation 		= {buttonDefaultText: 'Location'};
	$scope.selectTextCompanySize	= {buttonDefaultText: 'Company Size'};
	$scope.selectTextUseCase 		= {buttonDefaultText: 'Use Case'};

	$scope.selectFilter = {
		industry: [],
		location: [],
		company_size: [],
		use_case: []
	};

	//Pagination settings
	$scope.itemsPerPage = 5; 
	$scope.currentPage = 1;

	$scope.paginationSize; 
	
	$scope.$watch('selectFilter', () => {
		let filtersApplied = 0;

		for (let f in $scope.selectFilter) {
			filtersApplied += $scope.selectFilter[f].length;
    		$scope.filter.applied[f] = $scope.selectFilter[f].map(x => x.id);
		}

		$scope.filter.amount = filtersApplied;

		getUseCaseList();
	}, true);

	$scope.$watch('paginationSize', () => {
		$scope.itemsPerPage = $scope.paginationSize;
	});

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
				pageLength: $scope.itemsPerPage
			},
			filter: $scope.filter
		};

	    SearchService.getUseCaseList(options)
	    .then(function(response) {
	    	$scope.items = response.data;
	    	$scope.totalItems = response.pagination.totalItems;
	    	$scope.categories = response.categories;
	    });
	};

}]);
