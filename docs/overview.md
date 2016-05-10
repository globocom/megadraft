# Overview

Megadraft is a Rich Text Editor built on top of Facebook's
[draft.js](https://facebook.github.io/draft-js/) framework

## How to use

To use it in your application you'll just need to import the Megadraft
component and use it in your application.

```jsx
import React from "react";
import ReactDOM from "react-dom";

import Megadraft from "megadraft";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>My nice little editor</h1>
        <Megadraft />
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('container')
);
```
