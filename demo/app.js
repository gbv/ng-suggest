angular.module('myApp', ['ui.bootstrap','ngSuggest']);

function myController($scope) {
    $scope.input1 = "";
    $scope.input2 = "";
    $scope.input3 = "";
    $scope.input4 = "";
    $scope.input5 = "";
    $scope.api1 = "http://ws.gbv.de/suggest/geonames/?country=DE&count=20&searchterm=";
    $scope.api2 = "http://ws.gbv.de/suggest/gn250/?count=20&searchterm=";
    $scope.api3 = "http://ws.gbv.de/suggest/gnd/?count=20&type=&searchterm=";
    $scope.api4 = "http://ws.gbv.de/suggest/iconclass/?type=all&count=20&searchterm=";
    $scope.api5 = "https://de.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=";
		$scope.onSelect1 = function ($item, $model, $label) {
			$scope.$item1 = $item;
			$scope.$model1 = $model;
			$scope.$label1 = $label;
			console.log($item)
		};
		$scope.onSelect2 = function ($item, $model, $label) {
			$scope.$item2 = $item;
			$scope.$model2 = $model;
			$scope.$label2 = $label;
			console.log($item)
		};
		$scope.onSelect3 = function ($item, $model, $label) {
			$scope.$item3 = $item;
			$scope.$model3 = $model;
			$scope.$label3 = $label;
			console.log($item)
		};
		$scope.onSelect5 = function ($item, $model, $label) {
			$scope.$item5 = $item;
			$scope.$model5 = $model;
			$scope.$label5 = $label;
			console.log($item)
		};
}
