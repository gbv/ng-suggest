/**
 * @ngdoc directive
 * @name ng-suggest.directive:suggest-typeahead
 * @restrict A
 * @description
 * 
 * This directive has not been implemented yet!
 *
 * The directive requires [ui.bootstrap.typeahead](http://angular-ui.github.io/bootstrap/#/typeahead).
 * ...
 */
angular.module('ngSuggest')
.directive('suggestTypeahead',[
    'OpenSearchSuggestions','$q',function(OpenSearchSuggestions, $q){
    return {
        restrict: 'A',
/*
   typeahead="item.label for item in suggest1($viewValue) | filter:$viewValue"
   <input ng-model="input1" 
          suggest-typeahead="http://..."
          suggest-typeahead="{{service}}
// TODO: ADD THIS AUTOMATICALLY:          
          suggest-function="suggest1" // suggest function in the parent scope
          typeahead="item.label for item in suggest1($viewValue) | filter:$viewValue"
 */
        scope: {
            api: '@opensearchSuggest',
            suggest: '=suggestTypeahead', // TODO: default value
//            jsonp: '@jsonp', // TODO
//            search
        },
        link: function(scope,element,attrs) {
            /*
            var suggestFunction = attrs.suggestFunction;
            if (suggestFunction) {
                if (!attrs.typeahead) {
                    attrs.typeahead.suggestFunction = "item.label for item in SUGGEST($viewValue) | filter:$viewValue"
                }
                attrs.typeahead = attrs.typeahead.replace('SUGGEST',suggestFunction);
            }
            */

            // TODO: inspect attrs.typeahead and replace SUGGEST with actual function name
            // namer "name($viewValue)"
            // create this function if not defined
//            parentScope.osscounter

            // TODO: if api is URL => create oss
            // if api is service object ...
            // if api is function

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
            // TODO: see http://angular-ui.github.io/bootstrap/#/typeahead
        }
    };
}]);
