import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ListS3Resources } from './components/ListS3Resources';
import { NotFound } from './err/NotFound'


export const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					path='/login'
					exact
					component={ListS3Resources} />

				<Route
					component={NotFound} />
			</Switch>
		</BrowserRouter>
	)
}