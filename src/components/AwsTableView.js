import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableHead, TableCell, TableBody, TableRow, Typography, TextField, Snackbar, Link, Grid } from '@material-ui/core'


export const AwsTableView = ( { tableChildren, tableItemClickAction } ) =>
{
	const [tableContent, setTableContent] = useState([])


	useEffect( () => {
		const tableContent = []

		tableChildren.forEach( (bucketChild, ind) => {
			tableContent.push(
				<TableRow key={`${ind}-row`} style={{  }} >
					<TableCell
						key={`${ind}-name`}
						style={{ color: 'white', fontWeight: 'bold', fontSize: '.92rem' }} >
							<Link color='secondary' href='#' onClick={ tableItemClickAction } >{ bucketChild.Name }</Link>
					</TableCell>
					<TableCell key={`${ind}-date`} style={{ color: 'black', fontWeight: 'bold', fontSize: '.92rem' }} >{ bucketChild.CreationDate }</TableCell>
				</TableRow>
			)
		})

		setTableContent(tableContent)
	}, [tableChildren])



	return(
		<Table >
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>Creation Date</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{ tableContent }
			</TableBody>
		</Table>
	)

}