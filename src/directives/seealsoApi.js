/**
 * @ngdoc directive
 * @name ng-suggest.directive:seealso-api
 * @restrict A
 * @description
 * 
 * This directive displaysy link suggestions queried via SeeAlso link
 * server protocol.
 *
 * ## Scope
 *
 * The link suggestions are injected in the template's scope as `query`
 * and `links`.
 *
 * ## Source code
 *
 * The most recent 
 * [source code](https://github.com/gbv/ng-suggest/blob/master/src/directives/seealsoApi.js)
 * of this service is available at GitHub.
 *
 * @param {string} seealso-api Base URL of SeeAlso server to query from
 * @param {string} jsonp enable JSONP (if service given as URL)
 * @param {string} seealso-id Identifier to query for
 * @param {string} template-url Custom template to display result with
 *
 * @example
 <example module="myApp">
  <file name="index.html">
    <div>
      <div seealso-api="http://ws.gbv.de/seealso/isbn2wikipedia" jsonp=1 
           seealso-id="3-447-03706-7" />
    </div>
  </file>
  <file name="script.js">
    angular.module('myApp',['ngSuggest']);
  </file>
</example>
 */
angular.module('ngSuggest')
.directive('seealsoApi',['SeeAlso',function(SeeAlso){
    return {
        restrict: 'A',
        scope: {
            api: '@seealsoApi',
            id: '@seealsoId',
            jsonp: '@jsonp',
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl ? 
                   attrs.templateUrl : 'template/seealso-response.html';
        },
        link: function(scope, element, attr) {

            // request when id changes
            scope.$watch('id',function(){ 
                if (scope.service) request();
            });

            // create a SeeAlso service instance
            scope.$watch('api',function(service) {
                if (angular.isObject(service) && service instanceof SeeAlso) {
                    scope.service = service;
                } else {
                    if (!angular.isObject(service)) {
                        service = {
                            url: service,
                            jsonp: scope.jsonp,
                       };
                    }
                    scope.service = new SeeAlso(service);
                }
                request();
            });

            function request() {
                scope.service.suggest(scope.id).then(
                    function(response) { 
                        scope.query = response.query;
                        scope.links = response.values; 
                    }
                );
            }
        }
    };
}]);
