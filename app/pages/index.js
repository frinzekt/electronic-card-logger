import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
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
import ProductSection from 'pages-sections/LandingPage-Sections/ProductSection.js';
import TeamSection from 'pages-sections/LandingPage-Sections/TeamSection.js';
import WorkSection from 'pages-sections/LandingPage-Sections/WorkSection.js';
import Logs from './../components/custom/Logs';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
	const classes = useStyles();
	const { ...rest } = props;
	return (
		<div>
			<Head>
				<title>Electronic Card Logger</title>
			</Head>
			<Header
				color='transparent'
				routes={dashboardRoutes}
				brand='Frinze Lapuz'
				rightLinks={<HeaderLinks />}
				fixed
				changeColorOnScroll={{
					height: 400,
					color: 'white'
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
				<div className={classes.container}><Logs></Logs></div>
			</div>
			<Footer />
		</div>
	);
}
