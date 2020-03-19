import React, { Fragment, useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import Log from './Log';

import styles from 'assets/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js';

const useStyles = makeStyles(styles);

const Logs = () => {
	const classes = useStyles();
	const [logs, setLogs] = useState([
		{
			_id: '5e71ebf8aa4f63b7a675bf27',
			deviceName: 'postman',
			type: 'checker',
			datetime: '2020-03-18T09:38:00.834Z',
			updatedAt: '2020-03-18T09:38:00.834Z',
			__v: 0
		}
	]);
	useEffect(() => {
		async function fetchData() {
			let response = await fetch('http://localhost:3001/api/log');
			response = await response.json();
			return response.data;
		}
		setInterval(() => {
			fetchData().then(data => {
				if (JSON.stringify(logs) !== JSON.stringify(data)) {
					setLogs(data);
				}
			});
		}, 3000);
	}, []);
	return (
		<div className={classes.section}>
			<GridContainer justify='center'>
				<GridItem xs={12} sm={12} md={8}>
					<h2 className={classes.title}>RFID Logs</h2>
				</GridItem>
				{logs.map(log => (
					<GridItem xs={12} sm={12} md={8}>
						<Log {...log} key={log._id}></Log>
					</GridItem>
				))}
			</GridContainer>
		</div>
	);
};
export default Logs;
