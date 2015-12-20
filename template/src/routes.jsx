import React from 'react'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
// import { createHistory, useBasename } from 'history'
import App from 'application'
import SamplePage from 'samplePage'

/* GEEKPACK PLACEHOLDER START [import module] */
/* Don't Modify Below Code, as it's generated automatically by geekpack CLI */
/* GEEKPACK PLACEHOLDER END */

var Routes = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={SamplePage}/>
      {/* GEEKPACK PLACEHOLDER START [import route] */}
      {/* Don't Modify Below Code, as it's generated automatically by geekpack CLI */}
      {/* GEEKPACK PLACEHOLDER END */}
    </Route>
  </Router>
);

export default Routes