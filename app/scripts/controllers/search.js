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

	$scope.filters = {

	};

    var promise = jsonService.getUseCaseList();
    promise.then(function(data) {
    	$scope.items = data.data;
        for(let cat in $scope.categories) {
	    	$scope.categories[cat] = getValuesOfCategory(cat, data.data);
	    }
        console.log($scope.categories);
    });

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
