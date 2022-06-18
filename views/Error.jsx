import React from 'react';
import DefaultLayout from './layouts/default';
const Error = ({ message }) => {
	return (
		<DefaultLayout>
			<main>
				<h1>{message}</h1>
				<img src='https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif' />
			</main>
		</DefaultLayout>
	);
};
export default Error;
