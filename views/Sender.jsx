import React from 'react';
import MailingList from './components/MailingList';
import Message from './components/Message';
import Schedule from './components/Schedule';
import DefaultLayout from './layouts/default';
const Sender = ({ title, userData, isLogedIn }) => {
	return (
		<DefaultLayout title={title} isLogedIn={isLogedIn} userData={userData}>
			<main>
				<div className='card align-self-center shadow border-0' id='card-sender'>
					<div className='card-body text-start'>
						<h5 className='card-title text-center'>
							<strong>Who do you want to send a message to?</strong>
						</h5>
						<form className='form mt-4 has-validation text-black' noValidate id='message-form'>
							<MailingList /> <Message /> <Schedule />
							<div className='text-center mt-4' id='btn-cont' style={{ width: '90%' }}>
								<button
									type='submit'
									className='btn btn-primary border-0 add-tooltip btn-sender'
									id='email'
									style={{ backgroundColor: '#dd4b39' }}
									role='button'
									disabled
									title='Send Email'>
									<i className='fab fa-google'></i>
								</button>

								<button
									type='submit'
									className='btn btn-primary border-0 add-tooltip'
									id='whatsapp'
									style={{ backgroundColor: '#25d366' }}
									role='button'
									disabled
									title='Send WhatsApp Message'>
									<i className='fab fa-whatsapp'></i>
								</button>
								<button
									type='submit'
									className='btn btn-primary border-0 add-tooltip'
									id='sms'
									role='button'
									disabled
									title='Send SMS'>
									<i className='fas fa-sms'></i>
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
			<footer>
				<p>
					<strong>*</strong>This page is private and protected
				</p>
			</footer>
			<div className='position-fixed bottom-0 end-0 p-3' style={{ zIndex: '11' }}>
				<div id='notification' className='toast' role='alert' aria-live='assertive' aria-atomic='true'>
					<div className='toast-header text-light' id='message-toast-header'>
						<strong className='me-auto'>New notification</strong>
						<small>Just Now</small>
						<button
							type='button'
							className='btn-close btn-close-white'
							data-bs-dismiss='toast'
							aria-label='Close'></button>
					</div>
					<div className='toast-body text-light' id='toast-text'></div>
				</div>
			</div>
		</DefaultLayout>
	);
};
export default Sender;
