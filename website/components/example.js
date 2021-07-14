/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { useState, useEffect } from "react";

import { MegadraftEditor } from "../../src/Megadraft";
import { editorStateToJSON, editorStateFromRaw } from "../../src/utils";
import { highlightCode } from "./highlightCode";

import INITIAL_CONTENT from "./contentExample";

import relatedArticles from "megadraft-related-articles-plugin";
import image from "../../src/plugins/image/plugin";
import video from "../../src/plugins/video/plugin";

const initialEditorState = editorStateFromRaw(INITIAL_CONTENT);

function Editor(props) {
  const { editorState, onChange } = props;
  const keyBindings = [
    {
      name: "save",
      isKeyBound: e => e.keyCode === 83 && e.ctrlKey,
      action: () => console.log("save")
    }
  ];

  function onAction(args) {
    console.log("onAction fired with args:", args);
  }

  return (
    <div className="tab-container-editor">
      <MegadraftEditor
        plugins={[image, video, relatedArticles]}
        editorState={editorState}
        placeholder="Text"
        onChange={onChange}
        keyBindings={keyBindings}
        resetStyleNewLine={true}
        maxSidebarButtons={null}
        onAction={onAction}
        movableBlocks={true}
        maxSidebarButtons={2}
      />
    </div>
  );
}

function JSONPreview(props) {
  const { editorState } = props;

  return (
    <div>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/gruvbox-dark.min.css"
      />
      <div className="tab-container-json">
        <pre className="jsonpreview">
          <code className="json hljs">{editorStateToJSON(editorState)}</code>
        </pre>
      </div>
    </div>
  );
}

export default function Example(props) {
  const { activeContent } = props;

  const [editorState, setEditorState] = useState(initialEditorState);
  useEffect(() => highlightCode(), []);

  return activeContent ? (
    <Editor editorState={editorState} onChange={setEditorState} />
  ) : (
    <JSONPreview editorState={editorState} />
  );
}

/* global hljs */
hljs.initHighlightingOnLoad();
