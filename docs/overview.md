# Overview & usage

Megadraft is a Rich Text Editor built on top of Facebook's
[draft.js](https://facebook.github.io/draft-js/) framework

## Installation

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

