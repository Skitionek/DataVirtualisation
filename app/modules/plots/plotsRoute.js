'use strict';

/**
 * @ngdoc function
 * @name app.route:plotsRoute
 * @description
 * # plotsRoute
 * Route of the app
 */

angular.module('plots')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.plots', {
				url:'/plots',
				templateUrl: 'app/modules/plots/plots.html',
				controller: 'PlotsCtrl',
				controllerAs: 'vm'
			});

		
	}]);
