# ng-suggest

> [AngularJS](http://angularjs.org/) module to provide Typeahead via [OpenSearch Suggestions](http://www.opensearch.org/Specifications/OpenSearch/Extensions/Suggestions/1.0)

[![npm version](https://img.shields.io/npm/v/ng-suggest.svg?style=flat)](https://www.npmjs.com/package/ng-suggest)
[![Build Status](https://travis-ci.org/gbv/ng-suggest.svg)](https://travis-ci.org/gbv/ng-suggest)
[![Test Coverage](https://coveralls.io/repos/gbv/ng-suggest/badge.svg?branch=master)](https://coveralls.io/r/gbv/ng-suggest?branch=master)
[![GitHub Issues](https://img.shields.io/github/issues-raw/gbv/ng-suggest.svg?style=flat)](https://github.com/gbv/ng-suggest/issues)

**ng-suggest** is a module for [AngularJS](http://angularjs.org/) to facilitate 
the use of [OpenSearch Suggestions](http://www.opensearch.org/Specifications/OpenSearch/Extensions/Suggestions/1.0) and [SeeAlso links](http://www.gbv.de/wikis/cls/SeeAlso) in web application.

## Install

### npm

```bash
npm install ng-suggest --safe
```

### bower

```bash
bower install ng-suggest --safe
```

## Usage

See <https://gbv.github.io/ng-suggest/> for documentation and usage examples!

## Customization

To support APIs that do not strictly follow OpenSearch Suggest specification, the
{@link ng-suggest.service:OpenSearchSuggestions OpenSearchSuggestions} service
can be customized with a transformation function. The 
{@link ng-suggest.directive:suggest-typeahead suggest-typeahead} directive contains
a default template that can be replaced or styled with CSS.

## Contributing

See [`CONTRIBUTING.md`](#/api/contributing) for development documentation.
Contributions and [feedback](https://github.com/gbv/ng-suggest/issues) is
appreciated!

## Contributors

* Jakob Voß <voss@gbv.de>
* Moritz Horn <moritz.horn@gmail.com>

## License

Code licensed under the [AGPL](http://www.gnu.org/licenses/agpl-3.0.html).
Documentation licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/).

