import React, { useState, useEffect } from 'react'
import { Typography, Paper, Button } from '@material-ui/core'

import { AwsTableView } from './AwsTableView'


export const Bucket = ( props ) =>
{
	const [credentials, setCredentials] = useState({})
	const [bucket, setBucket] = useState('')
	const [baseFolder, setBaseFolder] = useState('')
	const [folders, setFolders] = useState([])
	const [files, setFiles] = useState([])

	const [fileContent, setFileContent] = useState([])
	const [fileCount, setFileCount] = useState(0)

	const [folderContent, setFolderContent] = useState([])
	const [folderCount, setFolderCount] = useState(0)


	useEffect( () => {
		if (props.location.data !== undefined)
		{
			setCredentials( JSON.parse( props.location.data.credentials ) )
			setBucket( props.location.data.bucket )
		}
	}, [props.location.data])


	useEffect( () => {
		if (credentials !== {} || bucket !== '')
			fetchBucketContent(credentials, bucket)

	}, [credentials, bucket, baseFolder])


	useEffect( () => {
		const folderContent = []

		folders.forEach((item, index) => {
			let folderName = item.name;
			if (folderName.slice(-1) === '/')	folderName = folderName.substring(0, folderName.length - 1)

			const bucketItem = {
				Name: folderName
				, CreationDate: undefined
			}
			folderContent.push(bucketItem)
		})

		setFolderContent(folderContent)
	}, [folders])


	useEffect( () => {
		const fileContent = []

		files.forEach((item, index) => {
			const bucketItem = {
				Name: item.name
				, CreationDate: item.lastModified
			}
			fileContent.push(bucketItem)
		})

		setFileContent(fileContent)
	}, [files])



	function test(event)
	{
		const selectedFolder = event.target.childNodes[0].wholeText
		setBaseFolder(`${selectedFolder}/`)
	}



	function goback()
	{
		const tokens = baseFolder.split('/')

		let prevFolder = tokens.slice(0, tokens.length - 2).join('/')
		prevFolder = `${prevFolder}/`
		if (prevFolder.trim() === '/')	prevFolder = ''

		setBaseFolder(prevFolder)
	}



	return(
		<div>
			<Paper
				style={{ padding: '1rem' }}>

				<Typography style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1.75rem' }} variant='h4'>
					{ bucket }
				</Typography>

				<Button onClick={goback}>
					Go bak
				</Button>
			</Paper>

			<Paper style={{ margin: '1.5rem' }} >
				<Typography variant='h4' style={ { paddingTop: '1.5rem', marginLeft: '1rem' } } >
					Folders
				</Typography>
				<Typography variant='h5' style={ { marginLeft: '1rem' } } >
					Total: { folderCount }
				</Typography>

				<AwsTableView
					tableChildren={folderContent}
					tableItemClickAction={test}
				/>
			</Paper>

			<Paper style={{ margin: '1.5rem' }} >
				<Typography variant='h4' style={ { paddingTop: '1.5rem', marginLeft: '1rem' } } >
					Files
				</Typography>
				<Typography variant='h5' style={ { marginLeft: '1rem' } } >
					Total: { fileCount }
				</Typography>

				<AwsTableView
					tableChildren={fileContent}
					tableItemClickAction={undefined}
				/>
			</Paper>
		</div>
	)



	function fetchBucketContent(credentials, bucket)
	{
		const url = 'https://localhost/api/v1/s3/bucket/content'
		const b = {
			...credentials
			, bucket: bucket
			, folder: baseFolder
		}
		console.log(JSON.stringify(b))


		fetch(url, {
			method: 'POST'
			, body: JSON.stringify(b)
			, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
		})
			.then(res => res.json())
			.then(json => {

				setFolders(json.folders.items)
				setFiles(json.files.items)

				setFolderCount(json.folders.count)
				setFileCount(json.files.count)
			})
			.catch( err => {
				console.log(err)
			})
	}
}