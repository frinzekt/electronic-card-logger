import React, { Fragment } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import Log from './Log';

import styles from 'assets/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js';

const useStyles = makeStyles(styles);

const Logs = ({ logs }) => {
	const classes = useStyles();
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
