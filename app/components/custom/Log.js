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
		textAlign: 'center',
	},
	textRight: {
		textAlign: 'right',
	},
};

const useStyles = makeStyles(styles);

const Log = (props) => {
	const classes = useStyles();

	const { _id, deviceName, type, datetime, ...rest } = props;
	delete rest.children;
	delete rest.updatedAt;
	delete rest.__v;

	const date = new Date(datetime);
	return (
		<div style={{ margin: 0 }}>
			<Card style={{ width: '100%' }}>
				<CardBody style={{ textAlign: 'left' }}>
					<h4 className={classes.cardTitle}>Device Name: {deviceName}</h4>
					<p>_id:{_id}</p>
					<p>Type:{type}</p>
					<p>Date:{date.toString()}</p>
					<br />
					<p>
						<strong>Additional Data</strong>
					</p>
					{Object.entries(rest).map(([key, value]) => (
						<p>{`${key}:${value}`}</p>
					))}
				</CardBody>
			</Card>
		</div>
	);
};

export default Log;
