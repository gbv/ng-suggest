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
 * {@name ng-suggest.directive:suggest-typeahead suggest-typeahead}!
 *
 * The directive requires [ui.bootstrap.typeahead](http://angular-ui.github.io/bootstrap/#/typeahead).
 */
angular.module('ngSuggest')
.directive('opensearchSuggest',[
    'OpenSearchSuggestions',function(OpenSearchSuggestions){
    return {
        restrict: 'A',
        scope: {
            api: '@opensearchSuggest',
            suggest: '=suggestFunction', // TODO: default value
            jsonp: '@jsonp',
            // TODO: transform
        },
        link: function(scope,element,attrs) {
            scope.$watch('api',function(url) {
                scope.suggestions = new OpenSearchSuggestions({
                    url: scope.api,
                    jsonp: scope.jsonp,
                });
            });

            scope.suggest = function(value) {
                var s = scope.suggestions.suggest(value);
                return s.then(function(suggestions){ 
                    return suggestions.values; 
                })
            };
        }
    };
}]);
