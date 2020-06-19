import React, { Fragment, useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Log from './Log';

import styles from 'assets/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js';
const useStyles = makeStyles(styles);

const Alert = props => {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Logs = () => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [logs, setLogs] = useState([]);

	// HANDLE DATA UPDATE NOTIFICATION

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	// DATA RENDERING
	const origin = typeof window !== 'undefined' ? window.location.origin : false;
	if (origin) {
		useEffect(() => {
			async function fetchData() {
				let response = await fetch(`${origin}/api/log`);
				response = await response.json();
				return response.data;
			}
			const timer = setTimeout(() => {
				fetchData().then(data => {
					if (JSON.stringify(logs) !== JSON.stringify(data)) {
						setLogs(data);
					}
				});
			}, 3000);
			return () => {
				clearTimeout(timer);
			};
		}, [logs]);
	}
	return (
		<div className={classes.section}>
			{' '}
			{/* <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
							<Alert onClose={handleClose} severity='success'>
								This is a success message!
							</Alert>
						</Snackbar> */}{' '}
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
