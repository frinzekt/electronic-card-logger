import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch'; //FETCH WORKS FOR BOTH CLIENT AND SERVER
import io from 'socket.io-client';
import dynamic from 'next/dynamic';

// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import Snackbar from '@material-ui/core/Snackbar';
const MuiAlert = dynamic(() => import('@material-ui/lab/Alert'));
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import Head from 'next/head';
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';

import styles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';

// Sections for this page
import Logs from './../components/custom/Logs';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

export default function LandingPage(props) {
	const classes = useStyles();
	const { ...rest } = props;

	const [logs, setLogs] = useState(props.logs);
	const [notificationOpen, setNotificationOpen] = useState(true);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setNotificationOpen(false);
	};

	//SOCKET RECEIVER COMMUNICATION - Only Available in CSR
	const [socket, setSocket] = useState();
	const origin = typeof window !== 'undefined' ? window.location.origin : false;
	if (origin) {
		useEffect(() => {
			const socketURL = process.env.socketURL;
			const socket = io(`${socketURL}`);
			socket.on('message', handleSocketMessage);
			socket.emit('firstConnect', {});
			setSocket(socket);
		}, []);
	}

	const handleSocketMessage = (message) => {
		console.log(message);
		const newLogs = [...logs, message];
		setLogs(newLogs);
	};
	return (
		<div>
			<Head>
				<title>Electronic Card Logger</title>
			</Head>
			<Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success'>
					New Data Arrived
				</Alert>
			</Snackbar>
			<Header
				color='transparent'
				routes={dashboardRoutes}
				brand='Frinze Lapuz'
				rightLinks={<HeaderLinks />}
				fixed
				changeColorOnScroll={{
					height: 400,
					color: 'white',
				}}
				{...rest}
			/>
			<Parallax filter responsive image={require('assets/img/landing-bg.jpg')}>
				<div className={classes.container}>
					<GridContainer>
						<GridItem xs={12} sm={12} md={6}>
							<h1 className={classes.title}>Electronic Card Logger</h1>
							<h4>Internet of Things (IoT) project that involves using an POST request of digital embedded system into a web server</h4>
							<br />
							{/* <Button
								color='danger'
								size='lg'
								href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim'
								target='_blank'
								rel='noopener noreferrer'
							>
								<i className='fas fa-play' />
								Watch video
							</Button> */}
						</GridItem>
					</GridContainer>
				</div>
			</Parallax>
			<div className={classNames(classes.main, classes.mainRaised)}>
				<div className={classes.container}>
					<Logs logs={logs}></Logs>
				</div>
			</div>
			<Footer />
		</div>
	);
}

LandingPage.getInitialProps = async () => {
	const origin = process.env.origin;
	const res = await fetch(`${origin}/api/log`);
	const json = await res.json();
	return { logs: json.data };
};
