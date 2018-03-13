# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
- Changelog.md for notable changes

## 0.4.36 - 2018-03-12
### Added
- MegadraftEditor now accepts a `blockRenderFn` prop similar to draft-js to customize block components.

### Changed
- Migrated tests from mocha/chai/sinon to jest.

## 0.4.35 - 2018-03-02
### Fixed
- Toolbar is now shown after a delay of 16ms to prevent some bugs.
