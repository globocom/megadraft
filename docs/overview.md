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
import Megadraft from "megadraft";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: null};
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  render() {
    return (
      <Megadraft
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

Then link the css (dist/css/megadraft.css) on your page, you can use the Sass
source on your build, if you wish.


## Editor props

- `placeholder` Editor's placeholder text
- `plugins` List of plugins to be used by the editor
- `editorState` DraftJS editor state
- `onChange` Function fired on editor state changes
