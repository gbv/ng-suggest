@ngdoc overview
@name index
@description

# <%= name %>

> <%= description %>

**<%= name %>** is a module for [AngularJS](http://angularjs.org/) to facilitate 
the use of [OpenSearch Suggestions](http://www.opensearch.org/Specifications/OpenSearch/Extensions/Suggestions/1.0) and [SeeAlso links](http://www.gbv.de/wikis/cls/SeeAlso) in your web application.
See {@link ng-suggest ng-suggest} for a detailed API documentation.

The latest release of <%= name %> is version <%= version %>. Source code and issue tracker
can be found at <<%= repository.url.replace(/^git:/,'https:').replace(/.git$/,'') %>>.


## Author and Contributors

* <%= author %>
* <%= contributor %>

## License

Code licensed under the [AGPL](http://www.gnu.org/licenses/agpl-3.0.html).
Documentation licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)

@example
<example module="myApp">
  <file name="index.html">
    <div ng-controller="myController">
      <div>
        <input suggest-typeahead="//wikipedia.org/w/api.php?action=opensearch&namespace=0&search=" />
      </div>
    </div>
  </file>
  <file name="script.js">
    angular.module('myApp',['ngSuggest']);
  </file>
</example>

