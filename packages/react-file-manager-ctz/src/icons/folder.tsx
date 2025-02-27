import { useTheme } from "@mui/material/styles";
import * as React from 'react';

export default function Icon() {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <g clipPath="url(#clip0_1621_25132)">
            <rect x="5" y="11" width="22" height="15" fill={`rgb(${theme.palette.primary.main} / 0.08)`} />
            <path d="M5 7L16 7.5L17 10H5V7Z" fill={theme.palette.primary.main} />
            <path d="M25.2246 9.53309H19.0305C18.7015 9.53309 18.3815 9.39809 18.1515 9.16208L15.9044 6.85402C15.3754 6.311 14.6374 6 13.8794 6H6.77615C5.2451 6 4 7.24604 4 8.77615V23.9836C4 25.5146 5.24604 26.7597 6.77615 26.7597H25.2238C26.7549 26.7597 28 25.5137 28 23.9836V12.3091C28 10.778 26.7547 9.53309 25.2246 9.53309ZM6.77618 7.60003H13.8784C14.2074 7.60003 14.5284 7.73503 14.7574 7.97103L16.2794 9.53309H5.60005V8.77608C5.60005 8.12704 6.12814 7.60003 6.77618 7.60003ZM26.4007 23.9845C26.4007 24.6336 25.8727 25.1606 25.2247 25.1606H6.77623C6.1272 25.1606 5.60018 24.6326 5.60018 23.9845V11.1332H25.2247C25.8738 11.1332 26.4008 11.6612 26.4008 12.3092L26.4007 23.9845Z" fill={theme.palette.primary.main} />
        </g>
        <defs>
            <clipPath id="clip0_1621_25132">
                <rect width="32" height="32" fill="white" />
            </clipPath>
        </defs>
    </svg>
    );
}
