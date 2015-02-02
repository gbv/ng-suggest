@ngdoc overview
@name Contributing
@module ng-suggest
@id contributing
@description

# Contributing

## Overview

* <http://github.com/gbv/ng-suggest/issues>: issue tracker
* <http://github.com/gbv/ng-suggest>: source code repository

  * `src` : source code
  * `test` : unit tests
  * `demo` : demo application

## Installing Dependencies

Install [Node.js](https://nodejs.org/) and [Grunt](https://gruntjs.com/).
Node.js includes `npm` which is used to install Grunt and other packages listed
in `package.json`:

    npm install -g grunt-cli   # prepend "sudo -H" for global installation
    npm install

## Running the Unit Tests

Unit tests are written with [Jasmine](http://pivotal.github.io/jasmine/) and executed with
[Karma](https://karma-runner.github.io/). Testing is configured in `karma.conf.js`.

To execute all unit tests call:

    grunt test

For contious testing (tests are re-run on changes):

    grunt watch

As configured in `.travis.yml` the tests are automatically [executed at
travis-ci](https://travis-ci.org/gbv/ng-suggest) when pushed to GitHub.

To build the **documentation**, written using
[ngdoc](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation),
call

    grunt docs

## Release

The version number consists of three numeric parts:

* Bug fixes and other minor changes: Patch release, increment the last number
* New features which don't break existing features: Minor release, increment the middle number
* Changes which break backwards compatibility: Major release, increment the first number

A suffix can be added for developer releases.

Major and minor release 0.0 may change features also in patch releases.

Versions can be bumped with one of

    grunt version:bump:patch  # e.g. 1.1.1 to 1.0.2
    grunt version:bump:minor  # e.g. 1.1.1 to 1.2.0
    grunt version:bump:major  # e.g. 1.1.1 to 2.0.0
 
Before release:

    grunt build
    git commit -m "bump version"

The new version can then be released

    grunt publish

Documentation and demo sites are not updated with this task.

