/**
 * @ngdoc directive
 * @name ng-suggest.directive:suggest-typeahead
 * @restrict A
 * @description
 * 
 * The directive enables
 * [ui.bootstrap.typeahead](http://angular-ui.github.io/bootstrap/#/typeahead)
 * search suggestions from an OpenSearch Suggestions server. All options of
 * typeahead directive (e.g. `typeahead-on-select`) can be used.
 *
 * # Source code
 * 
 * The most recent [source code](https://github.com/gbv/ng-suggest/blob/master/src/directives/suggestTypeahead.js) of this directive is available at GitHub.
 * 
 */
angular.module('ngSuggest').directive('suggestTypeahead',[
    'OpenSearchSuggestions','$injector',
    function(OpenSearchSuggestions,$injector) {
    return {
        restrict: 'A',
        scope: {
            api: '@suggestTypeahead',
            jsonp: '@jsonp',
            // TODO: add suggest-transform
        },
        // based on http://stackoverflow.com/questions/15279244 and hours of work:
        require: "ngModel",
        compile: function(element, attrs) {
       
            // defines scope.service and scope.suggest
            function suggestLink(scope,element,attrs) {

                // create an OpenSearchSuggestions service instance
                scope.$watch('api',function(url) {
                    scope.service = new OpenSearchSuggestions({
                        url: scope.api,
                        jsonp: scope.jsonp,
                    });
                });

                // create suggest function that queries the service
                scope.suggest = function(value) {
                    var s = scope.service.suggest(value);
                    return s.then(function(suggestions){ 
                        return suggestions.values; 
                    })
                };
            }

            // insert typeahead directive, if not explicitly given
            var typeaheadLink = function() { };
            if (!attrs.typeahead) {
                if ( !$injector.has("typeaheadDirective") ) {
                    throw new Error("ui.bootstrap.typehead directive required!");
                }

                var expr = "item.label for item in suggest($viewValue) | filter:$viewValue";
                attrs.$set('typeahead',expr);
                
                var directive = $injector.get("typeaheadDirective")[0];
                typeaheadLink = directive.compile(element, attrs);
            }

            // call both link functions
            return function(scope, element, attrs, controller) {
                suggestLink(scope, element, attrs, controller);
                typeaheadLink(scope, element, attrs, controller);
            };
        },
    };
}]);

// TODO: if api is URL => create oss
// if api is service object ...
// if api is function
//   <input ng-model="input1" 
//          suggest-typeahead="http://..."
//          suggest-typeahead="{{service}}
