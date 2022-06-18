import React from 'react';
import Table from './components/Table';
import DefaultLayout from './layouts/default';
const Users = ({ title, isLogedIn, userData, headers }) => {
	return (
		<DefaultLayout title={title} isLogedIn={isLogedIn} userData={userData}>
			<main id='table-main'>
				<div className='card shadow rounded m-0 p-0 w-100 border-0 bg-gradient' id='card-table'>
					<div
						className='card-body text-start align-content-center align-items-center justify-content-center'
						style={{ minHeight: '30rem' }}>
						<div className='d-flex justify-content-center align-self-center' id='table-spinner'>
							<div className='spinner-border' role='status'>
								<span className='visually-hidden'>Loading...</span>
							</div>
						</div>
						<Table headers={headers} />
					</div>
					<div className='card-footer border-0 bg-body d-flex flex-row justify-content-end'>
						<button id='admin-table-btn' type='button' className='btn btn-primary' disabled>
							Define As Admin
						</button>
						<button type='button' id='refresh-btn' className='btn btn-primary' onClick={() => window.location.reload()}>
							Refresh
						</button>
					</div>
				</div>
				<div className='position-fixed bottom-0 end-0 p-3' style={{ zIndex: '11' }}>
					<div
						id='table-notification'
						className='toast bg-danger bg-primary'
						role='alert'
						aria-live='assertive'
						aria-atomic='true'>
						<div className='toast-header text-light bg-danger bg-primary' id='table-toast-header'>
							<strong className='me-auto'>New notification</strong>
							<small>Just Now</small>
							<button
								type='button'
								className='btn-close btn-close-white'
								data-bs-dismiss='toast'
								aria-label='Close'></button>
						</div>
						<div className='toast-body text-light' id='table-toast-text'></div>
					</div>
				</div>
			</main>
		</DefaultLayout>
	);
};
export default Users;
