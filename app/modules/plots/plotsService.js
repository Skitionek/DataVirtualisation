(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:plotsService
	 * @description
	 * # plotsService
	 * Service of the app
	 */

  	angular
		.module('plots')
		.factory('PlotsService', Plots);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Plots.$inject = ['$http'];

		function Plots ($http) {

		}

})();
