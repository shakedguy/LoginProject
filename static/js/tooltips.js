export const tooltipsInit = () => {
	if (window.matchMedia('only screen and (min-width: 768px)').matches) {
		$('.add-tooltip').tooltip({ placement: 'bottom', trigger: 'hover' });
	}
};
