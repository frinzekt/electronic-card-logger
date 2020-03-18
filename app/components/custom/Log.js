import React, { Fragment } from 'react';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';

import { cardTitle } from 'assets/jss/nextjs-material-kit.js';

const styles = {
	cardTitle,
	textCenter: {
		textAlign: 'center'
	},
	textRight: {
		textAlign: 'right'
	}
};

const useStyles = makeStyles(styles);

const Log = ({ _id, deviceName, type, datetime }) => {
	const classes = useStyles();
	const date = new Date(datetime);
	return (
		<div style={{ margin: 0 }}>
			<Card style={{ width: '100%' }}>
				<CardBody style={{ textAlign: 'left' }}>
					<h4 className={classes.cardTitle}>Device Name: {deviceName}</h4>
					<p>_id:{_id}</p>
					<p>Type:{type}</p>
					<p>Date:{date.toString()}</p>
				</CardBody>
			</Card>
		</div>
	);
};

export default Log;
