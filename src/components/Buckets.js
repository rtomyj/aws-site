import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableHead, TableCell, TableBody, TableRow, Typography, TextField, Snackbar, Link, Grid } from '@material-ui/core'

import { AwsLogin } from './AwsLogin'
import { AwsTableView } from './AwsTableView'
import { credentials } from '../testingConfig'

function textFieldChanged(item, setCreds)
{
	setCreds(item.target.value)
}


export const Buckets = (props) =>
{
	const [username, setUsername] = useState('')
	const [numberOfBuckets, setNumberOfBuckets] = useState('')

	const [bucketList, setBucketList] = useState([])
	const [sortedBucketList, setSortedBucketList] = useState([])
	const [creds, setCreds] = useState(credentials)
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
		sortBucketContent(sortedBucketList)
	}, [inverseSort])

	function handleCloseErrSnackbar(event, action)
	{
		if (action !== 'clickaway')	setIsShowingErrSnackbar(false)
	}

	function navigateToBucket(event)
	{
		const bucketName = event.target.childNodes[0].wholeText
		props.history.push({
			pathname: `/bucketContents/${bucketName}`,
			data: {
				bucket: bucketName,
				credentials: creds
			}
		})
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

			<AwsLogin
				username={ username }
				creds={ creds }
				setCreds={ setCreds }
				setBucketList={ setBucketList }
				inverseSort={ inverseSort }
				fetchFiles={ fetchFiles }
				setInverseSort={ setInverseSort }
				textFieldChanged={ textFieldChanged }
				numberOfBuckets={ numberOfBuckets } />

			<Paper style={{ margin: '1.5rem' }} >
				<Typography variant='h4' style={ { paddingTop: '1.5rem', marginLeft: '1rem' } } >
					Buckets
				</Typography>
				<AwsTableView
					tableChildren={sortedBucketList}
					tableItemClickAction={navigateToBucket}
				/>
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


		fetch( 'https://localhost/api/v1/s3/buckets', {
			method: 'POST'
			, body:  body
			, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
		})
			.then( res => res.json())
			.then( resContent => {
				setBucketList( resContent.Buckets )
				setUsername( resContent.Owner.DisplayName )
				setNumberOfBuckets( resContent.Buckets.length )
				console.log(resContent)
			})
			.catch( err => {
				console.log(err)
			})
	}



	function sortBucketContent(sortedBucketList)
	{
		let t = [ ...sortedBucketList ]
		t.sort( ( right, left ) => {
			const leftTokens = left.CreationDate.split( '-' )
			const rightTokens = right.CreationDate.split( '-' )

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
