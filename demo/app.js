angular.module('myApp', ['ui.bootstrap','ngSuggest']);

function myController($scope) {
		$scope.example = [ 
			{
				api: "http://ws.gbv.de/suggest/geonames/?country=DE&count=20&searchterm=",
			},
			{
				api: "http://ws.gbv.de/suggest/gn250/?count=20&searchterm=",
			},
			{
				api: "http://ws.gbv.de/suggest/gnd/?count=20&type=&searchterm=",
			},
			{
				api: "https://de.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=",
			},
		];
		for(var i=0; i<4; i++) {
			$scope.example[i].input = "";
			$scope.example[i].onSelect = selectFunction(i); 
		}
		
		function selectFunction(i) {
			return function (item) {
				$scope.example[i].item = item;
				console.log(item)
			}
		}
		
		console.log($scope.onSelect);
}
