(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('ang-modular')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService','$mdBottomSheet'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService,$mdBottomSheet) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "Hello, ang-modular!";
		vm.version = "1.0.0";
		vm.listFeatures = homeService.getFeaturesList();

		vm.showFilterBottom = function ($event) {
			console.log($mdBottomSheet);
			vm.alert = '';
			$mdBottomSheet.show({
				templateUrl: 'app/modules/filter/filter.html',
				controller: 'FilterCtrl',
				controllerAs: 'vm',
				targetEvent: $event
			}).then(function (clickedItem) {
				$mdToast.show(
					$mdToast.simple()
						.content(clickedItem.name + ' clicked!')
						.position('top right')
						.hideDelay(2000)
				);
			});
		};
	}

})();
