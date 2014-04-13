# opensearch-suggest [![Build Status](https://travis-ci.org/gbv/opensearch-suggest.png?branch=master)](https://travis-ci.org/gbv/opensearch-suggest)

> [AngularJS](http://angularjs.org/) module to provide Typeahead via [OpenSearch Suggestions](http://www.opensearch.org/Specifications/OpenSearch/Extensions/Suggestions/1.0)

## Usage and documentation

See <http://gbv.github.io/opensearch-suggest/>.

## Requirements

Require AngularJS >= 1.2.

## Development

First, **clone** the repository from <https://github.com/gbv/opensearch-suggest>.

Second, install Node.js unless it is already installed. Node.js includes `npm`
to install additional packages. Locally **install all required packages**
listed in `package.json` (for global installation call `npm` via `sudo -H`):

    npm install -g grunt-cli
    npm install

Testing is configured in `karma.conf.js` and **unit tests** are located in
directory `test` written with [Jasmine](http://pivotal.github.io/jasmine/). 

To execute of all unit tests call:

    grunt test

For contious testing (tests are re-run on changes), call:

    grunt watch

As configured in `.travis.yml` the tests are automatically 
[executed at travis-ci](https://travis-ci.org/gbv/opensearch-suggest)
when pushed to GitHub.

To build the **documentation**, written using
[ngdoc](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation),
call

    grunt docs

