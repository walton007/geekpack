import React from 'react'
import { render } from 'react-dom'
import router from './routes'

import './styles/base.less';

require('expose?$!expose?jQuery!jquery');
require("!!bootstrap-webpack!./config/bootstrap.config.js");

require('expose?React!react');

// add react div to body
const reactContentWrap = document.createElement('div');
document.body.appendChild(reactContentWrap);

render(router, reactContentWrap)