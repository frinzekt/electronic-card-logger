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

const Alert = (props) => {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Logs = ({ logs }) => {
	const classes = useStyles();


	// HANDLE DATA UPDATE NOTIFICATION

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

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
				{logs.map((log) => (
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
