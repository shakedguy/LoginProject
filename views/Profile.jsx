import React from 'react';
import DefaultLayout from './layouts/default';
const Profile = ({ title, isLogedIn, userData, isAlreadyLogedIn, headers }) => {
	return (
		<DefaultLayout title={title} isLogedIn={isLogedIn} userData={userData}>
			{userData && (
				<section>
					<div id='profile-card' className='card align-self-center shadow bg-body rounded border-0'>
						{userData.PhotoURL && <img src={userData.PhotoURL} className='card-img-top' alt='user photo' />}
						{!userData.PhotoURL && (
							<img id={userData.Name} className='ui-avatar bg-gradient card-img-top' alt='user photo' />
						)}
						<div className='card-body'>
							<ul className='list-group mt-0 pt-0'>
								{headers.map((header, index) => {
									return (
										<li key={index} className='list-group-item'>
											<p>
												<b className='me-2'>{header}: </b> {String(userData[header.replaceAll(' ', '')] || undefined)}
											</p>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</section>
			)}

			{!userData && (
				<div className='d-flex justify-content-center' style={{ width: '5rem', height: '5rem' }}>
					<div className='spinner-border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			)}
			{isAlreadyLogedIn && (
				<div className='position-absolute bottom-0 end-0 p-2' style={{ zIndex: '11' }}>
					<div
						id='already-logged-toast'
						className='toast text-light bg-gradient bg-danger border-0'
						role='alert'
						aria-live='assertive'
						aria-atomic='true'>
						<div id='already-logged-toast-header' className='toast-header text-light bg-gradient bg-danger border-0'>
							<strong className='me-auto'>New notification</strong>
							<small>Just Now</small>
							<button
								type='button'
								className='btn-close btn-close-white'
								data-bs-dismiss='toast'
								aria-label='Close'></button>
						</div>
						<div className='toast-body bg-gradient bg-danger text-light border-0' id='logged-toast-text'>
							You have already logged in
						</div>
					</div>
				</div>
			)}
			<footer>
				<p>
					<strong>*</strong>This page is private and protected
				</p>
			</footer>
		</DefaultLayout>
	);
};
export default Profile;
