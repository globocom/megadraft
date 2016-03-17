/*
 * Copyright (c) 2016, bkniffler (https://github.com/bkniffler)
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import Tooltip from "./tooltip"


export default class DraftToolbar extends Component {
  toggleAction(action) {
    if (action.toggle) {
      action.toggle(action, !action.active);
    }
  }

  render() {
    return (
      <Tooltip {...this.props}>
        <div className="draft-toolbar" onMouseDown={(x) => {x.preventDefault()}}>
          {this.props.actions.map(action =>
            <div key={action.label} className={action.active ? 'item active': 'item'}>
              <button onClick={() => this.toggleAction(action)}>{action.button}</button>
            </div>
          )}
        </div>
      </Tooltip>
    );
  }
}
