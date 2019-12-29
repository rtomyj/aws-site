import React, { useEffect, useState } from 'react';
import { Paper, Button, Table, TableHead, TableCell, TableBody, TableRow, Typography, TextField } from '@material-ui/core'

function textFieldChanged(item, setCreds)
{
	setCreds(item.target.value)
}

function fetchFiles(creds, setFileData)
{
	fetch("http://localhost:3000/s3/fileList", { headers: JSON.stringify(creds)})
		.then( res => res.json())
		.then( data => setFileData(data))
		.catch( err => {
			console.log(err)
		})
}

export default function ListS3Resources()
{
	let [fileData, setFileData] = useState([])
	let [creds, setCreds] = useState('')

	return(
		<div>
			<Paper>
				<Typography variant='h5'>
					Credentials
				</Typography>
				<TextField id='creds' helperText='Paste json credentials' multiline={true} onChange={(item) => textFieldChanged(item, setCreds)} value={creds} />
				<Button onClick={() => fetchFiles(creds, setFileData)} >Submit</Button>
			</Paper>
			<Paper style={{ maxWidth: '700px' }}>
				<Table >
					<TableHead>
						<TableRow>
							<TableCell>File Name</TableCell>
							<TableCell>Size</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
							{fileData.map(file => (
								<TableRow>
									<TableCell>{file.name}</TableCell>
									<TableCell>{file.size}</TableCell>
								</TableRow>
							))
							}
					</TableBody>
				</Table>
			</Paper>
		</div>
	)
}
