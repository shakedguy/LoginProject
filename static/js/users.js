/* eslint-disable */
export const tableToast = $('#table-notification').first();
export const tableToastHeader = $('#table-toast-header').first();
export const tableToastText = $('#table-toast-text');
export const adminsToAdd = [];

let table = null;

export const onClickAddAdminsHandler = async () => {
	if (adminsToAdd.length) {
		return await axios.post(
			'/admin/api/admins',
			{ adminsToAdd },
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'CSRF-Token': Cookies.get('XSRF-TOKEN'),
				},
			}
		);
	} else return null;
};

export const getUsers = async (filter = false) => {
	const response = await axios.get(`/admin/api/users?filter=${filter}`);
	return response.data;
};

const displayRows = (users, headers) => {
	const rows = $('#tbody');
	rows.empty();
	rows.append(
		users.map((user, index) => {
			return `<tr key={${
				user.Id
			}} class='table-row justify-content-center' id='table-row-${index}' style="cursor: pointer" >
				<td class='td text-center justify-content-center mt-2'><input class="form-check-input table-checkbox ${
					user.Admin ? 'admin' : 'not-admin'
				}" type="checkbox" value="" id="${user.Id}"></td>${headers.map((header, index) => {
				if (header === 'PhotoURL') {
					if (user.PhotoURL) {
						return `<td key={${index}} class='td justify-content-center' style="max-width: 180px"><a class='text-center justify-content-center' href="${user.PhotoURL}"><i class='bi bi-link m-0 p-0' style="font-size: 20px"></i></a></td>`;
					} else {
						return `<td key={${index}} class='td' style="max-width: 180px"></td>`;
					}
				} else if (header === 'Admin') {
					return `<td key={${index}} class='td admins'>${
						user.Admin
							? `<i id="admin-icon-${user.Id}" class="fas fa-check text-success admin-icons"  style="font-size: 1.2rem"></i>`
							: `<i id="admin-icon-${user.Id}" class="fas fa-times text-danger admin-icons" style="font-size: 1.2rem"></i>`
					}</td>`;
				} else {
					return `<td key={${index}} class='td justify-content-center'>${user[header.replaceAll(' ', '')] || ' '}</td>`;
				}
			})}</tr>`;
		})
	);
};

export const toggleAdmin = (id, isNotAdmin, isChecked) => {
	if (isNotAdmin && isChecked && !adminsToAdd.includes(id)) {
		adminsToAdd.push(id);
	} else if (isNotAdmin && !isChecked && adminsToAdd.includes(id)) {
		adminsToAdd.splice(adminsToAdd.indexOf(id), 1);
	}
	if (adminsToAdd.length > 0) {
		$('#admin-table-btn').removeAttr('disabled');
	} else {
		$('#admin-table-btn').attr('disabled', 'disabled');
	}
};

export const updateAdminsUi = () => {
	adminsToAdd.forEach((id) => {
		$(`#admin-icon-${id}`).removeClass().addClass('fas fa-check text-success admin-icons');
		$(`#${id}`).removeClass('not-admin').addClass('admin');
	});
};

export const dataTableInit = async (tableConfigs) => {
	const { users, headers } = await getUsers(false);
	displayRows(users, headers);
	table = $('#dtBasic').DataTable(tableConfigs);
	$('.dt-buttons').css('box-shadow', 'none');
	setTableButtons();

	$('#dtBasic tbody').on('dblclick', 'tr', function () {
		const data = table.row(this).data();
		window.location.assign(`/admin/users?id=${data[1]}`);
	});
	$('#dtBasic tbody').on('click', 'tr', function () {
		const row = table.row(this).data();
		const checkboxId = $(row[0]).first().attr('id');
		const checkbox = $(`#${checkboxId}`);
		checkbox.prop('checked', !checkbox.prop('checked'));
		toggleAdmin(checkbox.prop('id'), checkbox.hasClass('not-admin'), checkbox.prop('checked'));
	});
	$('.table-checkbox').click((e) => {
		const checkbox = $(e.target);
		checkbox.prop('checked', !checkbox.prop('checked'));
	});
	$('#table-spinner').addClass('d-none');
	$('.table').css('visibility', 'visible');
};

const setTableButtons = () => {
	$('.dt-buttons > button')
		.removeClass('btn-secondary')
		.addClass('rounded-1')
		.css('margin-right', '5px')
		.css('border', 'none');
	$('.dt-buttons > .buttons-excel')
		.append('<i class="bi bi-file-earmark-excel-fill"></i>')
		.tooltip({ title: 'Export to Excel', placement: 'bottom' });
	$('.dt-buttons > .buttons-pdf')
		.append('<i class="bi bi-file-earmark-pdf-fill"></i>')
		.tooltip({ title: 'Export to PDF', placement: 'bottom' });
	$('.dt-buttons > .buttons-csv')
		.append('<i class="bi bi-filetype-csv"></i>')
		.tooltip({ title: 'Export to CSV', placement: 'bottom' });
	$('.dt-buttons > .buttons-copy')
		.append('<i class="fas fa-clone"></i>')
		.tooltip({ title: 'Copy to clipboard', placement: 'bottom' });
	$('.dt-buttons > .buttons-print')
		.append('<i class="bi bi-printer-fill"></i>')
		.tooltip({ title: 'Print', placement: 'bottom' });
};
