(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.controller:LayoutCtrl
	 * @description
	 * # LayoutCtrl
	 * Controller of the app
	 */

	angular
		.module('ang-modular')
		.controller('FilterCtrl', Filter)
		.filter('filterData', filterData);

	Filter.$inject = ['$mdBottomSheet'];
	filterData.$inject = [];

	/*
	 * recommend
	 * Using function declarations
	 * and bindable members up top.
	 */

	function Filter($scope) {
		/*jshint validthis: true */
		var vm = this;

		vm.listRegionClick = function ($index) {
			var clickedRegion = vm.items[$index];
			$mdBottomSheet.hide(clickedRegion);
		};

		vm.regions = ["US","CANADA","etc","EUROPE"];
		vm.selected = vm.regions;
		vm.toggle = function (region, list) {
			var idx = list.indexOf(region);
			if (idx > -1) {
				list.splice(idx, 1);
			}
			else {
				list.push(region);
			}
		};

		vm.exists = function (region, list) {
			return list.indexOf(region) > -1;
		};

		vm.isIndeterminate = function() {
			return (vm.selected.length !== 0 &&
			vm.selected.length !== vm.regions.length);
		};

		vm.isChecked = function() {
			return vm.selected.length === vm.regions.length;
		};

		vm.toggleAll = function() {
			if (vm.selected.length === vm.regions.length) {
				vm.selected = [];
			} else if (vm.selected.length === 0 || vm.selected.length > 0) {
				vm.selected = vm.regions.slice(0);
			}
		};



		vm.myDate = new Date();

		vm.minDate = new Date(
			vm.myDate.getFullYear(),
			vm.myDate.getMonth() - 2,
			vm.myDate.getDate());

		vm.maxDate = new Date(
			vm.myDate.getFullYear(),
			vm.myDate.getMonth() + 2,
			vm.myDate.getDate());






	vm.readonly = false;
	vm.selectedItem = null;
	vm.searchText = null;
	vm.querySearch = querySearch;
	vm.chemicals = loadChemicals();
	vm.selectedChemicals = [];
	vm.numberChips = [];
	vm.numberChips2 = [];
	vm.numberBuffer = '';
	vm.autocompleteDemoRequireMatch = true;
	vm.transformChip = transformChip;

	/**
	 * Return the proper object when the append is called.
	 */
	function transformChip(chip) {
		// If it is an object, it's already a known chip
		if (angular.isObject(chip)) {
			return chip;
		}

		// Otherwise, create a new one
		return { name: chip, type: 'new' }
	}

	/**
	 * Search for chemicals.
	 */
	function querySearch (query) {
		var results = query ? vm.chemicals.filter(createFilterFor(query)) : [];
		return results;
	}

	/**
	 * Create filter function for a query string
	 */
	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);

		return function filterFn(chemical) {
			return (chemical._lowername.indexOf(lowercaseQuery) === 0) ||
				(chemical._lowertype.indexOf(lowercaseQuery) === 0);
		};

	}

	function loadChemicals() {
		var chemi = [
			{
				'name': 'chem1',
				'type': 'type1'
			},
			{
				'name': 'chem2',
				'type': 'type2'
			},
			{
				'name': 'chem3',
				'type': 'type3'
			},
			{
				'name': 'Lettuce',
				'type': 'type4'
			},
			{
				'name': 'chem4',
				'type': 'type5'
			}
		];

		return chemi.map(function (chem) {
			chem._lowername = chem.name.toLowerCase();
			chem._lowertype = chem.type.toLowerCase();
			return chem;
		});
	}
	}

	function filterData() {
		return function (input) {
			return input.map(function (row) {
				return row;
			})
		}
	}

})();
