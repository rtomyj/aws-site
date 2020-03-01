import React from 'react'
import { Paper, Button, Table, TableHead, TableCell, TableBody, TableRow, Typography, TextField
	, Snackbar, Link, Grid } from '@material-ui/core'


export const AwsLogin = ( { username, creds, setCreds, setBucketList, inverseSort, fetchFiles, setInverseSort, textFieldChanged, numberOfBuckets } ) =>
{

	return(
		<Paper
			style={{ padding: '1rem' }}>

			<Typography style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1.75rem' }} variant='h4'>
				Credentials
			</Typography>

			<Grid container spacing={1} >
				<Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
					<Typography variant='h5'>
						Logged In as: { username }
					</Typography>

					<Typography variant='h5'>
						Number of Buckets: { numberOfBuckets   }
					</Typography>
				</Grid>

				<Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
					<TextField
						id='creds'
						helperText='Paste json credentials'
						multiline={true}
						fullWidth={true}
						onChange={ (item) => textFieldChanged(item, setCreds) }
						value={creds} />

					<br /> <br />

					<div style={{ textAlign: 'center' }} >
						<Button onClick={() => fetchFiles(creds, setBucketList)} >Submit</Button>
						<Button onClick={ () => setInverseSort( inverseSort * -1 ) } >Inverse Sort</Button>
					</div>
				</Grid>
			</Grid>
		</Paper>
	)
}