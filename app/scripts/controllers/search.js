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
	$scope.example16model = []; 
	$scope.example16data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}]; 
	$scope.selectSettings = {styleActive: true, showCheckAll: false};

	$scope.industryValues;

	$scope.selectTextIndustry = {buttonDefaultText: 'Industry'};
	$scope.selectTextLocation = {buttonDefaultText: 'Location'};
	$scope.selectTextCompanySize = {buttonDefaultText: 'Company Size'};
	$scope.selectTextUseCase = {buttonDefaultText: 'Use Case'};

	$scope.categories = {
		'use_case': [],
		'industry': [],
		'location': [],
		'company_size': []
	};

	$scope.filters = {};

	$scope.maxSize = 5; 
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;
	$scope.currentPage = 1;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function() { 
		console.log('PAGE CHANGED', $scope.currentPage);
		$scope.getUseCaseList();
	};

	$scope.getUseCaseList = function() {
		let options = {
			pagination: {
				currentPage: $scope.currentPage,
				pageLength: $scope.maxSize
			}
		};

	    jsonService.getUseCaseList(options)
	    .then(function(response) {
	    	$scope.items = response.data;
	    	$scope.totalItems = response.pagination.totalItems;

	        for(let cat in $scope.categories) {
		    	$scope.categories[cat] = getValuesOfCategory(cat, $scope.items);
		    }

	        console.log($scope.categories);
	    });
	};

	function init() {
		$scope.getUseCaseList();
	};

	init();

    function getValuesOfCategory(cat, collection) {
    	let values = [];
    	collection.forEach(item => values = values.concat(item[cat]) );	
    	values = _.uniq(values);

    	values.forEach((item, index) => {
    		values[index] = { id: index, label: item };
    	});	

    	return values;
    }


}]);
