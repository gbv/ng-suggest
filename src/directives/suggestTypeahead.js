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
 * `typeahead-template-url`) can be used as well. A default template is used
 * unless `typeahead-template-url` is explicitly set.
 *
 * ## Customization
 *
 * The [default template](https://github.com/gbv/ng-suggest/blob/master/src/templates/suggest-typeahead.html)
 * for displaying suggestion items (CSS class 
 * `suggest-typeahead-item`) includes an item's label (CSS class 
 * `suggest-typeahead-label` and description (CSS class 
 * `suggest-typeahead-description`).
 *
 * ## Source code
 * 
 * The most recent
 * [source code](https://github.com/gbv/ng-suggest/blob/master/src/directives/suggestTypeahead.js)
 * of this directive is available at GitHub.
 * 
 * @param {string} suggest-typeahead Angular expression with URL as string or 
 *      {@link ng-suggest.service:OpenSearchSuggestions OpenSearchSuggestions}
 *      object
 * @param {string} jsonp enable JSONP (if service given as URL)
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
 *    angular.module('myApp',['ngSuggest','ui.bootstrap.typeahead']);
 *  </file>
 * </example>
 */
angular.module('ngSuggest').directive('suggestTypeahead',[
    'OpenSearchSuggestions', function(OpenSearchSuggestions) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            api: '=suggestTypeahead',
            jsonp: '@jsonp',
        },
        template: function(elem, attrs) {
            // use default template unless explicitly given
            if (!elem.attr('typeaheadTemplateUrl')) {
                elem.attr('typeaheadTemplateUrl','template/suggest-typeahead.html');
            }

            elem.attr('uib-typeahead','item.label for item in suggest($viewValue)');
            elem.removeAttr('suggest-typeahead'); // avoid infinite recursion
            return "<div>"+elem[0].outerHTML+"</div>";
        },
        require: 'ngModel',
        compile: function(elem, attrs) {
            
            // clear the wrapping <div>
            while(elem[0].attributes.length > 0)
               elem[0].removeAttribute(elem[0].attributes[0].name);

            return function(scope, elem, attrs, controller) {

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
                scope.suggest = function(value) {
                    console.log("suggest("+value+")");
                    var s = scope.service.suggest(value);
                    return s.then(function(suggestions){ 
                        return suggestions.values; 
                    })
                };
            }
        },
    };
}]);
