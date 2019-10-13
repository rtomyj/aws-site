import React, { useEffect, useState } from 'react';
import { Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core'

export default function ListS3Resources()
{
	let [fileData, setFileData] = useState([])
	useEffect(() => {
		let h = {
			"accessKeyId": "AKIA5O44R3UMM3SN53Z5",
			"secretAccessKey": "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",
			"bucket": "yugiohsite",
			"key": "index.css",
			"Accept": "*/*",
		}
		fetch("http://localhost:3000/s3/fileList", {headers: h})
			.then((res) => res.json())
			.then((data) => setFileData(data))
	}, [])

	return(
		<div>
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
