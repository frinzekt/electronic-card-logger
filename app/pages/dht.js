import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch'; //FETCH WORKS FOR BOTH CLIENT AND SERVER
import io from 'socket.io-client';
import absoluteUrl from 'next-absolute-url';
import dynamic from 'next/dynamic';

// PLOTLY
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
// import Plot from 'react-plotly.js';

// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
import Logs from '../components/custom/Logs';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

export default function DHT(props) {
	const classes = useStyles();

	// FILTER DATA
	const { data } = props;
	const castedData = data.reverse().map((datum) => {
		const { payload, humidity, datetime } = datum;
		return {
			temperature: parseFloat(payload),
			humidity: parseFloat(humidity),
			datetime,
		};
	});
	const filteredCastedData = castedData.filter((datum) => {
		return datum.temperature && datum.humidity;
	});

	const [sensorData, setSensorData] = useState(filteredCastedData);
	const [notificationOpen, setNotificationOpen] = useState(false);

		const allDatetime = sensorData.map((datum) => datum.datetime);
		const allHumidity = sensorData.map((datum) => datum.humidity);
		const allTemperature = sensorData.map((datum) => datum.temperature);
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
			console.log(socketURL);
			const socket = io.connect(socketURL);
			socket.on('message', handleSocketMessage);
			socket.emit('firstConnect', {});
			setSocket(socket);
		}, []);
	}

	const handleSocketMessage = (message) => {

		const {deviceName} = message
		if(deviceName === "DHT Sensor"){
			console.log(message)
			const {payload:temperature, humidity, datetime} = message
			setNotificationOpen(true);
			const newAggregatedData = [{temperature,humidity,datetime},...sensorData]
			setSensorData(newAggregatedData)
		}

	};

	return (
		<div>
			<Head>
				<title>DHT Sensor - Realtime Visualizer</title>
			</Head>
			<Snackbar
				open={notificationOpen}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				autoHideDuration={5000}
				onClose={handleClose}
			>
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
			/>
			<Parallax filter responsive image={require('assets/img/landing-bg.jpg')}>
				<div className={classes.container}>
					<GridContainer>
						<GridItem xs={12} sm={12} md={6}>
							<h1 className={classes.title}>DHT Sensor - Realtime Visualizer</h1>
							<h4>
								Internet of Things (IoT) project that involves using an POST request of digital embedded system into a web server. This
								particular interface is for a DHT Sensor.
							</h4>
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
				<div className={classes.container} style={{ textAlign: 'center' }}>
					<Plot
						data={[
							{
								x: allDatetime,
								y: allHumidity,
								type: 'scatter',
								name: 'Humidity',
								mode: 'lines+markers',
							},
							{
								x: allDatetime,
								y: allTemperature,
								type: 'scatter',
								name: 'Temperature',
								mode: 'lines+markers',
							},
						]}
						layout={{ width: '100%', title: 'DHT Sensor Data' }}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
}

DHT.getInitialProps = async ({ req }) => {
	const { origin } = absoluteUrl(req);
	const res = await fetch(`${origin}/api/dht`);
	const json = await res.json();

	// REVERSE THE DATA SO OLD THEN NEW
	return { data: json.data };
};
