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
            jsonp: '@jsonp', // TODO
        },
        link: function(scope,element,attrs) {
            scope.suggest = function(value) {
                var url = scope.api + decodeURIComponent(value) + '&callback=JSON_CALLBACK';
                console.log(url);

                // TODO: $http.get(url) by default (CORS) instead of JSONP
                return $http.jsonp(url).then(function(response) {
                    var items = [];
                    var suggest = response.data;
                    if (angular.isArray(suggest) && angular.isArray(suggest[1])) {
                        if (!angular.isArray(suggest[2])) {
                            suggest[2] = [ ];
                        }
                        if (!angular.isArray(suggest[3])) {
                            suggest[2] = [ ];
                        }
                        for(var i=0; i<suggest.length; i++) {
                            items.push( { 
                                label: suggest[1][i], 
                                description: suggest[2][i],
                                url: suggest[3][i]
                            } );
                        }
                    }
                    return items;
                });
            };
            // TODO: see http://angular-ui.github.io/bootstrap/#/typeahead
            // ...
            console.log(scope.api);

            scope.$watch('api'); // watch if attribute changes (TODO: Test)
        }
    };
});
