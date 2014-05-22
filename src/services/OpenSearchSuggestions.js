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
 * The method `suggest` returns a promise to get a suggestions object having
 * the following form:
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
 * Note that suggestions originally returned from an OpenSearch server have the
 * form `["query string"],["completion",...],["description",...],["url",...]]`,
 * so it is transformed to the form exemplified above. A custom transformation
 * function can be given as optional named parameter `transform`. Use 
 * `function(s) { return s; }` to get the original, untransformed response.
 * Transformation errors are catched and passed as rejection of the promise.
 *
 * The optional paramater `jsonp` (false by default) defines whether requests are 
 * done via JSONP.
 *
 * See {@link ng-suggest.service:SeeAlso SeeAlso} for a simplified subclass of 
 * this service.
 *
 * ## Source code
 * 
 * The most recent 
 * [source code](https://github.com/gbv/ng-suggest/blob/master/src/services/OpenSearchSuggestions.js)
 * of this service is available at GitHub.
 * 
 * @example
 <example module="myApp">
  <file name="index.html">
    <div ng-controller="myController">
      <div>
        <input ng-model="search" class="search-query"/> 
        <select ng-model="site" ng-options="s.name for s in sites">
        </select>
        <select ng-model="language" ng-options="l.name for l in languages">
        </select>
      </div>
      <ul>
        <li ng-repeat="s in suggestions.values">
          <a ng-if="s.url" href="{{s.url}}">{{s.label}}</a>
          <span ng-if="!s.url">{{s.label}}</span>
          <div ng-if="s.description">{{s.description}}</div>
        </li>
      </ul>
      <div><pre>{{suggestions | json}}</pre></div>
    </div>
  </file>
  <file name="script.js">
    angular.module('myApp',['ngSuggest']);
    function myController($scope, OpenSearchSuggestions) {

        function updateSearch(search) {
            $scope.suggestService.suggest(search).then(
                function(data) { $scope.suggestions = data; },
                function() { $scope.suggestions = null; }
            );
        }

        function updateSite() {
            var url = $scope.site.url.replace('{language}', $scope.language.code);
            $scope.suggestService = new OpenSearchSuggestions({
                url: url, 
                transform: $scope.site.transform,
                jsonp: 1,
            });
            updateSearch($scope.search);
        };

        $scope.sites = [{ 
            name: "Wikipedia",
            url:  "//{language}.wikipedia.org/w/api.php?action=opensearch&search={searchTerms}&namespace=0",
        },{ 
            name: "Wikidata", 
            url: "//www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language={language}&type=item&continue=0&search={searchTerms}",
            transform: function(data) {
                var suggestions = { 
                    query: data.searchinfo.search, 
                    values: [ ]
                };

                for(var i=0; i<data.search.length; i++) {
                    suggestions.values.push( data.search[i] );
                }

                return suggestions;                
            }
        }];
        $scope.site = $scope.sites[0];

        $scope.languages = [
            { code: "en", name: "English" },
            { code: "de", name: "Deutsch" },
        ];
        $scope.language = $scope.languages[0];

        $scope.search = "Wiki";
        $scope.$watch('site', updateSite);
        $scope.$watch('language', updateSite);
        $scope.$watch('search', updateSearch);
    }
  </file>
</example>
 */
angular.module('ngSuggest')
.factory('OpenSearchSuggestions',['$http','$q',function($http, $q) {

    // transform suggestions array to object
    var transformSuggestions = function(data) {
        var suggestions = { 
            query: data[0], 
            values: [ ] 
        };
        if (!angular.isArray(data[2])) data[2] = [ ];
        if (!angular.isArray(data[3])) data[3] = [ ];
        for(var i=0; i<data[1].length; i++) {
            suggestions.values.push( { 
                label:       data[1][i], 
                description: data[2][i],
                url:         data[3][i]
            } );
        }
        return suggestions;                
    };

    // constructor
    var OpenSearchSuggestions = function(args) {
        if (!angular.isObject(args)) args = { url: args };

        this.url = args.url;
        if (this.url && this.url.indexOf('{searchTerms}') == -1) {
            this.url += '{searchTerms}';
        }
        this.transform = args.transform ? args.transform : transformSuggestions;
        this.jsonp = args.jsonp;
        if (this.jsonp === true || this.jsonp.match(/^\d/)) {
            this.jsonp = 'callback';
        }
    };

    // method
    OpenSearchSuggestions.prototype = {
        suggest: function(searchTerms) {
            if (!this.url) {
                return $q.reject(null);
            }

            var url = this.url;
            var transform = this.transform;
            var get = $http.get;

            if (this.jsonp) {
                get = $http.jsonp;
                url += (url.indexOf('?') == -1 ? '?' : '&');
                url += this.jsonp + '=JSON_CALLBACK';
            }
            
            url = url.replace('{searchTerms}', decodeURIComponent(searchTerms));

            return get(url).then(
                function(response) {
                    try {
                        return transform(response.data);
                    } catch(e) {
                        return $q.reject(e);
                    }
                }, function(response) {
                    return $q.reject(response.data);
                }
            );
        }
    };
    return OpenSearchSuggestions;
}]);

