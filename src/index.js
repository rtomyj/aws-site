import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { Routes } from './Routes'


const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#e0115f',
			contrastDefaultColor: 'light'
		},
		secondary: {
			main: '#07c007',
			contrastDefaultColor: 'light'
		}
	},
	overrides: {
		'MuiChip': {
			label:
			{
				fontWeight: 500,
				'@media screen and (min-width:0px)': {
					fontSize: '.81rem'
				},
				'@media screen and (min-width:600px)': {
					fontSize: '.825rem',
				}
			}
		},
		'MuiTableCell': {
			head: {
				fontWeight: '700',
				fontSize: '.95rem'
			},
		}
	},
	typography: {
		button: {
			fontFamily: 'Nunito',
			lineHeight: '1.1rem',
			fontSize: '.85rem',
		},
		h4: {
			fontFamily: 'Nunito',
			fontWeight: 600,
			color: '#e0115f',
			lineHeight: '1.65rem',
			marginBottom: '.75rem',
			fontSize: '1.55rem',
		},
		h5: {
			fontFamily: 'Nunito',
			fontWeight: 800,
			lineHeight: '1.3rem',
			marginBottom: '.5rem',
			color: '#595959',
			fontSize: '1.05rem'
		},
		h6: {
			fontFamily: 'Nunito',
			fontWeight: 400,
			lineHeight: '1.3rem',
			color: '#383838',
			fontSize: '.95rem',
		},
		subtitle1: {
			fontFamily: 'OpenSans',
			fontWeight: 600,
			lineHeight: '1.15rem',
			color: '#2b2a2a',
			fontSize: '.91rem',
		},
		subtitle2: {
			fontFamily: 'OpenSans',
			fontWeight: 500,
			lineHeight: '1.15rem',
			color: '#2b2a2a',
			fontSize: '.88rem',
		},
		body1: {
			fontFamily: 'OpenSans',
			fontWeight: 500,
			lineHeight: '1.15rem',
			color: '#2b2a2a',
			fontSize: '.83rem',
		},
		body2: {
			fontFamily: 'OpenSans',
			fontWeight: 500,
			lineHeight: '1.1rem',
			color: '#2b2a2a',
			fontSize: '.77rem',
		},
	}
})


ReactDOM.render(
	<ThemeProvider
		theme={ theme } >
			<Routes />
	</ThemeProvider>
	, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
