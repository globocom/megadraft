# Overview & usage

Megadraft is a Rich Text Editor built on top of Facebook's
[draft.js](https://facebook.github.io/draft-js/) framework

## Installation

Megadraft can be installed via npm:

```sh
npm install --save megadraft
```

## Usage

To use it in your application all you need to do is import the Megadraft
component such as the following:

```js
import React from "react";
import ReactDOM from "react-dom";
import { MegadraftEditor, editorStateFromRaw } from "megadraft";

//Import megadraft.css
import "megadraft/dist/css/megadraft.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: editorStateFromRaw(null) };
  }

  onChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    return (
      //Add some margin left to show plugins sidebar
      <div style={{ marginLeft: 80 }}>
        <MegadraftEditor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="Add some text"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
```
