angular.module('ngSuggest')
.filter('htmlescape', function(){
     return function(input){
        return input?input.replace(/[<>]/g , "-"):'';
    };
});