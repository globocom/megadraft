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

Plugin display options can be customized by adding the following to the plugin structure:

```js
options: {
  defaultDisplay: "center",
  displayOptions: [
    {"key": "center", "icon": MegadraftIcons.MediaMediumIcon, "label": "CENTER"},
    {"key": "left", "icon": MegadraftIcons.MediaSmallIcon, "label": "LEFT"}]
}
```

If you do not want to display your plugin on the sidebar as an option to add but still want it available for serializing, buttonComponent may be set to `null`.

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
import React, { Component } from "react";
import { insertDataBlock } from "megadraft";

export default class BlockButton extends Component {
  onClick = e => {
    e.preventDefault();
    const src = window.prompt("Enter a URL");
    const data = { type: "image", src: src };
    // Calls the onChange method with the new state.
    this.props.onChange(insertDataBlock(this.props.editorState, data));
  };

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
import React, { Component } from "react";

export default class ImageBlock extends Component {
  render() {
    return <img src={this.props.data.src} />;
  }
}
```

### CommonBlock

Several common components can help build Megadraft plugins quickly. In the example below, we render a CommonBlock with BlockContent containing an `img` tag with the `src` from above.

```js
import React, { Component } from "react";
import { MegadraftIcons, MegadraftPlugin } from "megadraft";
const { BlockContent, BlockData, BlockInput, CommonBlock } = MegadraftPlugin;

export default class ImageBlock extends Component {
  render() {
    const blockActions = [
      {
        key: "delete",
        icon: MegadraftIcons.DeleteIcon,
        action: this.props.container.remove
      }
    ];

    return (
      <CommonBlock actions={blockActions} {...this.props}>
        <BlockContent>
          <img src={this.props.data.src} />
        </BlockContent>

        <BlockData>
          <BlockInput placeholder="Enter an image caption" />
        </BlockData>
      </CommonBlock>
    );
  }
}
```

### Props received by blockComponent

- `data`: Any data passed into `insertDataBlock` function after `editorState`
- `container`: Instance of [Media Component](https://github.com/globocom/megadraft/blob/master/src/components/Media.js) with helper functions `remove` to remove the block from `editorState` and `updateData` to update plugin data
- `blockProps`: Object containing `editorState`, ReadOnly getters & setters from `MegadraftEditor`, `onChange` as a proxy to `container.updateData`, as well as the defined `plugin` object structure.

[plugin-generator]: https://github.com/globocom/generator-megadraft-plugin
[repo-plugins]: https://github.com/globocom/megadraft/tree/master/src/plugins
[github-globocom]: https://github.com/globocom
[yeoman]: http://yeoman.io
