/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import { fromJS } from "immutable";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import {grey300, grey900, white, indigo500} from "material-ui/styles/colors";

import {MegadraftEditor} from "../../src/Megadraft";
import {editorStateToJSON, editorStateFromRaw} from "../../src/utils";
import {highlightCode} from "./highlightCode";

import INITIAL_CONTENT from "./contentExample";

import relatedArticles from "megadraft-related-articles-plugin";
import image from "../../src/atomicBlocks/image";
import video from "../../src/atomicBlocks/video";

import createLinkifyPlugin from "draft-js-linkify-plugin";
import createMentionPlugin, { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import createCounterPlugin from "draft-js-counter-plugin";


const muiTheme = getMuiTheme({
  fontFamily: "Roboto, sans-serif",
  tabs: {
    textColor: grey300,
    selectedTextColor: grey900
  },
  palette: {
    primary1Color: white,
    accent1Color: indigo500
  }
});


const mentions = fromJS([
  {
    name: 'Matthew Russell',
    link: 'https://twitter.com/mrussell247',
    avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    name: 'Jyoti Puri',
    link: 'https://twitter.com/jyopur',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  {
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
  },
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    name: 'Pascal Brandt',
    link: 'https://twitter.com/psbrandt',
    avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
]);

const linkifyPlugin = createLinkifyPlugin();
const mentionPlugin = createMentionPlugin();
const counterPlugin = createCounterPlugin();

const plugins = [linkifyPlugin, mentionPlugin, counterPlugin];

const { MentionSuggestions } = mentionPlugin;
const { CharCounter, WordCounter, LineCounter } = counterPlugin;

class Example extends React.Component {

  constructor(props) {
    super(props);
    const content = editorStateFromRaw(INITIAL_CONTENT);
    this.keyBindings = [{
      name: "save",
      isKeyBound: (e) => {return e.keyCode === 83 && e.ctrlKey;},
      action: () => {this.onSave();}
    }];
    this.resetStyleNewLine = true;
    this.state = {
      value: content,
      suggestions: mentions,
    };
    this.onChange = ::this.onChange;
    this.onCodeActive = ::this.onCodeActive;
    this.maxSidebarButtons = null;
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(muiTheme)};
  }

  componentDidMount() {
    highlightCode(this);
  }

  onChange(value) {
    this.setState({
      value
    });
  }

  onMentionSearch = ({value}) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  }

  onAddMention = (...args) => {
    console.log("onAddMention", args);
  }

  onSave() {
    console.log("save");
  }

  onCodeActive() {
    highlightCode(this);
  }

  renderEditor() {
    return (
      <div className="tab-container-editor">
        <MegadraftEditor
          atomicBlocks={[image, video, relatedArticles]}
          plugins={plugins}
          editorState={this.state.value}
          placeholder="Text"
          onChange={this.onChange}
          keyBindings={this.keyBindings}
          resetStyleNewLine={this.resetStyleNewLine}
          maxSidebarButtons={this.maxSidebarButtons}/>
        <MentionSuggestions
          onSearchChange={this.onMentionSearch}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention} />
        <div style={{position: "fixed", bottom: 50, left: 50}}>
          <p><CharCounter limit={200} /> characters</p>
          <p><WordCounter limit={30} /> words</p>
          <p><LineCounter limit={10} /> lines</p>
        </div>
      </div>
    );
  }

  renderJsonPreview() {
    return (
      <div>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/gruvbox-dark.min.css"/>
        <div className="tab-container-json">
          <pre className="jsonpreview">
            <code className="json hljs">
              {editorStateToJSON(this.state.value)}
            </code>
          </pre>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.activeContent) {
      return this.renderEditor();
    }
    return this.renderJsonPreview();
  }
}

/* global hljs */
hljs.initHighlightingOnLoad();

Example.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default Example;
