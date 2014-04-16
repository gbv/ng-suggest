'use strict';
/**
 * @ngdoc overview
 * @name ng-suggest
 * @module ng-suggest
 * @description
 *
 * The AngularJS module <b>ngSuggest</b> provides access to {@link
 * http://www.opensearch.org/Specifications/OpenSearch/Extensions/Suggestions/1.0
 * OpenSearch Suggestions} and {@link http://www.gbv.de/wikis/cls/SeeAlso SeeAlso}
 * web services for search suggestion, typeahead, inclusion of context information 
 * and links etc.
 *
 * The module provides
 *
 * * service 
 *   {@link ng-suggest.service:OpenSearchSuggestions OpenSearchSuggestions}
 *   to query an OpenSearch server for search suggestions
 * * service
 *   {@link ng-suggest.service:SeeAlso SeeAlso}
 *   to query an SeeAlso server link suggestions
 * * directive
 *   {@link ng-suggest.directive:opensearch-suggest opensearch-suggest} (DEPRECATED)
 * * directive 
 *   {@link ng-suggest.directive:seealso-server seealso-server} (TODO)
 * * directive 
 *   {@link ng-suggest.directive:suggest-typeahead suggest-typeahead} (TODO)
 */
angular.module('ngSuggest',[]) //,['ui.bootstrap']) // TODO: requires ui.bootstrap?
.value('version', '0.0.1-pre');
