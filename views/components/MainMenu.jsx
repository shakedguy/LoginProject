import React from 'react';
import NavBar from './NavBar';
const MainMenu = ({ title, isLogedIn, userData }) => {
	return (
		<>
			<NavBar title={title} isLogedIn={isLogedIn} userData={userData} />
			<div
				className='offcanvas offcanvas-start rounded-end'
				data-bs-scroll='true'
				tabIndex={-1}
				id='main-menu-canvas'
				aria-labelledby='main-menu-Label'>
				<div className='offcanvas-header'>
					<h5 className='offcanvas-title ms-1' id='main-menu-Label'>
						Menu
					</h5>
					{/* <i class="bi bi-arrow-right" id="arrow-forward" data-bs-dismiss="offcanvas" aria-label="Close"></i> */}
					<i className='bi bi-caret-right' id='arrow-forward' data-bs-dismiss='offcanvas' aria-label='Close'></i>
				</div>
				<div className='offcanvas-body '>
					<ul className='navbar-nav' id='main-menu' />
				</div>
			</div>
		</>
	);
};
export default MainMenu;
