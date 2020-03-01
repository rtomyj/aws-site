import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ListS3Resources } from './components/ListS3Resources';
import { Bucket } from './components/Bucket'
import { NotFound } from './err/NotFound'


export const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					path='/'
					exact
					component={ListS3Resources} />


				<Route
					path='/bucket'
					exact={false}
					component={ Bucket } />

				<Route
					component={NotFound} />
			</Switch>
		</BrowserRouter>
	)
}