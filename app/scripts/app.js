'use strict';

/**
 * @ngdoc overview
 * @name deputyApp
 * @description
 * # deputyApp
 *
 * Main module of the application.
 */
angular
  .module('deputyApp', [
    'ngRoute',
    'angularjs-dropdown-multiselect',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('_', window._);

