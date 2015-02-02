angular.module('ngSuggest').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/seealso-response.html',
    "<ul ng-if=\"links\"><li ng-repeat=\"link in links\"><a ng-if=\"link.url\" href=\"{{link.url}}\" title=\"{{link.description}}\">{{link.label}}</a> <span ng-if=\"!link.url\">{{link.label}}</span></li></ul>"
  );


  $templateCache.put('template/suggest-typeahead.html',
    "<a tabindex=\"-1\" class=\"suggest-typeahead-item\"><div bind-html-unsafe=\"match.label | typeaheadHighlight:query\" class=\"suggest-typeahead-label\"></div><i ng-if=\"match.model.description\" class=\"suggest-typeahead-description\">{{match.model.description}}</i></a>"
  );

}]);
