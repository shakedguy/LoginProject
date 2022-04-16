/* eslint-disable */
export const getUsers = async () => {
	const responseJson = await fetch('/admin/api/contacts');
	const response = await responseJson.json();
	return response.data.contacts;
};

export const dataTableInit = () => {
	const table = $('#dtBasic').DataTable({
		dom: 'SfBrtip',
		tableTools: {
			sSwfPath: '/swf/copy_csv_xls_pdf.swf',
		},
		pageLength: 5,
		colReorder: true,
		scrollX: true,
		buttons: {
			buttons: [
				{
					extend: 'copyHtml5',
					text: '',
					filename: 'Users Database',
					className: 'btn btn-outline-secondary ',
					exportOptions: {
						columns: ':visible',
					},
				},
				{
					extend: 'print',
					text: '',
					filename: 'Users Database',
					className: 'btn btn-outline-secondary',
					exportOptions: {
						columns: ':visible',
					},
				},
				{
					extend: 'csvHtml5',
					text: '',
					filename: 'Users Database',
					className: 'btn btn-outline-success',
					exportOptions: {
						columns: ':visible',
					},
				},
				{
					extend: 'excelHtml5',
					text: '',
					filename: 'Users Database',
					className: 'btn btn-outline-success',
					exportOptions: {
						columns: ':visible',
					},
				},
				{
					extend: 'pdfHtml5',
					text: '',
					filename: 'Users Database',
					className: 'btn btn-outline-danger',
					exportOptions: {
						columns: ':visible',
					},
				},
			],
		},
	});
	$('.dt-buttons').css('box-shadow', 'none');
	const exportsBtn = $('.dt-buttons > button');
	exportsBtn.removeClass('btn-secondary').addClass('rounded-1').css('margin-right', '5px').css('border', 'none');
	const excelBtn = $('.dt-buttons > .buttons-excel');
	const pdfBtn = $('.dt-buttons > .buttons-pdf');
	const csvBtn = $('.dt-buttons > .buttons-csv');
	const copyBtn = $('.dt-buttons > .buttons-copy');
	const printBtn = $('.dt-buttons > .buttons-print');
	excelBtn
		.append('<i class="bi bi-file-earmark-excel-fill"></i>')
		.tooltip({ title: 'Export to Excel', placement: 'bottom' });
	pdfBtn.append('<i class="bi bi-file-earmark-pdf-fill"></i>').tooltip({ title: 'Export to PDF', placement: 'bottom' });
	csvBtn.append('<i class="bi bi-filetype-csv"></i>').tooltip({ title: 'Export to CSV', placement: 'bottom' });
	copyBtn.append('<i class="fas fa-clone"></i>').tooltip({ title: 'Copy to clipboard', placement: 'bottom' });
	printBtn.append('<i class="bi bi-printer-fill"></i>').tooltip({ title: 'Print', placement: 'bottom' });
	//<i class="fas fa-clone"></i>

	$('#dtBasic tbody').on('dblclick', 'tr', function () {
		const data = table.row(this).data();
		window.location.assign(`/admin/users?uid=${data[1]}`);
	});
};

const providerId = $('#providerId').first();

if (providerId.length > 0) {
	let text = providerId.text().trim();
	text = text.split('.')[0];
	const newText = text.charAt(0).toUpperCase() + text.slice(1);
	providerId.text(newText);
}
