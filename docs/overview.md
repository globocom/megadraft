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

Then link the main css (dist/css/megadraft.css) on your page, you can use the Sass
source on your build, if you wish.

```html
<link href="node_modules/megadraft/dist/css/megadraft.css" rel="stylesheet">
```


### Custom Sidebar

<<<<<<< HEAD
You can provide your custom sidebar passing sidebarRendererFn prop.
Notice: we plan to rename this property to just `Sidebar` in future versions.
=======
You can provide your custom sidebar passing `sidebarRendererFn` prop.
>>>>>>> upstream/master

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

The `sidebarRendererFn` takes a props object with the following properties:

* `plugins`: array of valid plugins
* `editorState`: DraftJS editorState object
* `onChange`: handler for editorState changes


### Custom Toolbar Actions

You can provide custom actions using MegadraftEditor `actions` property.
Megadraft Toolbar provides [custom actions](https://github.com/globocom/megadraft/blob/master/src/actions/default.js)
like **Bold** and *Italic*, additionaly you can provide your own custom actions
or even add some custom actions to the default ones.

Example: Add an underline action.

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
    const custom_actions = actions.concat([
      {type: "inline", label: "U", style: "UNDERLINE", icon: UnderlineIcon}
    ]);
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        actions={custom_actions}/>
    )
  }
}

class UnderlineIcon extends React.Component {
  render() {
    return (
      <svg {...this.props} height="24" viewBox="0 0 24 24" width="24"></svg>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
```


### Custom Toolbar

If you need more control over the toolbar,
you can provide a custom toolbar component as well with the `Toolbar` property:

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";
import CustomToolbar from 'my/toolbar/path';

class App extends React.Component {
  // ....
  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        Toolbar={CustomToolbar}/>
    )
  }
}
```

It will receive the following properties:

- `editor`: a reference to the editor dom node.
- `editorState`: the current draft [editorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html).
- `readOnly`: whether the editor is in read-only mode. Usually, you might want to hide your toolbar if this property is set.
- `onChange`: function to pass a new editorState when a change occured.
- `actions`: the action items to show in the toolbar. See https://github.com/globocom/megadraft/blob/master/src/actions/default.js


## Custom Keybindings

You can provide custom key bindings to Megadraft by setting the `keyBindingFn` property.

Example: Call a function when user presses control s

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";

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

ReactDOM.render(
  <App />,
  document.getElementById('container')
);


```


## Editor props

- `placeholder` Editor's placeholder text
- `plugins` List of plugins to be used by the editor
- `editorState` DraftJS' [editorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html)
- `onChange` Function fired on editor state changes
- `sidebarRendererFn` (optional) it is called to render a custom sidebar. This method must
return a valid React element.
- `actions` (optional) List of actions to render in Toolbar
- `keyBindings` (optional) Custom key bindings
