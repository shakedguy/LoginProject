export const body = $('body').first();
export const darkModeBtn = $('#btn-dark-mode').first();

export const setLightMode = () => {
	const lables = $('.form-check-label');
	document.documentElement.setAttribute('theme', 'light');
	sessionStorage.setItem('theme', 'light');
	lables.removeClass('text-light').addClass('text-dark');
	darkModeBtn.children().remove();
	darkModeBtn.append('<i class="bi bi-moon"></i>');
};

export const setDarkMode = () => {
	const lables = $('.form-check-label');
	document.documentElement.setAttribute('theme', 'dark');
	sessionStorage.setItem('theme', 'dark');
	lables.removeClass('text-dark').addClass('text-light');
	darkModeBtn.children().remove();
	darkModeBtn.append('<i class="bi bi-brightness-high"></i>');
};
