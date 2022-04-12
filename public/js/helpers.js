export const body = $('body').first();
export const darkModeBtn = $('#btn-dark-mode').first();

export const setLightMode = () => {
	const lables = $('.form-check-label');
	document.documentElement.setAttribute('theme', 'light');
	sessionStorage.setItem('theme', 'light');
	// body.removeClass('bg-dark');
	// body.addClass('bg-light');
	// $('.card-body').removeClass('bg-dark text-light');
	lables.removeClass('text-light').addClass('text-dark');
	// $('.form-control').removeClass('bg-dark text-light');
	// $('h1,h2,h3,h4,h5,p,li').removeClass('text-light');
	// $('#offcanvasWithBothOptions').removeClass('bg-dark text-light');
	darkModeBtn.children().remove();
	darkModeBtn.append('<i class="bi bi-moon"></i>');
	// sessionStorage.setItem('color-scheme', 'light');
};

export const setDarkMode = () => {
	const lables = $('.form-check-label');
	document.documentElement.setAttribute('theme', 'dark');
	sessionStorage.setItem('theme', 'dark');
	// body.removeClass('bg-light');
	// body.addClass('bg-dark');
	// $('.card-body').addClass('bg-dark text-light');
	lables.removeClass('text-dark').addClass('text-light');
	// $('.form-control').addClass('bg-dark text-light');
	// $('#offcanvasWithBothOptions').addClass('bg-dark text-light');
	// $('h1,h2,h3,h4,h5,p,li').addClass('text-light');
	darkModeBtn.children().remove();
	darkModeBtn.append('<i class="bi bi-brightness-high"></i>');
	// sessionStorage.setItem('color-scheme', 'dark');
};
