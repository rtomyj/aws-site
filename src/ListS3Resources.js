import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableHead, TableCell, TableBody, TableRow, Typography, TextField } from '@material-ui/core'

function textFieldChanged(item, setCreds)
{
	setCreds(item.target.value)
}


export default function ListS3Resources()
{
	const [username, setUsername] = useState('')
	const [bucketList, setBucketList] = useState([])
	const [creds, setCreds] = useState( '' )

	return(
		<div>
			<Paper>
	<Typography variant='h4'>Logged in as: {username}</Typography>
				<Typography variant='h5'>
					Credentials
				</Typography>
				<TextField id='creds' helperText='Paste json credentials' multiline={true} onChange={(item) => textFieldChanged(item, setCreds)} value={creds} />
				<Button onClick={() => fetchFiles(creds, setBucketList)} >Submit</Button>
			</Paper>
			<Paper style={{ maxWidth: '700px' }}>
				<Table >
					<TableHead>
						<TableRow>
							<TableCell>Bucket</TableCell>
							<TableCell>Creation Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
							{ bucketList.map( bucket => (
								<TableRow>
									<TableCell>{ bucket.Name }</TableCell>
									<TableCell>{ bucket.CreationDate }</TableCell>
								</TableRow>
							)) }
					</TableBody>
				</Table>
			</Paper>
		</div>
	)



	function fetchFiles()
	{
		fetch( 'https://localhost/s3/bucketList', {
			method: 'POST'
			, body:  JSON.stringify( JSON.parse( creds ) )
			, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
		})
			.then( res => res.json())
			.then( resContent => {
				console.log( resContent )
				setUsername( resContent.Owner.DisplayName )
				setBucketList( resContent.Buckets )
			})
			.catch( err => {
				console.log(err)
			})

			//getFileList()
	}
}
