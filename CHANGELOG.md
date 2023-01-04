# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.8.0 - 2023-01-04
### Fixed
- Fix: spelling of the pt-Br i18n (#354)
- Fix: missing end dots (#357)
- Fix: add UNSAFE_ prefix to legacy life cycle methods in React 17 (#358)
- Fix: update outdated version of caniuse-lite (#362)
- Fix: support for Node v16 and add for v18 (#392)
  - Update gulp-sass (the new version does not use node-sass which needs python
    v2 and other deprecated dependencies)
  - Remove Node v10 from unittest workflow
  - Update browser list db
  - Add Node v18 to unittest workflow
- Docs: fix github-flow url (#411)
- Fix: replace this if-then-else flow by a single return statement (#398)
### Modified
- Bump ws from 5.2.2 to 5.2.3 (#348)
- Bump path-parse from 1.0.6 to 1.0.7 (#349)
- Bump tmpl from 1.0.4 to 1.0.5 (#351)
- Bump url-parse from 1.5.1 to 1.5.3 (#350)
- Convert some class components to functional (#347):
  - Simplifies babel configuration
  - Converts ImageBlock and ImageButton class components to function components
  - Converts VideoBlock and VideoButton class components to function components
  - Converts NotFoundBlock class component  to function component
  - Refactors Editor class component into three function components
  - Converts MediaWrapper class component to function component
  - Enables image edit by clicking the image in ImageBlock
  - Enables video edit by clicking the video in VideoBlock
  - Tweaks Code Climate config
- Update LinkInput validation regex (#353)
- Convert some class components to functional (#356):
  - All components from src/components/icons
  - All components from src/components/plugin
  - DropdownItem
  - Link
  - MediaMessage
  - Separator
- Refactor: remove method onTab as it is deprecated since Draft.js v0.11 (#360)
- Refactor: converts the dropdown component from class to function component
  (#361)
- Refactor: convert LinkInput from class component to function component (#359)
- Chore(deps): bump follow-redirects from 1.13.3 to 1.14.7 (#367)
- Adding variables for colors and `media` queries (#363)
- CI: Added nodejs 16.x
- Chore(deps): bump follow-redirects from 1.14.7 to 1.14.8 (#369)
- Chore(deps): bump url-parse from 1.5.3 to 1.5.7 (#370)
- Chore(deps): bump url-parse from 1.5.7 to 1.5.10 (#374)
- Chore(deps): bump minimist from 1.2.5 to 1.2.6 (#375)
- Chore: add localizations to French, Turkish and German languages (#385)
- Update header with alt in logo Megadraft (#390)
- Feat: converts header and home to functional components (#393)
- Feat: converts arrow-down icon from class to functional component (#394)
- Added humanReadable boolean to editorStateToJSON (#333)
- Update .gitignore (#400)
- Refactor: migrate class component to functional (#402)
- Refactor: migrate class component to functional (#403)
- Update custom_entities.md (#405)
- Refactor(components/toolbar-item): convert to functional component (#387)
  - Docs (readme): add node version to dev steps
  - Refactor (components/toolbar-item): convert to functional component
- Improved customization.md (#415)
- Upgrading react to 18.2.0 (#417)
- Test: Test the ImageButton component (#409)
- Chore(deps): bump decode url-component from 0.2.0 to 0.2.2 (#419)

## 0.7.5 - 2021-07-12
## Modified
- Bump react and react-dom dependencies to support versions up to 18.

## 0.7.4 - 2020-10-08
## Bugfix
- Revert "Store extendedBlockRenderMap in state so it can be updated when readOnly changes its value (#325)" as a bug was found

## 0.7.3 - 2020-09-28
### Fixed
- Store extendedBlockRenderMap in state so it can be updated when readOnly changes its value (#325)
### Modified
- Bump http-proxy from 1.18.0 to 1.18.1
- Bump node-sass from 4.13.0 to 4.14.1
- Bump elliptic from 6.5.2 to 6.5.3 (#321)
- Bump lodash from 4.17.15 to 4.17.19
- Bump websocket-extensions from 0.1.3 to 0.1.4 (#316)

## 0.7.2 - 2020-04-14
### Fixed
- Fixed movableBlocks when readOnly is enabled

## 0.7.1 - 2020-03-26
### Fixed
- Fixed sass error
- Toolbar Left Positioning (#310)
### Modified
- Enabling movableBlocks in Website demo
- Bump acorn from 5.7.3 to 5.7.4

## 0.7.0 - 2020-03-05
### Fixed
- Mispositioning toolbar (#294)
- Avoid preventDefault in Toolbar for select input (#270)
### Modified
- Update draft-js version to 0.11.4 (#297)
- docs(overview): Improve usage docs (#301)
- Prevent `false` from being appended into Control's component className (#307)
- Remove return type annotation on method `externalKeyBindings` (#306)

## 0.6.16 - 2020-02-18
### Fixed
- Copied text with movableBlocks active has extra empty spaces on Chrome (#302)

## 0.6.15 - 2019-12-26
### Fixed
- Focus loss in plugins with react-select dependency (#288)
- Data loss when swapping plugin blocks with blur update (#286)
- Placeholder trimmed when movableBlocks prop is active (#283)

## 0.6.14 - 2019-11-30
### Added
- Add onAction function to listen to reorder blocks button clicks (#282)

## 0.6.13 - 2019-11-27
### Fixed
- Mantain the plugin block focus in edit (#276)

## 0.6.12 - 2019-11-26
### Fixed
- Sidebar error when there's no onAction prop (#276)

## 0.6.11 - 2019-11-12
### Added
- Enable reorder blocks (#272)
- Add the hability to listen sidebar/plugins actions (#273)

## 0.6.10 - 2019-10-24
### Fixed
- Bad rendering when attempting to remove a blockquote (#187)

## 0.6.9 - 2019-10-23
### Fixed
- Read only state on image block description (#262)

## 0.6.8 - 2019-10-16
### Fixed
- Read only media content (#261)

## 0.6.7 - 2019-08-08
### Fixed
- Avoiding errors when data prop is empty in atomic block (#245)

## 0.6.6 - 2019-07-31
### Added
- Allow BlockInput component to be rendered with custom `type` attribute (#244)

## 0.6.5 - 2019-05-23
### Fixed
- Conditionally prevent default on toolbar mousedown when not input (#233)
### Modified
- Allow optional shouldDisplayToolbarFn more control over rendering the toolbar (#233)
- Remove state changes in component will receive props (#233)

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
