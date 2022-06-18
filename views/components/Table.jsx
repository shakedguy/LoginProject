import React from 'react';
import Spinner from './Spinner';

const Table = ({ headers }) => {
	return (
		<table
			id='dtBasic'
			className='table table-striped table-bordered display compact table-hover table-auto table-responsive bg-gradient'
			width='100%'
			style={{ visibility: 'hidden' }}>
			<thead className='table-headers text-center'>
				<tr id={'dt-header'}>
					<th
						className='th text-center justify-content-center align-items-center align-content-center'
						style={{ minWidth: '30px', justifyItems: 'center', justifyContent: 'center' }}
						key={-1}></th>
					{headers.map((header, index) => {
						if (index === 0) {
							return (
								<th className='th text-center' key={index}>
									{header}
								</th>
							);
						}
						return (
							<th className='th text-center' key={index}>
								{header}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody id='tbody' className='table-text text-center'></tbody>
		</table>
	);
};
export default Table;
