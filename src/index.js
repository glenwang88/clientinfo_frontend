import React from 'react';
import ReactDOM from 'react-dom';

import {Route, BrowserRouter as Router} from 'react-router-dom'; 
import './index.css';
import App from './App';
import Query from './Query';
import Create from './Create';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	
	<Router>
	  <div>
	    <Route exact path='/' component={Query} />
	    <Route path='/query' component={Query} />
	    <Route path='/create' component={Create} />
	  </div>
	</Router>,
	
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
