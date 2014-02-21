'use strict';
/**
 * @ngdoc module
 */

angular.module('ngSuggest',['ui.bootstrap'])
/**
 * @ngdoc directive
 * @name ng-suggest.directive:ng-suggest
 * @restrict A
 * @description
 * 
 * ...
 */
.directive('ngSuggest',function($http){
    return {
        restrict: 'A',
        scope: {
            api: '@ngSuggest',
            suggest: '=suggestFunction', // TODO: default value
        },
        link: function(scope,element,attrs) {
            scope.suggest = function(value) {
                // TODO: use URL pattern instead of concat
                var url = scope.api + decodeURIComponent(value) + '&callback=JSON_CALLBACK';
                console.log(url);
                // TODO: $http.get(url) by default (CORS) instead of JSONP
                return $http.jsonp(url).then(function(response) {
                    var x = [];
                    var data = response.data;
                    // console.log(data);
                    for(var i=0; i<data[1].length; i++) {
                        x.push( { 
                            label: data[1][i], 
                            description: data[2][i],
                            url: data[3][i]
                        } );
                    }
                    // console.log(x);
                    return x;
                });
            };
            // TODO: see http://angular-ui.github.io/bootstrap/#/typeahead
            // ...
            console.log(scope.api);

            scope.$watch('api'); // watch if attribute changes (TODO: Test)
        }
    };
});
