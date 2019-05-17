# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.6.4 - 2019-05-17
### Added
- Plugins now have an error boundary so the editor won't crash on plugin errors
### Modified
- Custom actions now can handle the active state of button on toolbar (#224)

## 0.6.3 - 2018-11-21
### Fixed
- HandleBlur with timeout sets states after component unmounted (#213)
### Added
- Add optional prop "id" to MegadraftEditor (#222)

## 0.6.2 - 2018-10-09
### Fixed
- fix shouldDisplayToolbarFn #212

## 0.6.0 - 2018-10-09
### Fixed
- Fixed toolbar arrow positioning on screen edges
### Breaking Changes
- Remade internationalization, dropping support for i18next

## 0.5.2 - 2018-08-29
### Added
- Toolbar actions now can access the Editor's `onChange`.

## 0.5.1 - 2018-07-27
### Added
- `Sidebar`: Display sidebar ToggleButton only when needed, with
  `hideSidebarOnBlur` prop.
### Changed
- Improving indentation with prettier + eslint + lint-staged + husky

## 0.5.0 - 2018-07-10
### Added
- i18n: New prop `language` for `MegadraftEditor`, default is 'en-US'. `__()` has been deprecated and will be removed soon. You can move this code to your app, instead. `__()` code can be found at [Github Gist][i18n-code].

[i18n-code]: https://gist.github.com/marcelometal/768454831c0c10ee03b939187b7bebbf
### Fixed
- Toolbar: Prevent exception in Toolbar with readOnly true
- LinkInput: Fix placeholder color when URL is invalid
- Docs: Fixed toolbar customization example
- Editor: Fixes an out of sync editor state bug on plugins
- Editor: Checking if next block exists for media removal

## 0.4.37 - 2018-04-11
### Added
- Changelog.md for notable changes
### Fixed
- Fix toolbar and refactor positioning
- Refactoring sidebar positioning
- Don't prevent tab events

## 0.4.36 - 2018-03-12
### Added
- MegadraftEditor now accepts a `blockRenderFn` prop similar to draft-js to customize block components.
### Changed
- Migrated tests from mocha/chai/sinon to jest.

## 0.4.35 - 2018-03-02
### Fixed
- Toolbar is now shown after a delay of 16ms to prevent some bugs.
