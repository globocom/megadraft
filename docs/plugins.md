# Plugins

It's possible to customize the plugins used by Megadraft, the default plugins
are image and video. Megadraft is initialized with an array of plugins.

```js

class Example extends React.Component {
  ...
  render() {
    return (
      <MegadraftEditor plugins={[MyPlugin1, MyPlugin2]} .../>
    );
  }
}

```

## Plugin Generator

There is a [Yeoman Megadraft Plugin Generator][plugin-generator] that helps
creating the basic boilerplate code for a new plugin.

The following commands will install [Yeoman][yeoman], the plugin generator and
will run the generator. A few questions will be asked and the code will be
generated.

```sh
npm install -g yo
npm install -g generator-megadraft-plugin
yo megadraft-plugin
```

## Plugin Structure

A plugin should have the following structure:

```js
export default {
  // Friendly plugin name
  title: "Image",
  // A unique plugin name used to identify the plugin and its blocks
  type: "image",
  // React component to be rendered in the block sidebar
  buttonComponent: ImageButton,
  // React component for rendering the content block
  blockComponent: ImageBlock
};
```

Megadraft comes with [built-in plugins][repo-plugins], and you can look for more
Megadraft plugins on [Globo.com's organization page][github-globocom].


### buttonComponent

The button component, if defined, is rendered as a button on Megadraft's
sidebar, it receives the following props that can be useful:

- `onChange`: Editor onChange prop;
- `editorState`: Current editorState;
- `className`: A css class-name to be applied on the element.

In the example below, we show a button that creates an image block using a
DraftJS' entity:

```js
import React, {Component} from "react";
import {DraftJS, insertDataBlock} from "megadraft";

export default class BlockButton extends Component {
  constructor(props) {
    this.onClick = ::this.onClick;
  }

  onClick(e) {
    e.preventDefault();
    const src = window.prompt("Enter a URL");
    const data = {"type": "image", "src": src};
    // Calls the onChange method with the new state.
    this.props.onChange(insertDataBlock(this.props.editorState, data));
  }

  render() {
    return (
      <button className={this.props.className} onClick={this.onClick}>
        <SomeIcon className="sidemenu__button__icon" />
      </button>
    );
  }
}
```

### blockComponent

When defined, `blockComponent` will be rendered everytime Megadraft encounters
an atomic block with the same `type` of the plugin.

In the example below, we render an `img` tag with the `src` from the above
example:

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

[plugin-generator]: https://github.com/globocom/generator-megadraft-plugin
[repo-plugins]: https://github.com/globocom/megadraft/tree/master/src/plugins
[github-globocom]: https://github.com/globocom
[yeoman]: http://yeoman.io
