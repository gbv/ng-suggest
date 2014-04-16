/**
 * @ngdoc directive
 * @name ng-suggest.directive:opensearch-suggest
 * @restrict A
 * @description
 * 
 * This directive can be used to provide a typeahead input field.
 * The demo application contains some usage example. To further
 * facilitate the use of suggest, this directive will likely be
 * replaced by 
 * {@name ng-suggest.directive:suggest-typeahead}!
 *
 * The directive requires [ui.bootstrap.typeahead](http://angular-ui.github.io/bootstrap/#/typeahead).
 */
angular.module('ngSuggest')
.directive('opensearchSuggest',[
    'OpenSearchSuggestions','$q',function(OpenSearchSuggestions, $q){
    return {
        restrict: 'A',
        scope: {
            api: '@opensearchSuggest',
            suggest: '=suggestFunction', // TODO: default value
            jsonp: '@jsonp', // TODO
        },
        link: function(scope,element,attrs) {
            scope.oss = new OpenSearchSuggestions(scope.api);
            scope.$watch('api',function(url) {
                scope.oss = new OpenSearchSuggestions(scope.api);
            });

            scope.suggest = function(value) {
                var s = scope.oss.suggest(value);
                return s.then(function(suggestions){ 
                    return suggestions.values; 
                })
            };
        }
    };
}]);
