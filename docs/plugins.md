# Plugins

It's possible to customize the plugins used by Megadraft, the default plugins
are image and video. Megadraft is initialized with an array of plugins.

```js

class Example extends React.Component {
  ...
  render() {
    return (
      <Megadraft plugins={[MyPlugin1, MyPlugin2]} .../>
    );
  }
}

```

## Plugin Structure

An example of plugin is the [default image plugin](https://github.com/globocom/megadraft/tree/master/src/plugins/image),
it needs to follow a simple structure:

```js
export default {
  // Name used to identify the plugin, needed to be unique
  type: "image",
  // React component to be rendered in the sidebar
  buttonComponent: ImageButton,
  // React component responsible for the block rendering in the content
  blockComponent: ImageBlock
};
```

### buttonComponent

The button component, if defined, is rendered as a button on Megadraft's
sidebar, it receives two props that can be useful:

- `onChange`: Editor onChange props;
- `editorState`: Current editorState;
- `className`: An class to be used to render with the default layout;

In the example below, we show a button that create an image entity:

```js
import React, {Component} from "react";
import {DraftJS} from "megadraft";

export default class BlockButton extends Component {
  constructor(props) {
    this.onClick = ::this.onClick;
  }

  onClick(e) {
    e.preventDefault();
    const src = window.prompt("Enter a URL");
    // Creates a new entity
    const entityKey = DraftJS.Entity.create("image", "IMMUTABLE", {src});
    // Calls the onChange method with the new state.
    this.props.onChange(DraftJS.AtomicBlockUtils.insertAtomicBlock(
      this.props.editorState,
      entityKey,
      "📷"
    ));
  }

  render() {
    return (
      <button className={this.props.className} onClick={this.onClick}>
        📷
      </button>
    );
  }
}
```

### blockComponent

When defined, blockComponent will be rendered everytime Megadraft encounters
an atomic block with type 'type'.

In the example below, we render an img tag with the src from the above example:

```js
import React, {Component} from "react";


export default class ImageBlock extends Component {

  render(){
    return (
      <img src={this.props.data.src} />
    );
  }
}

```
