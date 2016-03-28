/*
 * Copyright (c) 2016, bkniffler (https://github.com/bkniffler)
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import Tooltip from "./tooltip";


export default class DraftToolbar extends Component {
  toggleAction(action) {
    if (action.toggle) {
      action.toggle(action, !action.active);
    }
  }

  renderButton(action) {
    const actionClass = `action-${action.style.style.toLowerCase()}`;
    const activeClass = action.active ? " active": "";
    const className = `item ${activeClass} ${actionClass}`;

    const Icon = action.style.icon;

    return (
      <li key={action.style.label} className={className}>
        <button onClick={() => this.toggleAction(action)}><Icon /></button>
      </li>
    );
  }

  render() {
    return (
      <Tooltip {...this.props}>
        <div className="draft-toolbar" onMouseDown={(x) => {x.preventDefault();}}>
          <ul>
            {this.props.actions.map(this.renderButton.bind(this))}
          </ul>
        </div>
      </Tooltip>
    );
  }
}
