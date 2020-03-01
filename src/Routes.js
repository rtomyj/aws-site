import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Buckets } from './components/Buckets';
import { BucketContents } from './components/BucketContents'
import { NotFound } from './err/NotFound'


export const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					path='/'
					exact
					component={Buckets} />


				<Route
					path='/bucketContents'
					exact={false}
					component={ BucketContents } />

				<Route
					component={NotFound} />
			</Switch>
		</BrowserRouter>
	)
}