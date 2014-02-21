angular.module('myApp', ['ui.bootstrap','ngSuggest']);

function myController($scope) {
    $scope.input1 = "";
    $scope.input2 = "";
    $scope.api2 = "http://ws.gbv.de/suggest/gn250/?count=20&searchterm=";
}
