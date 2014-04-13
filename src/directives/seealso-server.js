/**
 * @ngdoc directive
 * @name ng-suggest.directive:seealso-server
 * @restrict A
 * @description
 * 
 * This directive has not been implemented yet!
 *
 * <pre class="prettyprint linenums">
 * <!-- comma-separated -->
 * <span seelalso-server="http://example.org/" seealso-id="123"/>
 * <!-- list -->
 * <ul seelalso-server="http://example.org/" seealso-id="123"/>
 * <ol seelalso-server="http://example.org/" seealso-id="123"/>
 * <!-- image -->
 * <img seelalso-server="http://example.org/" seealso-id="123"/>
 * <!-- custom template -->
 * <div seelalso-server="http://example.org/" seealso-id="123">
 * ...
 * </div>
 * <!-- custom template, referenced -->
 * <div seelalso-server="http://example.org/" seealso-id="123" template-url="..." />
 * </pre>
 *
 * ...
 */
angular.module('ngSuggest')
.directive('seealsoServer',['SeeAlso',function(SeeAlso){
    return {
        restrict: 'A',
        link: function(scope,element,attrs) {
            // ...
        }
    };
}]);
