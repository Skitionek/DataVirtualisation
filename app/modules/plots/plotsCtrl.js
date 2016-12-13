(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:plotsCtrl
	* @description
	* # plotsCtrl
	* Controller of the app
	*/


	var cos = 0;

  	angular
		.module('plots')
		.controller('PlotsCtrl', Plots);

		Plots.$inject = ['$scope','$mdBottomSheet','$timeout'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

	function Plots($scope,$mdBottomSheet, $timeout) {
		/*jshint validthis: true */
		var vm = this;
		Plotly.d3.csv('app/modules/data/data.csv', function(err, rows){

			function unpack(rows, key) {
				return rows.map(function(row) { return row[key]; });
			}

			function randoms(rows, n) {
				return rows.map(function() { return Math.random()*n; });
			}


			var x = unpack(rows, 'time'),
				y = randoms(rows, 100),
				filter = [{
					enabled:true,
					operation:[],
					value:['2010-01-17','2010-04-30'],
					target:'x',
					type:'filter'
				}];

			var annotations = [];
			var layout = {
				type:'scattergl',
				xaxis: {
					title: 'xaxis title',
					range: [1,1000],
					autorange: true,
					rangeslider: {
						range: []
					}
				},
				yaxis: {title: 'yaxis title'},
				margin: {t: 20},
				hovermode: 'closest',
				annotations: annotations
			};$scope.layout = layout;


			var selectorOptions = {
				buttons: [{
					step: 'month',
					stepmode: 'backward',
					count: 1,
					label: '1m'
				}, {
					step: 'month',
					stepmode: 'backward',
					count: 6,
					label: '6m'
				}, {
					step: 'year',
					stepmode: 'todate',
					count: 1,
					label: 'YTD'
				}, {
					step: 'year',
					stepmode: 'backward',
					count: 1,
					label: '1y'
				}, {
					step: 'all'
				}]
			};

			$scope.timeline_layout = angular.extend({},layout,{
					yaxis: {
						fixedrange: true
					},
					margin: {
						l:0,
						r:0,
						t:0,
						b:30
					},
					xaxis : {
						rangeslider: {
							visible: false
						},
						fixedrange: true,
						ticks:	'outside'
					},
					height: 100
				});

			$scope.timeline = {
				min: 20,
				max: 80
			};

			$scope.timeline_options = {
				displayModeBar: false
			};

			var options = {
				displaylogo:false
			};
			$scope.options = options;

			var data = {
				x: 	x,
				y: 	y
			};

			var graphs = [];
			$scope.plotlyEvents = function (graph){
				graphs.push(graph);
				// Create custom events that subscribe to graph
				graph.on('plotly_relayout', function(event){
					if (event) {
						$timeout($scope.$apply());
					}
				});
				graph.on('plotly_hover', function(event){if (event) {$timeout(function () {
					console.log(this);
					graphs.forEach(function (graph) {
						console.log(graph);
						Plotly.Fx.hover(graph,[{
							curveNumber: event.points[0].curveNumber,
							pointNumber:event.points[0].pointNumber
						}]);
					});
					console.log('plotly_hover');
				})}});
				graph.on('plotly_unhover', function(event){if (event) {$timeout(function () {
					console.log(event);
					graphs.forEach(function (graph) {
						Plotly.Fx.unhover(graph,[{
							curveNumber: event.points[0].curveNumber,
							pointNumber:event.points[0].pointNumber
						}]);
					});
					console.log('plotly_hover');
				})}});

				graph.on('plotly_click', function(event){if (event) {$timeout(function () {
					var point = event.points[0];
					annotations.push({
						x: point.xaxis.d2l(point.x),
						y: point.yaxis.d2l(point.y)
					});
				})}});
				graph.on('plotly_clickannotation', function(event){if (event) {$timeout(function () {
					var point = event.points[0];
					console.log(event);
					annotations.pop({
						x: point.xaxis.d2l(point.x),
						y: point.yaxis.d2l(point.y)
					});
				})}});

				// graph.on('plotly_doubleclick', function(event){if (event) {$timeout(console.log('plotly_doubleclick'));}});
				// graph.on('plotly_afterexport', function(event){if (event) {$timeout(console.log('plotly_afterexport'));}});
				// graph.on('plotly_afterplot', function(event){if (event) {$timeout(console.log('plotly_afterplot'));}});
				// graph.on('plotly_animated', function(event){if (event) {$timeout(console.log('plotly_animated'));}});
				// graph.on('plotly_animating', function(event){if (event) {$timeout(console.log('plotly_animating'));}});
				// graph.on('plotly_animatingframe', function(event){if (event) {$timeout(console.log('plotly_animatingframe'));}});
				// graph.on('plotly_animationinterrupted', function(event){if (event) {$timeout(console.log('plotly_animationinterrupted'));}});
				// graph.on('plotly_autosize', function(event){if (event) {$timeout(console.log('plotly_autosize'));}});
				// graph.on('plotly_beforeexport', function(event){if (event) {$timeout(console.log('plotly_beforeexport'));}});
				// graph.on('plotly_buttonclicked', function(event){if (event) {$timeout(console.log('plotly_buttonclicked'));}});
				// graph.on('plotly_deselect', function(event){if (event) {$timeout(console.log('plotly_deselect'));}});
				// graph.on('plotly_doubleclick', function(event){if (event) {$timeout(console.log('plotly_doubleclick'));}});
				// graph.on('plotly_framework', function(event){if (event) {$timeout(console.log('plotly_framework'));}});
				// graph.on('plotly_redraw', function(event){if (event) {$timeout(console.log('plotly_redraw'));}});
				// graph.on('plotly_relayout', function(event){if (event) {$timeout(console.log('plotly_relayout'));}});
				// graph.on('plotly_restyle', function(event){if (event) {$timeout(console.log('plotly_restyle'));}});
				// graph.on('plotly_selected', function(event){if (event) {$timeout(console.log('plotly_selected'));}});
				// graph.on('plotly_selecting', function(event){if (event) {$timeout(console.log('plotly_selecting'));}});
				// graph.on('plotly_sliderchange', function(event){if (event) {$timeout(console.log('plotly_sliderchange'));}});
				// graph.on('plotly_sliderend', function(event){if (event) {$timeout(console.log('plotly_sliderend'));}});
				// graph.on('plotly_sliderstart', function(event){if (event) {$timeout(console.log('plotly_sliderstart'));}});
				// graph.on('plotly_transitioning', function(event){if (event) {$timeout(console.log('plotly_transitioning'));}});
				// graph.on('plotly_update', function(event){if (event) {$timeout(console.log('plotly_update'));}});

			};


			$scope.data1 = [data];
			$scope.data2 = [angular.extend({},data,{
				mode: 'markers'
			})];
			$scope.data3 = [angular.extend({},data,{
				mode: 'markers',
				hoverinfo: 'none'
			})];
			$scope.data4 = [{
				type: 'bar',
				x: unpack(rows, 'time'),
				y: randoms(rows, 100)
			}];
			$scope.data5 = [{
				type: 'scatter',
				x: unpack(rows, 'time'),
				y: randoms(rows, 100)
			}];
		});




		vm.showFilterBottom = function ($event) {
			console.log(dataService.getFilteredData());
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




		d3.json('app/modules/escher/e_coli.iJO1366.central_metabolism.json', function(e, data) {
			d3.text('app/modules/escher/builder-embed-1.3.0.css', function(e, css) {
				if (e) console.warn(e);
				var options = {
					menu: 'all',
					fill_screen: true,
					full_screen: false,
					// not use the d3 transforms for this map
					use_3d_transform: true,
					never_ask_before_quit:	true,
					scroll_behavior: 'none',
					full_screen_button: true
				};
				var b = escher.Builder(data, null, css, d3.select('#map_container'), options);
			});
		});

	}



})();
