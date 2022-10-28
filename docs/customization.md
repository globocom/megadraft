# Customization

## Editor props

Here are the props that `MegadraftEditor` accepts:

- `placeholder`: Editor's placeholder text
- `plugins`: List of plugins to be used by the editor
- `editorState`: DraftJS' [editorState][api-reference-editor-state]
- `onChange`: Function fired when editor states changes
- `onAction`: (optional) Function fired when the following actions are executed: `SIDEBAR_EXPAND`, `SIDEBAR_SHRINK`, `SIDEBAR_CLICK_MORE`, `SIDEBAR_ADD_PLUGIN`, `PLUGINS_MODAL_CLOSE`, `PLUGINS_MODAL_ADD_PLUGIN`
- `sidebarRendererFn`: (optional) it is called to render a custom sidebar. This
  method must return a valid React element.
- `Toolbar`: (optional) a custom toolbar component or a function that returns a
  rendered component
- `actions`: (optional) List of actions to render in the Toolbar
- `keyBindings`: (optional) Custom key bindings
- `handleBlockNotFound`: (optional) called when the `editorState` contains a
  block for a plugin that is no longer available
- `softNewLines`: (optional) boolean, default true. Insert a soft new line when
  the user type "shift + enter".
- `resetStyleNewLine`: (optional) boolean, default false.An editor will reset
  styles when a new paragraph is created.
- `blocksWithoutStyleReset`: (optional) list, defaults to
  `['ordered-list-item', 'unordered-list-item']`. Tells the editor which
  blocks won't have its types reset if `resetStyleNewLine` is `true`.
- `maxSidebarButtons`:  (optional) Limits the number of buttons
  displayed on the sidebar. When the limit is reached an extra button will appear
  and when clicked it will open a modal window with the full button list.
- `modalOptions`: (optional) object, height and width of the modal.
  Check the following sections for more info.
- `shouldDisplayToolbarFn`: (optional) Boolean-valued function fired when
  editor state changes. It allows to control whether or not the Toolbar should
  be shown.
- `language`: (optional) Changes the language. This is a string like xx-YY,
  where xx is a language code and YY is a country code.
  See [Megadraft strings][i18n-strings].
- `i18n`: (optional) A dictionary to translate the editor strings.
   This is an object with at least one language key (one of them needs to be
   equal to the `language` prop), this `language` is an object with four keys,
   each of them is a string which will be translated:
  - `"Type the link and press enter"`: A string that changes the text of the
     link placeholder.
  - `"Invalid Link"`: A string that changes the text of invalid links.
  - `"Can't show plugin, component {{type}} not found."`: Changes the text
   that will appear when a plugin is missing.
  - `"Block List"`: A string that changes the block list title.
  ```js
    //Example
        i18n = {
          "Type the link and press enter": "Type the link and press enter",
          "Invalid Link": "Invalid Link",
          "Can't show plugin, component {{type}} not found.":
             "Can't show plugin, component {{type}} not found.",
           "Block List": "Block List"
        }
- `hideSidebarOnBlur`: (optional) boolean, default false. Hide Sidebar on blur.
- `movableBlocks`: (optional) boolean, default false. Allows reorder blocks.

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
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  getCustomSidebar = (props) => {
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
import actions from "megadraft/lib/actions/default"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
  }

  onChange = (editorState) =>  {
    this.setState({editorState});
  }

  render() {
    const customActions = actions.concat([
      {type: "inline", label: "U", style: "UNDERLINE", icon: UnderlineIcon}
    ]);
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        actions={customActions}/>
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

You can also provide a fully custom action:

```js
const customActions = [
  {
    type: "custom",
    icon: OwnIcon,
    action() {
      // Here goes the code triggered on button click
    },
    active() {
      // Return a Boolean to handle the active state of button on Toolbar.
    }
  },
];
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
    this.keyBindings = [
        { name: "save", isKeyBound: (e) => { return e.keyCode === 83 && e.ctrlKey; }, action: () => { this.onSave(); } }
    ];
  }

  onChange = (editorState) => {
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
  }

  onChange = (editorState) => {
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

### Handling too many plugins

By default, plugin buttons are shown on a vertical sidebar. This may be a bit
cumbersome when there are a lot of enabled plugins.

To overcome this, the prop `maxSidebarButtons` limits the number of buttons
displayed on the sidebar. When the limit is reached an extra button will appear
and when clicked it will open a modal window with the full button list.

Passing a number to the `maxSidebarButtons` prop will limit the number of
buttons displayed on the sidebar.

Omitting this prop or passing a `null` value forces all buttons to be displayed
on the sidebar.

You can set the width and height of modal via props too. Passing the prop
`modalOptions`, see below. Default values are `width:528` and `height:393`.

```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
    this.maxSidebarButtons = 3;
    this.modalOptions = {width:528, height:393};
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        maxSidebarButtons={this.maxSidebarButtons}
        modalOptions={this.modalOptions}
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
[i18n-strings]: https://github.com/globocom/megadraft/blob/master/src/i18n.js
