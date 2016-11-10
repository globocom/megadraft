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

You can provide your custom sidebar passing sidebarRendererFn prop.
Notice: we plan to rename this property to just `Sidebar` in future versions.

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

You can provide a custom Toolbar as well with the `Toolbar` property:

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";
import CustomToolbar from 'my/toolbar/path';

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
  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        Toolbar={CustomToolbar}/>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);

```

It will receive the following properties:

- `editor`: a reference to the editor dom node.
- `editorState`: the current draft [editorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html).
- `readOnly`: whether the editor is in read-only mode. Usually, you might want to hide your toolbar if this property is set.
- `onChange`: function to pass a new editorState when a change occured.
- `actions`: the action items to show in the toolbar. See https://github.com/globocom/megadraft/blob/master/src/actions/default.js




## Editor props

- `placeholder` Editor's placeholder text
- `plugins` List of plugins to be used by the editor
- `editorState` DraftJS' [editorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html)
- `onChange` Function fired on editor state changes
- `sidebarRendererFn` (optional) it is called to render a custom sidebar. This method must
return a valid React element.
