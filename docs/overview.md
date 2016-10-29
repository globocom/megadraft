# Overview

Megadraft is a Rich Text Editor built on top of Facebook's
[draft.js](https://facebook.github.io/draft-js/) framework

# Installation

Megadraft can be installed via npm:

```sh
npm install --save megadraft
```

## Usage

To use it in your application you'll just need to import the Megadraft
component and use it in your application.

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}/>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
```

### Custom Sidebar

You can provide your custom sidebar passing sidebarRendererFn prop

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";
import CustomSidebar from 'my/sidebar/path';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
    this.onChange = ::this.onChange;
    this.getCustomSidebar = ::this.getCustomSidebar;
  }

  onChange(editorState) {
    this.setState({editorState});
  }
  /**
   * @param props.plugins Array of valid plugins
   * @param props.editorState DraftJS editorState object
   * @param props.onChange You must use this handler for change events
   */
  getCustomSidebar(props) {
    return <CustomSidebar {...props} />
  }
  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        sidebarRendererFn={this.getCustomSidebar}/>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);

```

Then link the main css (dist/css/megadraft.css) on your page, you can use the Sass
source on your build, if you wish.

```html
<link href="node_modules/megadraft/dist/css/megadraft.css" rel="stylesheet">
```

### Custom Toolbar

You can provide custom actions using MegadraftEditor `actions` property. Megadraft Toolbar provides [custom actions](https://github.com/globocom/megadraft/blob/master/src/actions/default.js) like **Bold** and *Italic*, additionaly you can provide your own custom actions or even add some custom actions to the default ones.

Example: Add an underlined action

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";
import CustomSidebar from 'my/sidebar/path';

import actions from "megadraft/actions/default";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.setState({editorState});
  }
  render() {
    const custom_actions = actions.concat([{type: "inline", label: "U", style: "UNDERLINE", icon: Underlined}]);
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        actions={custom_actions}/>
    )
  }
}

/**
 * Underlined Icon.
 * svg extracted from [Material UI underlined icon](https://material.io/icons/#ic_format_underlined)
 */
class Underlined extends React.Component {
  render() {
    return (
      <svg {...this.props} height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" fillRule="evenodd" d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
      </svg>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);

```

## Custom Keybindings

You can provide custom key bindings to Megadraft by setting the `keyBindingFn` property.

Example: Call a function when user presses control s

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";
import CustomSidebar from 'my/sidebar/path';

import actions from "megadraft/actions/default";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
    this.onChange = ::this.onChange;
    this.keyBindings = [
        { name: "save", isKeyBound: (e) => { return e.keyCode === 83 && e.ctrlKey; }, action: () => { this.onSave(); } }
    ];
  }

  onChange(editorState) {
    this.setState({editorState});
  }
  onSave() {
    console.log("save");
  }
  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        keyBindings={this.keyBindings}/>
    )
  }
}

/**
 * Underlined Icon.
 * svg extracted from [Material UI underlined icon](https://material.io/icons/#ic_format_underlined)
 */
class Underlined extends React.Component {
  render() {
    return (
      <svg {...this.props} height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" fillRule="evenodd" d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
      </svg>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);

```
## Editor props

- `placeholder` Editor's placeholder text
- `plugins` List of plugins to be used by the editor
- `editorState` DraftJS editor state
- `onChange` Function fired on editor state changes
- `sidebarRendererFn` (optional) it is called to render a custom sidebar. This method must
return a valid React element.
- `actions` (optional) List of actions to render in Toolbar
- `keyBindings` (optional) Custom key bindings
