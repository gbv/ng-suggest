/**
 * @ngdoc service
 * @name ng-suggest.service:SeeAlso
 * @description
 * 
 * The <b>SeeAlso</b> is a special kind of
 * {@link ng-suggest.service:OpenSearchSuggestions OpenSearchSuggestions}
 * service to query a [SeeAlso 
 * server](http://www.gbv.de/wikis/cls/SeeAlso_Simple_Specification) 
 * for link suggestions. A SeeAlso service is
 * instanciated with the server's base URL as first argument:
 *
 * <pre class="prettyprint linenums">
 * var seealso = new SeeAlso("http://example.org/seealso");
 * seealso.suggest(search).then( function(links) { ... });
 * </pre>
 *
 * @example
 <example module="myApp">
  <file name="index.html">
    <div ng-controller="myController">
      <div>
        <input ng-model="query" class="search-query"/> 
      </div>
      <div><pre>{{links | json}}</pre></div>
    </div>
  </file>
  <file name="script.js">
    angular.module('myApp',['ngSuggest']);
    function myController($scope, SeeAlso) {
        // TODO: use another SeeAlso server for demo
        $scope.seealso = new SeeAlso("http://kug.ub.uni-koeln.de/portal/kug/connector/seealso/isbn2wikipedia");
        $scope.$watch('query', function updateSearch(query) {
            console.log("query"+query);
            $scope.seealso.suggest(query).then(function(links) {
                $scope.links = links;
            });
        });
    }
  </file>
</example>
 * 
 * # Source code
 *
 * The most recent 
 * [source code](https://github.com/gbv/ng-suggest/blob/master/src/services/SeeAlso.js)
 * of this service is available at GitHub.
 */
angular.module('ngSuggest')
.factory('SeeAlso', function(OpenSearchSuggestions) {
    function SeeAlso(args) {
        if (!angular.isObject(args)) args = { url: args };
        args.url += "?id={searchTerms}&format=seealso";
        OpenSearchSuggestions.call(this,args);
    };
    SeeAlso.prototype = new OpenSearchSuggestions();
    return SeeAlso;
});

