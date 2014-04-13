'use strict';
/**
 * @ngdoc overview
 * @name ng-suggest
 * @module ng-suggest
 * @description
 *
 * The AngularJS module <b>ngSuggest</b> provides access to {@link
 * http://www.opensearch.org/Specifications/OpenSearch/Extensions/Suggestions/1.0
 * OpenSearch Suggestions} and SeeAlso web services for search suggestion, 
 * typeahead, inclusion of context information and links etc.
 *
 * The module provides
 *
 * * service 
 *   {@link ng-suggest.service:OpenSearchSuggestions OpenSearchSuggestions}
 * * service
 *   {@link ng-suggest.service:SeeAlso SeeAlso}
 * * directive
 *   {@link ng-suggest.directive:opensearch-suggest opensearch-suggest}
 * * directive 
 *   {@link ng-suggest.directive:seealso-server seealso-server}
 *
 * The module licensed unter AGPL. 
 */
angular.module('ngSuggest', []).value('version', '0.0.1-pre');
/**
 * @ngdoc directive
 * @name ng-suggest.directive:opensearch-suggest
 * @restrict A
 * @description
 * 
 * This directive can be used to provide a typeahead input field ...
 * The current implementation of this directive will change
 *
 * Use together with/requires ui.bootstrap.typeahead
 *
 * <pre>
 *   typeahead="item.label for item in suggest1($viewValue) | filter:$viewValue"
 * </pre>
 *
 * Scope variables: api, suggestions, search
 * ...
 */
angular.module('ngSuggest').directive('opensearchSuggest', [
  'OpenSearchSuggestions',
  '$q',
  function (OpenSearchSuggestions, $q) {
    return {
      restrict: 'A',
      scope: {
        api: '@opensearchSuggest',
        suggest: '=suggestFunction',
        jsonp: '@jsonp'
      },
      link: function (scope, element, attrs) {
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
        scope.$watch('api', function (url) {
          scope.oss = new OpenSearchSuggestions(scope.api);
        });
        scope.suggest = function (value) {
          var s = scope.oss.suggest(value);
          return s.then(function (suggestions) {
            return suggestions.values;
          });
        };  // TODO: see http://angular-ui.github.io/bootstrap/#/typeahead
            // ...
      }
    };
  }
]);
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
angular.module('ngSuggest').directive('seealsoServer', [
  'SeeAlso',
  function (SeeAlso) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
      }
    };
  }
]);
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
 * function can be given as optional second argument to the constructor.
 *
 * See {@link ng-suggest.service:SeeAlso SeeAlso} for a simplified subclass of 
 * this service.
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
            $scope.suggestService.suggest(search).then(function(data) {
                $scope.suggestions = data;
            }); // TODO: else $scope.suggestions = null;
        }

        function updateSite() {
            var url = $scope.site.url.replace('{language}', $scope.language.code);
            $scope.suggestService = new OpenSearchSuggestions(url, $scope.site.transform);
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
angular.module('ngSuggest').factory('OpenSearchSuggestions', [
  '$http',
  '$q',
  function ($http, $q) {
    // transform suggestions to object
    var transformSuggestions = function (data) {
      var suggestions = {
          query: data[0],
          values: []
        };
      if (!angular.isArray(data[2]))
        data[2] = [];
      if (!angular.isArray(data[3]))
        data[3] = [];
      for (var i = 0; i < data[1].length; i++) {
        suggestions.values.push({
          label: data[1][i],
          description: data[2][i],
          url: data[3][i]
        });
      }
      return suggestions;
    };
    // constructor
    var OpenSearchSuggestions = function (url, transform) {
      if (url && url.indexOf('{searchTerms}') == -1) {
        url = url + '{searchTerms}';
      }
      this.url = url;
      this.transform = transform ? transform : transformSuggestions;
    };
    // methods
    OpenSearchSuggestions.prototype = {
      suggest: function (searchTerms) {
        if (!this.url)
          return $q.reject(null);
        var url = this.url.replace('{searchTerms}', decodeURIComponent(searchTerms)) + '&callback=JSON_CALLBACK';
        var transform = this.transform;
        return $http.jsonp(url).then(function (response) {
          // TODO: catch failure of transformation
          var suggestions = transform(response.data);
          // return $q.reject(response.data);
          return suggestions;
        }, function (response) {
          // error
          return $q.reject(response.data);
        });
      }
    };
    return OpenSearchSuggestions;
  }
]);
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
 * instanciated with the server base URL as first argument:
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
 */
angular.module('ngSuggest').factory('SeeAlso', [
  'OpenSearchSuggestions',
  function (OpenSearchSuggestions) {
    function SeeAlso(url, transform) {
      url += '?id={searchTerms}&format=seealso';
      OpenSearchSuggestions.call(this, url, transform);
    }
    ;
    SeeAlso.prototype = new OpenSearchSuggestions();
    return SeeAlso;
  }
]);