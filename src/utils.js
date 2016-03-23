import {
  convertToRaw,
  convertFromRaw,
  EditorState,
  ContentState} from "draft-js";

export function editorStateToJSON(editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(content), null, 2);
  }
}

export function editorStateFromRaw(rawContent) {
  const blocks = convertFromRaw(rawContent);
  const content = ContentState.createFromBlockArray(blocks);
  return EditorState.createWithContent(content);
}
