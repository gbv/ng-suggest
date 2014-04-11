'use strict';
/**
 * @ngdoc overview
 * @name ng-suggest
 * @module ng-suggest
 * @description
 *
 * The AngularJS module <b>ngSuggest</b> provides Typeahead via {@link
 * http://www.opensearch.org/Specifications/OpenSearch/Extensions/Suggestions/1.0
 * OpenSearch Suggestions}. 
 *
 * The module includes a service named
 * {@link ng-suggest.service:OpenSearchSuggestions OpenSearchSuggestions}.
 *
 * The module licensed unter AGPL. 
 */
angular.module('ngSuggest',[]) //,['ui.bootstrap']) // TODO: requires ui.bootstrap?
.value('version', '0.0.1-pre');
