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
 *   {@link ng-suggest.directive:suggest-typeahead suggest-typeahead} 
 *   to enable autosuggest via OpenSearch Suggest with ui.bootstrap.typeahead
 * * directive 
 *   {@link ng-suggest.directive:seealso-api seealso-api}
 *   to display link suggestions queried via SeeAlso
 */
angular.module('ngSuggest',[])
.value('ngSuggest.version', '0.1.2');
