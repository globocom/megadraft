# Saving and loading content

It is easy to use JSON to save and load content into the editor, Megadraft
comes with two auxiliary functions to help in the process:

- `editorStateToJSON(EditorState)`: Converts the EditorState to JSON, which can
  be saved in a database.
- `editorStateFromRaw(content)`: Initialize an EditorState from an object
  generated with the above function or create an empty one if content is null.

In the example below, we use those functions to save and initialize the editor:

```js
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";

class Example extends React.Component {
  constructor(props) {
    super(props);
    // Here's the content you stored in the base
    // const myContent = load_from_db();
    const myContent = {"entityMap": {}, "blocks": []};
    const editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.state = {editorState};
    this.onChange = ::this.onChange;
    this.onSaveClick = ::this.onSaveClick;
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  onSaveClick() {
    const {editorState} = this.state;
    const content = editorStateToJSON(editorState);
    // Your function to save the content
    // save_my_content(content);
    console.log(content);
  }

  render() {
    return (
      <div>
        <MegadraftEditor
          editorState={this.state.editorState}
          onChange={this.onChange} />
        <button onClick={this.onSaveClick}>
          Save
        </button>
      </div>
    );
  }
}

```
