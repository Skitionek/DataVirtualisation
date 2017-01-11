(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:plotsCtrl
	* @description
	* # plotsCtrl
	* Controller of the app
	*/

  	angular
		.module('plots')
		.controller("PlotsCtrl", Plots);

		Plots.$inject = ["$scope",'$mdBottomSheet','$timeout','$element'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

	function Plots($scope, $element) {
		/*jshint validthis: true */
		// var vm = this;

		function unpack(nodes, key) {
			return Object.keys(nodes).map(function (node) {
				return nodes[node][key];
			});
		}

		function getSum(total, num) {
			if (typeof total === 'string') return total + "<br>" + num;
			return total + num;
		}

		d3.json("app/modules/data/data.jsog.json", function(e, dataraw) {
			if (e) {
				console.warn(e);
			}
			dataraw = JSOG.decode(dataraw);
			console.log(dataraw);
			console.log(unpack(dataraw.locations,'process'));
			console.log(unpack(dataraw.locations,'process').map(function (item) {
				return unpack(item,'name');
			}));
			console.log(unpack(dataraw.locations,'process').map(function (item) {
				return unpack(item,'name').reduce(getSum);
			}));
			var locations = dataraw.locations,
				map_data = [{
					visible: true,
					type: 'scattergeo',
					geo: "geo",
					hoverinfo: 'text+name',
					mode: "markers",
					nicosc: "dziala",
					showlegend: false,
					name: "Value chain 1",
					lat: unpack(locations,'latitude'),
					lon: unpack(locations,'longitude'),
					text: Object.values(locations).map(function (item) {
						var process = item.process?unpack(item.process,'name'):[];
						return (process.length ? "Processes: <br><span>"+ process.reduce(getSum)+"</span>":"");
					}),
					marker: {
						sizemode: 'area',
						size: unpack(locations,'capacity').map(function (item) {
							console.log(item,item.reduce(getSum));
							return item.reduce(getSum);
						}),
						sizeref: 4e3,
						sizemin: 3
					}
				}];

			console.log(map_data);
			$scope.data_map = map_data;

		});



		d3.json("app/modules/data/process_capacity_locations_updated.json", function(e, dataraw) {
			if (e) {
				console.warn(e);
			}

			var companies = [],
				companies_names = [],
				data = [];
			dataraw.forEach(function (cache) {
				var len = cache.company.length;
				for (var i=0;i<len;i++) {
					var name = cache.company[i];
					// console.info(cache.location[i]);
					if (companies_names.indexOf(name) === -1) {
						if (typeof cache.location[i] !== "string")
							companies[name] = [angular.extend(cache.location[i],{
								proccess: [cache.name]
							})];
					}
					var company = {
						name:cache.company[i],
						location: cache.location[i],
						capacity: cache.capacity[i]
					};
				}
				data.push({
					visible: true,
					type: 'scattergeo',
					geo: "geo",
					hoverinfo: 'text+name',
					mode: "markers",
					name: cache.name,
					showlegend: false,
					text: cache.company,
					lon: unpack(cache.location, 'longitude'),
					lat: unpack(cache.location, 'latitude'),
					marker: {
						sizemode: 'area',
						size: cache.capacity,
						sizeref: 4e3,
						sizemin: 3
					}
				});
			});

			console.info(data);
			// console.info(JSON.stringify(data));
			$scope.map_layout = {
				geo: {
					scope:	'usa',
					projection: {
						type:	"albers usa"
					},
					showcoastlines:	true,
					coastlinecolor:	'#444',
					coastlinewidth:	1
				},
				// title:	'Process capacity locations',
				autoexpand:	true,
				scope:	'usa',
				resolution:	110,
				hovermode:	'closest',
				showlegend:	true,
				margin: {
					t: 0,
					b: 0,
					r: 0,
					l: 0
				}
			};
			// $scope.data_map = data;

			$scope.vegetables = data;
			$scope.selectedVegetables = data;
			$scope.searchTerm = '';
			$scope.clearSearchTerm = function() {
				$scope.searchTerm = '';
			};


			// The md-select directive eats keydown events for some quick select
			// logic. Since we have a search input here, we don't need that logic.
			console.info($element);
			angular.element('input').on("keydown", function(ev) {
				ev.stopPropagation();
			});
			var selectText = ["Select All", "Deselect All"];
			$scope.selectText = selectText[1];
			$scope.toggleSelect = function() {
				$scope.selectedVegetables = $scope.selectedVegetables.length !== $scope.vegetables.length ? $scope.vegetables : [];
				$scope.selectText = selectText[$scope.selectedVegetables===$scope.vegetables?1:0];
				// $scope.selectText = ;
			};

			// 	[{
			// 	type:	'scattergeo',
			// 	name:	link_coo(unpack(nodes,'location'),'address'),
			// 	geo:	'geo',
			// 	hoverinfo:	'text+name',
			// 	mode:	'markers',
			// 	showlegend:	true,
			// 	lon:	link_coo(unpack(nodes,'location'),'longitude'),
			// 	lat:	link_coo(unpack(nodes,'location'),'latitude'),
			// 	text:	link_coo(unpack(nodes,'location'),'address')
			// }];
		});
		// d3.json('app/modules/data/process_capacity_locations_preformated.json', function(e, data) {
		// 	if (e) console.warn(e);
        //
		// 	console.info(data);
		// 	$scope.map_layout = {
		// 		geo: {
		// 			scope:	'usa',
		// 			projection: {
		// 				type:	'albers usa'
		// 			},
		// 			showcoastlines:	true,
		// 			coastlinecolor:	'#444',
		// 			coastlinewidth:	1
		// 		},
		// 		title:	'Process capacity locations',
		// 		autoexpand:	true,
		// 		resolution:	110,
		// 		hovermode:	'closest',
		// 		showlegend:	false
		// 		,
		// 		margin: {
		// 			t: 0,
		// 			b: 0,
		// 			r: 0,
		// 			l: 0
		// 		}
		// 	};
		// 	$scope.data_map = data;
		// });

		/*d3.json('app/modules/escher/e_coli.iJO1366.central_metabolism.json', function(e, dataraw) {
			d3.text('app/modules/escher/builder-embed-1.3.0.css', function (e, css) {
				if (e) console.warn(e);
				var nodes = dataraw[1].nodes;

				var annotations = [];

				var layout = {
					type: 'scattergl',
					xaxis: {
						title: 'xaxis title',
						range: [1, 1000],
						autorange: true,
						rangeslider: {
							range: []
						}
					},
					yaxis: {title: 'yaxis title'},
					margin: {t: 20},
					hovermode: 'closest',
					annotations: annotations
				};
				$scope.layout = layout;
				$scope.timeline_layout = {
					yaxis: {
						fixedrange: true
					},
					margin: {
						l: 0,
						r: 0,
						t: 0,
						b: 30
					},
					xaxis: {
						rangeslider: {
							visible: false
						},
						fixedrange: true,
						ticks: 'outside'
					},
					height: 100
				};



				var options = {
					displaylogo: false
				};
				$scope.options = options;
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
				$scope.timeline_options = {
					displayModeBar: false
				};

				$scope.timeline = {
					min: 20,
					max: 80
				};
				var data = {
					x: unpack(nodes, 'x'),
					y: unpack(nodes, 'y'),
					bigg_id: unpack(nodes, 'bigg_id')
				};
				$scope.data1 = [data];
				$scope.data2 = [angular.extend({}, data, {
					mode: 'markers'
				})];
				$scope.data3 = [angular.extend({}, data, {
					mode: 'markers',
					hoverinfo: 'none'
				})];


				var active = {
					selected: {
						node:	[],
						id:		[]
					},
					deselect: {
						node:	[],
						id:		[]
					},
					hover: {
						plotly:	[],
						id:		[]
					},
					unhover: {
						plotly:	[],
						id:		[]
					},
					unpack_activity: function (activity, key) {
						return activity.map(function (point) {
							return point[key];
						})
					}//,
					// antonym: {
					// 	'hover'   :'unhover',
					// 	'unhover' :'hover',
					// 	'deselect':'selected',
					// 	'selected':'deselect'
					// },
					// additive: [
					// 	'hover',
					// 	'selected'
					// ],
					// isAdditive: function (key) {
					// 	return this.additive.indexOf(key) !== -1;
					// }
				};
				var graphs = [];
				var selected_style = {
					opacity:new Array(Object.keys(nodes).length),
					color:	new Array(Object.keys(nodes).length)
				};
				$scope.plotlyEvents = function (graph) {
					graphs.push(graph);

					var find_node = function (x,y) {
						for (var node in nodes) {
							if (nodes[node].x == x && nodes[node].y == y) {
								return nodes[node];
							}
						}
					};

					var push_uniq = function (arr, elem) {
						if (arr.indexOf(elem) === -1) arr.push(elem);
					};

					var event_handle = function (event,key) {
						console.log(event);
						if (event) {
							$timeout(function () {
								active[key] = [];
								event.points.forEach(function (event_point) {
									if (active.isAdditive(key)) {
										active[key].push({
											plotly: {
												curveNumber: event_point.curveNumber,
												pointNumber: event_point.pointNumber
											}
										});
									} else {
										// console.log("works?");
										active[active.antonym[key]].forEach(function (point, index, arr) {
											if (point.plotly.curveNumber == event_point.curveNumber &&
												point.plotly.pointNumber == event_point.pointNumber) {
												active[key].push(point);
												arr.splice(index - 1);
											}
										});
									}
								});
								// console.log(active.unpack_activity(active[key],'plotly'));
								graphs.forEach(function (gra) {
										switch (key) {
											case 'hover':
											case 'unhover':
												if (gra !== graph) { // works! so why still flicker?
												Plotly.Fx[key](gra, active.unpack_activity(active[key], 'plotly'));
												}
												break;
											case 'selected':
											case 'deselect':
												Plotly.restyle(gra, {
													'marker.opacity': '0.2',
													'line.opacity'	: '0.2'
												});
												var colors = [];
												active[key].forEach(function (point) {
													colors[point.plotly.pointNumber] = active.isAdditive(key)?'1':'0.2';
												});
												Plotly.restyle(gra, {
													'marker.opacity': [colors],
													'line.opacity'	: [colors]
												});
										}
								});
							})
						}
					};
					// Create custom events that subscribe to graph
					graph.on('plotly_relayout', function (event) {
						if (event) {
							$timeout($scope.$apply());
						}
					});
					graph.on('plotly_hover', function (event) {

						if (event) {
							$timeout(function () {
								active['hover'] = [];
								event.points.forEach(function (event_point) {
										active['hover'].push({
											plotly: {
												curveNumber: event_point.curveNumber,
												pointNumber: event_point.pointNumber
											}
										});
								});
								// console.log(active.unpack_activity(active['hover'],'plotly'));
								graphs.forEach(function (gra) {
											if (gra !== graph) { // works! so why still flicker?
												Plotly.Fx['hover'](gra, active.unpack_activity(active['hover'], 'plotly'));
											}
								});
							})
						}


					});
					graph.on('plotly_unhover', function (event) {


						if (event) {
							$timeout(function () {
								active['unhover'] = [];
								event.points.forEach(function (event_point) {
											// console.log("works?");
										active[active.antonym['unhover']].forEach(function (point, index, arr) {
											if (point.plotly.curveNumber == event_point.curveNumber &&
												point.plotly.pointNumber == event_point.pointNumber) {
												active['unhover'].push(point);
												arr.splice(index - 1);
											}
										});
								});
								// console.log(active.unpack_activity(active['unhover'],'plotly'));
								graphs.forEach(function (gra) {
											if (gra !== graph) { // works! so why still flicker?
												Plotly.Fx['unhover'](gra, active.unpack_activity(active['unhover'], 'plotly'));
											}
								});
							})
						}


					});
					graph.on('plotly_selected', function(event){
						if (event) {
							$timeout(function () {
								active['selected'].node = [];
								active['selected'].id = [];
								event.points.forEach(function (event_point) {
									var node = find_node(event_point.x,event_point.y);
									active['selected'].node.push(
										angular.extend(node,{
											curveNumber: event_point.curveNumber,
											pointNumber: event_point.pointNumber
										})
									);
									push_uniq(active['selected'].id,node.bigg_id);
								});
								selected_style.opacity.fill(0.2);
								selected_style.color.fill('#1f77b4');
								d3.selectAll('.node').classed('selected', function(d) {
									if (active.selected.id.indexOf(d.bigg_id) !== -1) {
										var x = data.x.indexOf(d.x);
										if (x === data.y.indexOf(d.y) && x !== -1) {
											selected_style.color[x] = '#b47777';
											selected_style.opacity[x] = 0.6;
										}
										return true;
									}
								});
								active['selected'].node.forEach(function (node) {
									selected_style.opacity[node.pointNumber] = 1;
								});
								graphs.forEach(function (gra) {
									Plotly.restyle(gra, {
										marker: [selected_style]
									});
								});
							})
						}
					});
					//graph.on('plotly_deselect', function(event){event_handle(event, 'deselect')});

					// graph.on('plotly_click', function (event) {
					// 	if (event) {
					// 		$timeout(function () {
					// 			var point = event.points[0];
					// 			annotations.push({
					// 				x: point.xaxis.d2l(point.x),
					// 				y: point.yaxis.d2l(point.y)
					// 			});
					// 		})
					// 	}
					// });
					// graph.on('plotly_clickannotation', function (event) {
					// 	if (event) {
					// 		$timeout(function () {
					// 			var point = event.points[0];
					// 			annotations.pop();
					// 		})
					// 	}
					// });

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
					// graph.on('plotly_framework', function(event){if (event) {$timeout(console.log('plotly_framework'));}});
					// graph.on('plotly_redraw', function(event){if (event) {$timeout(console.log('plotly_redraw'));}});
					// graph.on('plotly_restyle', function(event){if (event) {$timeout(console.log('plotly_restyle'));}});
					// graph.on('plotly_selecting', function(event){if (event) {$timeout(console.log('plotly_selecting'));}});
					// graph.on('plotly_sliderchange', function(event){if (event) {$timeout(console.log('plotly_sliderchange'));}});
					// graph.on('plotly_sliderend', function(event){if (event) {$timeout(console.log('plotly_sliderend'));}});
					// graph.on('plotly_sliderstart', function(event){if (event) {$timeout(console.log('plotly_sliderstart'));}});
					// graph.on('plotly_transitioning', function(event){if (event) {$timeout(console.log('plotly_transitioning'));}});
					// graph.on('plotly_update', function(event){if (event) {$timeout(console.log('plotly_update'));}});

				};

				// vm.showFilterBottom = function ($event) {
				// 	console.log(dataService.getFilteredData());
				// 	console.log($mdBottomSheet);
				// 	vm.alert = '';
				// 	$mdBottomSheet.show({
				// 		templateUrl: 'app/modules/filter/filter.html',
				// 		controller: 'FilterCtrl',
				// 		controllerAs: 'vm',
				// 		targetEvent: $event
				// 	}).then(function (clickedItem) {
				// 		$mdToast.show(
				// 			$mdToast.simple()
				// 				.content(clickedItem.name + ' clicked!')
				// 				.position('top right')
				// 				.hideDelay(2000)
				// 		);
				// 	});
				// };






				var options = {
					menu: 'all',
					fill_screen: true,
					full_screen: false,
					// not use the d3 transforms for this map
					use_3d_transform: true,
					never_ask_before_quit: true,
					scroll_behavior: 'none',
					full_screen_button: true
				};
				var contain = d3.select('#map_container');
				var b = escher.Builder(dataraw, null, css, contain, options);

				var svg = contain.selectAll("svg");
				svg.selectAll("circle")
					.on("mouseover", handleMouseOver)
					.on("mouseout", handleMouseOut);

				var radius = 20;
				// Create Event Handlers for mouse
				function handleMouseOver(d, i) {  // Add interactivity

					// Use D3 to select element, change color and size
					d3.select(this).attr({
						r: radius * 20
					});
				}
				function handleMouseOut(d, i) {
					// Use D3 to select element, change color back to normal
					d3.select(this).attr({
						r: radius
					});

				}






			});
		}); */

	}



})();
