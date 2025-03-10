import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function Icon() {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }}>
            <svg
                version="1.1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m13 9h5.5l-5.5-5.5v5.5m-7-7h8l6 6v12a2 2 0 0 1 -2 2h-12c-1.11 0-2-.9-2-2v-16c0-1.11.89-2 2-2m9 16v-2h-9v2h9m3-4v-2h-12v2h12z"
                    fill="#DDDDDD"
                />
            </svg>
        </SvgIcon>
    );
}
