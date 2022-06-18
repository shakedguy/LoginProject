import React from 'react';
import DefaultLayout from './layouts/default';
const User = ({ title, isLogedIn, user, headers, userData }) => {
	return (
		<DefaultLayout title={title} isLogedIn={isLogedIn} userData={userData}>
			<section>
				<div id='profile-card' className='card align-self-center shadow bg-body rounded border-0'>
					{user.PhotoURL && <img src={user.PhotoURL} className='card-img-top' alt='user photo' />}
					{!user.PhotoURL && <img id={user.Name} className='ui-avatar bg-gradient card-img-top' alt='user photo' />}
					<div className='card-body'>
						<ul className='list-group mt-0 pt-0'>
							{headers.map((header, index) => {
								return (
									<li key={index} className='list-group-item'>
										<b className='me-2'>{header} :</b> {user[header.replaceAll(' ', '')] || 'Undefined'}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</section>
		</DefaultLayout>
	);
};
export default User;
