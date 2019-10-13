import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ListS3Resources from './ListS3Resources';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ListS3Resources />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
