/**
 * @ngdoc service
 * @name ng-suggest.service:OpenSearchSuggestions
 * @description
 * 
 * The <b>OpenSearchSuggestions</b> service can be used to query an OpenSearch 
 * server for search suggestions. The service is instanciated with an URL
 * template that includes the character sequence `{searchTerms}`:
 *
 * <pre class="prettyprint linenums">
 * var url = "http://example.org/?q={searchTerms}";
 * var suggestService = new OpenSearchSuggestions(url);
 * suggestService.suggest(search).then( function(suggestions) {
 *      ...
 * });
 * </pre>
 *
 * The method `suggestions` returns a promise to get a suggestions object
 * having the following form:
 *
 * <pre class="prettyprint">
 * {
 *    query: "query string",
 *    values: [
 *        {
 *            label:       "completion",
 *            description: "optional description",
 *            url:         "optional URL"
 *        },
 *        ....
 *    ]
 * } 
 * </pre>
 *
 * @example
 <example module="myApp">
  <file name="index.html">
    <div ng-controller="myController">
      <div>
        <input ng-model="search" class="search-query"/> 
        <select class="form-control" 
                ng-model="wikipedia" ng-options="w.name for w in wikipedias">
        </select>
      </div>
      <div><pre>{{suggestions | json}}</pre></div>
    </div>
  </file>
  <file name="script.js">
    angular.module('myApp',['ngSuggest']);

    function myController($scope, OpenSearchSuggestions) {

        function updateSearch(search) {
            // using a promise
            $scope.suggestService.suggest(search).then(function(data) {
                $scope.suggestions = data;
            });
        }
        
        $scope.$watch('search', updateSearch );

        function updateWikipedia(wikipedia) {
            var url = "http://" + wikipedia.lang
                    + ".wikipedia.org/w/api.php?action=opensearch&search={searchTerms}&namespace=0";
            $scope.suggestService = new OpenSearchSuggestions(url);
        }

        $scope.$watch('wikipedia', function(w_new, w_old) {
            if (w_new != w_old) {
                updateWikipedia(w_new);
                updateSearch($scope.search);
            }
        });

        $scope.wikipedias = [
            { lang: "en", name:"English Wikipedia" },
            { lang: "de", name:"Deutschsprachige Wikipedia" },
        ];
        $scope.search = "Wiki";

        updateWikipedia( $scope.wikipedia = $scope.wikipedias[0] );
    }
  </file>
</example>
 */
angular.module('ngSuggest')
.factory('OpenSearchSuggestions',['$http','$q',function($http, $q) {
    // constructor
    var OpenSearchSuggestions = function( url ) {
        if (url && url.indexOf('{searchTerms}') == -1) {
            url = url + '{searchTerms}';
        }
        this.url = url;
    };
    // methods
    OpenSearchSuggestions.prototype = {
        suggest: function(searchTerms) {
            if (!this.url) return $q.reject(null);

            var url = this.url.replace('{searchTerms}', decodeURIComponent(searchTerms))
                    + '&callback=JSON_CALLBACK';

            return $http.jsonp(url).then(function(response) {

                // invalid response?
                if (!angular.isArray(response.data) || !angular.isArray(response.data[1])) {
                    return $q.reject(response.data);
                }
               
                // transform suggestions to object
                var suggestions = { 
                    query: response.data[0], 
                    values: [ ] 
                };
                if (!angular.isArray(response.data[2])) {
                    response.data[2] = [ ];
                }
                if (!angular.isArray(response.data[3])) {
                    response.data[3] = [ ];
                }
                for(var i=0; i<response.data[1].length; i++) {
                    suggestions.values.push( { 
                        label:       response.data[1][i], 
                        description: response.data[2][i],
                        url:         response.data[3][i]
                    } );
                }

                return suggestions;                
            }, function(response) {
                // error
                return $q.reject(response.data);
            });
        }
    };
    return OpenSearchSuggestions;
}]);

