import React from 'react';
import DefaultLayout from './layouts/default';

const Login = ({ title, isLogedIn, userData, firebaseConfig, isAlreadyLogedIn, admin }) => {
	return (
		<DefaultLayout title={title} isLogedIn={isLogedIn} userData={userData}>
			<header className='header-login'>
				<h3>This page is public</h3>
			</header>
			<main className='main-login'>
				<div id={'firebaseui-auth-container'}></div>
				<div id='loader'>Loading...</div>
			</main>
		</DefaultLayout>
	);
};
export default Login;
