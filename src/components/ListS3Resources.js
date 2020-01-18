import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableHead, TableCell, TableBody, TableRow, Typography, TextField, Snackbar, Link } from '@material-ui/core'

function textFieldChanged(item, setCreds)
{
	setCreds(item.target.value)
}


export const ListS3Resources = () =>
{
	const [username, setUsername] = useState('')

	const [bucketList, setBucketList] = useState([])
	const [sortedBucketList, setSortedBucketList] = useState([])
	const [creds, setCreds] = useState(``)

	const [tableContent, setTableContent] = useState(undefined)
	const [inverseSort, setInverseSort] = useState(1)

	const [isShowingErrSnackbar, setIsShowingErrSnackbar] = useState(false)
	const [errSnackbarMessage, setErrSnackbarMessage] = useState('')


	useEffect( () => {
		const sortedBucketList = []

		for ( let bucket of bucketList )
		{
			bucket.CreationDate = bucket.CreationDate.split("T")[0]
			sortedBucketList.push(bucket)
		}

		sortBucketContent(sortedBucketList)

	}, [bucketList])


	useEffect( () => {
		const tableContent = []

		sortedBucketList.forEach( (bucketItem, ind) => {
			tableContent.push(
				<TableRow key={`${ind}-row`} style={{  }} >
					<TableCell
						key={`${ind}-name`}
						style={{ color: 'white', fontWeight: 'bold', fontSize: '.92rem' }} >
							<Link color='secondary' href='#' onClick={ navigateToBucket } >{ bucketItem.Name }</Link>
					</TableCell>
					<TableCell key={`${ind}-date`} style={{ color: 'white', fontWeight: 'bold', fontSize: '.92rem' }} >{ bucketItem.CreationDate }</TableCell>
				</TableRow>
			)
		})

		setTableContent(tableContent)

	}, [sortedBucketList])



	useEffect( () => {
		sortBucketContent(sortedBucketList)
	}, [inverseSort])

	function handleCloseErrSnackbar(event, action)
	{
		if (action !== 'clickaway')	setIsShowingErrSnackbar(false)
	}

	function navigateToBucket()
	{
		console.log('navigating to bucket')
	}


	return(
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				message={errSnackbarMessage}
				open={isShowingErrSnackbar}
				autoHideDuration={4000}
				onClose={ handleCloseErrSnackbar }
				action={
					<Button
						style={{color: 'white'}}
						onClick={ handleCloseErrSnackbar } >
							Gotcha!
					</Button> } />

			<Paper
				style={{ padding: '1rem', width: '100%' }}>
				<Typography variant='h4'>
					Logged in as: {username}
				</Typography>

				<Typography variant='h5'>
					Credentials
				</Typography>

				<TextField
					id='creds'
					helperText='Paste json credentials'
					multiline={true}
					fullWidth={true}
					onChange={ (item) => textFieldChanged(item, setCreds) }
					value={creds} />

				<br /> <br />

				<Button onClick={() => fetchFiles(creds, setBucketList)} >Submit</Button>
				<Button onClick={ () => setInverseSort( inverseSort * -1 ) } >Inverse Sort</Button>
			</Paper>


			<Paper style={{ minWidth: '100%', margin: '1.5rem' }} >
				<Typography variant='h4' style={ { padding: '.9rem' } } >
					Buckets
				</Typography>

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
			</Paper>
		</div>
	)



	function closeErrorSnackbar()
	{
		setIsShowingErrSnackbar(false)
	}



	function fetchFiles()
	{
		if ( creds === undefined || creds === '' )
		{
			setErrSnackbarMessage('There are no JSON credentials in text field.')
			setIsShowingErrSnackbar(true)
			return
		}

		let body;
		try
		{
			body = JSON.stringify( JSON.parse(creds) )
		}
		catch (err)
		{
			setErrSnackbarMessage('The json credentials provided are not valid JSON. Please try again with no shenanigans')
			setIsShowingErrSnackbar(true)
			console.log(creds)
			console.log(err)
			return
		}


		fetch( 'https://localhost/s3/bucketList', {
			method: 'POST'
			, body:  body
			, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
		})
			.then( res => res.json())
			.then( resContent => {
				setBucketList( resContent.Buckets )
				setUsername( resContent.Owner.DisplayName )

			})
			.catch( err => {
				console.log(err)
			})

			//getFileList()
	}



	function sortBucketContent(sortedBucketList)
	{
		let t = [ ...sortedBucketList ]
		t.sort( ( right, left ) => {
			const leftTokens = left.CreationDate.split( '-' )
			const rightTokens = right.CreationDate.split( '-' )

			console.log('inverse clicked?')

			//console.log(`left = ${left.CreationDate}, right ${right.CreationDate}`)

			if ( Number( leftTokens[0] ) - Number ( rightTokens[0] ) === 0 )
			{
				if ( Number( leftTokens[1] ) - Number ( rightTokens[1] ) === 0 )
					return ( Number( leftTokens[2] ) - Number ( rightTokens[2] ) ) * inverseSort

				return ( Number( leftTokens[1] ) - Number ( rightTokens[1] ) ) * inverseSort
			}

			return ( Number( leftTokens[0] ) - Number ( rightTokens[0] ) ) * inverseSort
		} )

		setSortedBucketList( t )
	}
}
