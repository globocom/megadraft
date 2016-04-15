import React from "react";

import Megadraft from "../../src/Megadraft";
import {editorStateToJSON, editorStateFromRaw} from "../../src/utils";

import styles from "../App.css";


const INITIAL_CONTENT = {
  "entityMap": {},
  "blocks": [
    {
      "key": "ag6qs",
      "text": "Hello World!",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 0,
          "length": 12,
          "style": "BOLD"
        },
        {
          "offset": 6,
          "length": 6,
          "style": "ITALIC"
        }
      ],
      "entityRanges": []
    }
  ]
};

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    const content = editorStateFromRaw(INITIAL_CONTENT);
    this.state = {value: content};
  }

  onChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <div className={styles.example}>
        <div className={styles.box}>
          <h2>Default editor behavior:</h2>
          <Megadraft
            editorState={this.state.value}
            onChange={::this.onChange}/>
        </div>
        <div className={styles.divider} ></div>
        <div className={styles.box}>
          <h2>Content JSON: </h2>
          <textarea
            value={editorStateToJSON(this.state.value)}
            readOnly={true}
            className={styles.jsonpreview}/>
        </div>
      </div>
    );
  }
}
