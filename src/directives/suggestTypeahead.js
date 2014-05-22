/**
 * @ngdoc directive
 * @name ng-suggest.directive:suggest-typeahead
 * @restrict A
 * @description
 * 
 * This directive enables
 * [ui.bootstrap.typeahead](http://angular-ui.github.io/bootstrap/#typeahead)
 * search suggestions (aka autosuggest) from an OpenSearch Suggestions server.
 * Standard options of the typeahead directive (e.g. `typeahead-on-select` and
 * `typeahead-template-url`) can be used as well.
 *
 * # Source code
 * 
 * The most recent
 * [source code](https://github.com/gbv/ng-suggest/blob/master/src/directives/suggestTypeahead.js)
 * of this directive is available at GitHub.
 * 
 * @param {string} suggest-typeahead Angular expression with URL as string or 
 *      {@link ng-suggest.service:OpenSearchSuggestions OpenSearchSuggestions}
 *      object
 * @param {string} json enable JSONP (if service given as URL)
 *
 * @example
 * <example module="myApp">
 *  <file name="index.html">
 *    <div ng-controller="myController">
 *      <div>
 *        <input suggest-typeahead="//wikipedia.org/w/api.php?action=opensearch&namespace=0&search=" />
 *      </div>
 *    </div>
 *  </file>
 *  <file name="script.js">
 *    angular.module('myApp',['ngSuggest']);
 *  </file>
 * </example>
 */
angular.module('ngSuggest').directive('suggestTypeahead',[
    'OpenSearchSuggestions','$injector',
    function(OpenSearchSuggestions,$injector) {
    return {
        restrict: 'A',
        scope: {
            api: '=suggestTypeahead',
            jsonp: '@jsonp',
        },

        // based on http://stackoverflow.com/questions/15279244 and more hours of work
        require: 'ngModel',
        compile: function(element, attrs) {

            var suggestFunction = "suggest_" + Math.random().toString(36).slice(2);
       
            // defines scope.service and scope.suggest
            function suggestLink(scope,element,attrs) {

                // create an OpenSearchSuggestions service instance
                scope.$watch('api',function(service) {
                    if (angular.isObject(service)) {
                        scope.service = service;
                    } else {
                        scope.service = new OpenSearchSuggestions({
                            url: service,
                            jsonp: scope.jsonp,
                        });
                    }
                });

                // create suggest function that queries the service
                scope.$parent[suggestFunction] = function(value) {
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

                var expr = "item.label for item in "+suggestFunction+"($viewValue) | filter:$viewValue";
                attrs.$set('typeahead',expr);
                
                var directive = $injector.get("typeaheadDirective")[0];
                typeaheadLink = directive.compile(element, attrs);
            }

            // call both link functions
            return function(scope, element, attrs, modelCtrl) {
                suggestLink(scope, element, attrs);
                // typeahead directive expects the original scope, that's
                // why the suggest function needs to be defined at parent
                typeaheadLink(scope.$parent, element, attrs, modelCtrl);
            };
        },
    };
}]);

// TODO: if api is URL => create oss
// if api is service object ... use it (support transform by this)
// if api is function
//   <input ng-model="input1" 
//          suggest-typeahead="http://..."
//          suggest-typeahead="{{service}}
