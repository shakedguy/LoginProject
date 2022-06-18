import React from 'react';
const NavBar = ({ title, isLogedIn, userData }) => {
	return (
		<nav className={'navbar navbar-dark bg-gradient'}>
			<div className='container-fluid'>
				<div className='d-flex'>
					<button
						className='navbar-toggler add-tooltip'
						type='button'
						data-bs-toggle='offcanvas'
						data-bs-target='#main-menu-canvas'
						aria-expanded='false'
						aria-label='Toggle navigation'
						id='btn-menu'
						aria-controls='main-menu-canvas'
						title='Menu'>
						<i className='bi bi-list'></i>
					</button>
					<a
						className='link-light add-tooltip'
						href='/'
						id='nav-btn-home'
						role='button'
						aria-expanded='false'
						title='Home'>
						<i className='bi bi-house-door'></i>
					</a>
				</div>
				<h2 id='main-title' style={{ fontWeight: '600' }}>
					{title}
				</h2>

				<div className='d-flex align-items-center right-elements'>
					<a
						className='nav-link link-light active add-tooltip'
						aria-current='page'
						href={userData && userData.Admin ? '/admin/profile' : '/profile'}
						title='Profile'>
						{isLogedIn && userData && userData.PhotoURL ? (
							<img
								src={userData.PhotoURL}
								className='rounded-circle'
								alt='user photo'
								width='24'
								height='24'
								loading='lazy'
							/>
						) : (
							<i className='bi bi-person-circle'></i>
						)}
					</a>

					<a
						className='nav-link link-light active text-decoration-none add-tooltip navbar-right'
						type='button'
						id='btn-logout-toast'
						aria-current='page'
						title={isLogedIn ? 'logout' : 'login'}>
						{isLogedIn ? <i className='bi bi-box-arrow-right'></i> : <i className='bi bi-box-arrow-in-left'></i>}
					</a>

					{/* {!isLogedIn && (
						<a
							className='nav-link link-light active text-decoration-none add-tooltip navbar-right'
							id='nav-link'
							type='button'
							aria-current='page'
							href='/login'
							title='Login'>
							<i className='bi bi-box-arrow-in-left'></i>
						</a>
					)} */}
					<a
						type='button'
						className='nav-link link-light active text-decoration-none add-tooltip navbar-right'
						id='btn-dark-mode'
						title='Dark Mode'>
						<i className='bi bi-moon'></i>
					</a>
				</div>
			</div>
		</nav>
	);
};
export default NavBar;
