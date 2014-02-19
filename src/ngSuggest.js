'use strict';
/**
 * @ngdoc module
 */

angular.module('ngSuggest',['ui.bootstrap'])
/**
 * @ngdoc directive
 * @name ng-suggest.directive:ng-suggest
 * @restrict A
 * @description
 * 
 * ...
 */
.directive('ng-suggest',function(){
    return {
        restrict: 'A',
        scope: {
            api: '=ng-suggest',
        },
        link: function(scope,element,attrs) {
            // TODO: see http://angular-ui.github.io/bootstrap/#/typeahead
            // ...
        }
    };
});
