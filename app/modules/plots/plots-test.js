(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:plotsTest
	 * @description
	 * # plotsTest
	 * Test of the app
	 */

	describe('plots test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('ang-modular');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('PlotsCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
