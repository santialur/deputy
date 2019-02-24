'use strict';

angular.module('deputyApp')
.directive('deputyCard', function() {
  return {
    restrict: 'E',
    scope: {
      uc: '=info'
    },
    templateUrl: '../../views/card.directive.html'
  };
});
