/**
 * @ngdoc directive
 * @name ng-suggest.directive:seealso-api
 * @restrict A
 * @description
 * 
 * This directive displaysy link suggestions queried via SeeAlso link
 * server protocol.
 *
 * The directive has not been implemented yet!
 *
 * <pre class="prettyprint linenums">
 * <!-- comma-separated -->
 * <span seealso-api="http://example.org/" seealso-id="123"/>
 * <!-- list -->
 * <ul seealso-api="http://example.org/" seealso-id="123"/>
 * <ol seealso-api="http://example.org/" seealso-id="123"/>
 * <!-- image -->
 * <img seealso-api="http://example.org/" seealso-id="123"/>
 * <!-- custom template -->
 * <div seealso-api="http://example.org/" seealso-id="123">
 * ...
 * </div>
 * <!-- custom template, referenced -->
 * <div seealso-api="http://example.org/" seealso-id="123" template-url="..." />
 * </pre>
 *
 * ## Source code
 *
 * The most recent 
 * [source code](https://github.com/gbv/ng-suggest/blob/master/src/directives/seealsoApi.js)
 * of this service is available at GitHub.
 *
 * @param {string} seealso-api Base URL of SeeAlso server to query from
 * @param {string} seealso-id Identifier to query for
 * @param {string} template-url Custom template to display result with
 */
angular.module('ngSuggest')
.directive('seealsoApi',['SeeAlso',function(SeeAlso){
    return {
        restrict: 'A',
        scope: {
            api: '@seealsoApi',
            id: '@seealsoId',
        },
/*
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl ? 
                   attrs.templateUrl : 'template/seealso-response.html';
        },
*/        
        link: function(scope, element, attr) {
            function request() {
                // TODO
            };

            // TODO: don't call twice
            scope.$watch('api',function(){ request() });
            scope.$watch('id',function(){ request() });
        }
    };
}]);
