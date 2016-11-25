# Custom Entities

Draftjs provides a mechanism to annotate a section of text with metadata.
This can be links, mentions, hashtags or similar. [DraftJS' section about entities](https://facebook.github.io/draft-js/docs/advanced-topics-entities.html)
gives you a good introduction about the topic.

Megadraft ships with a default entity "LINK" and an according action in the toolbar
that allows a user to type in an url.

You can customize these entities with the `entityInputs`-property and a custom set of actions:


```js
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";

// this is the default LinkInput that handles `LINK`-entities:
import LinkInput from 'megadraft/lib/entity_inputs/LinkInput';

// you can create a custom entity input component (see below)
import PageLinkInput from './path/to/PageLinkInput';

const entityInputs = {
  LINK: LinkInput,
  INTERNAL_PAGE_LINK: PageLinkInput
}

const actions = [
  {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
  {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
  // these actions correspond with the entityInputs above
  {type: "entity", label: "Link", style: "link", entity: "LINK", icon: icons.LinkIcon},
  {type: "entity", label: "Page Link", style: "link", entity: "INTERNAL_PAGE_LINK", icon: MyPageLinkIcon},

  {type: "separator"},
  {type: "block", label: "UL", style: "unordered-list-item", icon: icons.ULIcon},
  {type: "block", label: "OL", style: "ordered-list-item", icon: icons.OLIcon},
  {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon},
  {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
];

const myDecorator = new DraftJS.CompositeDecorator(
  // see section "Rendering a custom entity" below
)


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null, myDecorator)};
    this.onChange = ::this.onChange;
    this.getCustomSidebar = ::this.getCustomSidebar;
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
        actions={actions}
        entityInputs={entityInputs}
        />
    )
  }
}


```

## Creating a custom entity input

You can create your own entity input component which gets rendered in the toolbar if corresponding action is selected.

Every entity input component will receive the following properties:

- `entityType`: the entity type (string) like `LINK` or `INTERNAL_PAGE_LINK`
- `setEntity`: call this function to set the entity on the current selection.
You can pass an object that gets assigned as the data of the entity. (see example below)
- `removeEntity`: call this to remove the entity. It will also call `cancelEntity` afterwards.
- `cancelEntity`: call this if you want to close the entity input and show the normal toolbar.
- `setError`: call this to show an error msg under the input.
- `cancelError`: call this to clear the error message.
- `editorState`: the current draftjs `editorState`.
- `onChange`: call this if you want to manually change the `editorState`.

Example:

```js


// PageLinkInput.js
// This input renders a list of internal pages in a <select>-element
// that an editor can pick from

export default class PageLinkInput extends React.Component {
  constructor(props) {
    super(props);
    this.onPageChange = ::this.onPageChange;
    // load pages from somewhere
    this.pages = [
      { url: "/home", title: "Home"},
      { url: "/about", title: "About"},
      { url: "/my/subpage", title: "Subpage"},
      // ...
    ]
  }

  onPageChange(event) {
    const url = event.target.value;
    this.props.setEntity({url});
  }

  render() {
    return (
      <select className="toolbar__input" onChange={this.onPageChange}>
        <option>Please select page...</option>
        {
          this.pages.map(
            ({url, title}, index) => (
              <option key={index} value={url}>{title}</option>
            )
          )
        }
      </select>
    );
  }
}


```


## Rendering a custom entity:

In order to render custom entities, you need to define [Decorators](https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html#content).

Megadraft allows you to specify a custom decorator in the `editorStateFromRaw` function
and provides a utils function `createTypeStrategy` to create a simple entity-type strategy.


```js

import React from "react";
import ReactDOM from "react-dom";
import {DraftJS, MegadraftEditor, editorStateFromRaw, createTypeStrategy} from "megadraft";

import MyLinkComponent from './path/to/MyLinkComponent';
import MyInternalLinkComponent from './path/to/MyInternalLinkComponent';

const myDecorator = new DraftJS.CompositeDecorator([
  {
    strategy: createTypeStrategy("LINK"),
    component: MyLinkComponent,
  },
  {
    strategy: createTypeStrategy("INTERNAL_PAGE_LINK"),
    component: MyInternalLinkComponent,
  }
])

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null, myDecorator)};
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  render() {
    return (
      <MegadraftEditor
        // ....
        editorState={this.state.editorState}
        onChange={this.onChange}/>
    )
  }
}


// MyLinkComponent

import React from "react";
import {DraftJS} from "draft-js";


export default ({entityKey, children}) => {
  const {url} = DraftJS.Entity.get(this.props.entityKey).getData();
  return (
    <a className="editor__link" href={url} title={url}>
      {children}
    </a>
  );
};

```
