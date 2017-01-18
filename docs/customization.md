# Customization

## Editor props

Here are the props that `MegadraftEditor` accepts:

- `placeholder`: Editor's placeholder text
- `plugins`: List of plugins to be used by the editor
- `editorState`: DraftJS' [editorState][api-reference-editor-state]
- `onChange`: Function fired when editor state changes
- `sidebarRendererFn`: (optional) it is called to render a custom sidebar. This
  method must return a valid React element.
- `Toolbar`: (optional) a custom toolbar component or a function that returns a
  rendered component
- `actions`: (optional) List of actions to render in Toolbar
- `keyBindings`: (optional) Custom key bindings
- `handleBlockNotFound`: (optional) called when the `editorState` contains a
  block for a plugin that is no longer available
- `softNewLines`: (optional) boolean, default true. Insert soft new line when user type "shift + enter".
Check the following sections for more info.


## Sidebar

You can provide your custom sidebar passing `sidebarRendererFn` prop.
Notice: we plan to rename this property to just `Sidebar` in future versions.

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";
import CustomSidebar from "my/sidebar/path";

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
  document.getElementById("container")
);
```

The `sidebarRendererFn` takes a props object with the following properties:

* `plugins`: array of valid plugins
* `editorState`: DraftJS editorState object
* `onChange`: handler for editorState changes


## Toolbar Actions

You can provide custom actions using MegadraftEditor `actions` property.
Megadraft Toolbar provides [custom actions][custom actions] like **Bold** and
*Italic*, additionally you can provide your own custom actions or even add some
custom actions to the default ones.

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
  document.getElementById("container")
);
```


## Toolbar component

If you need more control over the toolbar,
you can provide a custom toolbar component as well with the `Toolbar` property:

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";
import CustomToolbar from "my/toolbar/path";

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
- `editorState`: the current draft [editorState][api-reference-editor-state].
- `readOnly`: whether the editor is in read-only mode. Usually, you might want
  to hide your toolbar if this property is set.
- `onChange`: function to pass a new editorState when a change occurred.
- `actions`: the action items to show in the toolbar. See [Megadraft
  actions][custom actions]


## Keybindings

You can provide custom key bindings to Megadraft by setting the `keyBindingFn`
property.

Example: Call a function when user presses control+s

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
  document.getElementById("container")
);
```

## Handling Missing Plugin (`handleBlockNotFound`)

When the `editorState` contains an atomic block that is no longer available,
an alternative block will be rendered as a fallback to indicate that the plugin
is missing.

This behavior is customizable using the `handleBlockNotFound` prop. It takes a
[ContentBlock][ContentBlock] object and should return either of the following:

* `null`: this will delegate the block rendering to DraftJS, resulting in an
  empty paragraph
* a [valid plugin][plugins] with a `blockComponent` property to render the
  fallback interface


[ContentBlock]: https://facebook.github.io/draft-js/docs/api-reference-content-block.html#content
[plugins]: http://globocom.github.io/megadraft/#/docs/plugins?_k=h3n0a5

The following example renders a `pre` element for the unregistered
`missing-plugin` atomic block.

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw({
      entityMap: {
      },
      blocks: [
        {
          key: "8xut",
          text: "",
          type: "atomic",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {
            type: "missing-plugin"
          }
        }
      ]
    })};
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  handleBlockNotFound(block) {
    return {
      blockComponent: (props) => <pre>plugin not found {props.data.type}</pre>
    };
  }

  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        handleBlockNotFound={this.handleBlockNotFound} />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("container")
);
```

[api-reference-editor-state]: https://facebook.github.io/draft-js/docs/api-reference-editor-state.html
[custom actions]: https://github.com/globocom/megadraft/blob/master/src/actions/default.js
