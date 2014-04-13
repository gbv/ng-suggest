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
angular.module('ngSuggest',[]) //,['ui.bootstrap']) // TODO: requires ui.bootstrap?
.value('version', '0.0.1-pre');
