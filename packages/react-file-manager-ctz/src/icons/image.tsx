import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function Icon() {
	return (
		<SvgIcon sx={{ width: 'auto', height: 'auto' }}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path
					fill="#26A69A"
					d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m0 18h12v-8l-4 4-2-2-6 6M8 9a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"
				/>
			</svg>
		</SvgIcon>
	);
}
