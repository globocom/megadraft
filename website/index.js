import React from "react";
import ReactDOM from "react-dom";

import AppBar from 'material-ui/lib/app-bar';

import styles from './App.css';

import LeftNavMenu from './components/leftnavmenu';
import Example from './components/example';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


import Overview from '../docs/overview.md';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  onMenuToggle() {
    this.setState({open: !this.state.open})
  }
  render() {
    return (
      <div>
        <LeftNavMenu
          open={this.state.open}
          toggleMenu={::this.onMenuToggle} />
        <AppBar
          title="Megadraft"
          onLeftIconButtonTouchTap={::this.onMenuToggle} />
        <div className="content">
          <h1 className={styles.heading} >Megadraft</h1>
          <p>
            Megadraft is a Rich Text editor built on top of Facebook's
            draft.js featuring a nice default base of plugins and
            extensibility
          </p>
          <Example />
          <div dangerouslySetInnerHTML={{__html: Overview}}></div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <Page />,
  document.getElementById('container')
);
