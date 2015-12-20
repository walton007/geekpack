import React from 'react'
import {Link} from 'react-router'

import RouteCSSTransitionGroup from './routeCSSTransitionGroup'

import './navigator.less'

const geekpackCfg = require('json!../../../.geekpack.json');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleShortcuts = this.handleShortcuts.bind(this);
  }
  render() {
    return (
      <div className="app">

        <RouteCSSTransitionGroup
          component="div" transitionName="appPage"
          transitionEnterTimeout={500} transitionLeaveTimeout={500}
        >
          {this.props.children}
        </RouteCSSTransitionGroup>

        <div className="hiddenLayer"></div>
        <ul className="navigator">
          {geekpackCfg.pages.map( page => {return <li key={`${page.name}`} ><Link to={`/${page.route}`}> {page.name} </Link></li>; }  )}
        </ul>
      </div>
    )
  }
  componentDidMount() {
    console.log('[App]: componentDidMount')
    // React.addEventListener(document, "keyup", this.handleShortcuts)
    $(document.body).on('keydown', this.handleShortcuts);
  }
  componentWillUnmount() {
    console.log('[App]: componentWillUnmount')
    // React.removeEventListener(document, "keyup", this.handleShortcuts)
    $(document.body).off('keydown', this.handleShortcuts);
  }

  handleShortcuts(eventObject) {
    if(event.keyCode == 27 /*Esc*/){
        alert('Esc alert....');
     }
  }

}
