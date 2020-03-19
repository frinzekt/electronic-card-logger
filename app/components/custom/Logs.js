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

	const [logs, setLogs] = useState([]);

	const origin = typeof window !== 'undefined' ? window.location.origin : false;
	if (origin) {
		useEffect(() => {
			async function fetchData() {
				let response = await fetch(`${origin}/api/log`);
				response = await response.json();
				return response.data;
			}

			// Continous Running
			const loop = () => {
				fetchData().then(data => {
					if (JSON.stringify(logs) !== JSON.stringify(data)) {
						setLogs(data);
					}
				});
				window.setTimeout(loop, 3000);
			};
			loop();
		}, []);
	}
	return (
		<div className={classes.section}>
			<GridContainer justify='center'>
				<GridItem xs={12} sm={12} md={8}>
					<h2 className={classes.title}> RFID Logs </h2>{' '}
				</GridItem>{' '}
				{logs.map(log => (
					<GridItem xs={12} sm={12} md={8} key={log._id}>
						<Log {...log} key={log._id}>
							{' '}
						</Log>{' '}
					</GridItem>
				))}{' '}
			</GridContainer>{' '}
		</div>
	);
};
export default Logs;
