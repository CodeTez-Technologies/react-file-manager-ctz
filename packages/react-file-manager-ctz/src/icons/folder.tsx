import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function Icon() {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }}>
            <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="1.4142"
                version="1.1"
                viewBox="0 0 24 24"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m10 4h-6c-1.11 0-2 0.89-2 2v12c0 1.097 0.903 2 2 2h16c1.097 0 2-0.903 2-2v-10c0-1.11-0.9-2-2-2h-8l-2-2z"
                    fill="#ffb300"
                    fillRule="nonzero"
                />
                <path
                    d="m20.911 14.422c-0.44835-2.2681-2.4461-3.9758-4.8461-3.9758-1.9055 0-3.5604 1.0813-4.3846 2.6571-1.9846 0.21758-3.5274 1.8923-3.5274 3.9362a3.956 3.956 0 0 0 3.956 3.956h8.5714a3.2967 3.2967 0 0 0 3.2967 -3.2967c0-1.7406-1.3516-3.1516-3.0659-3.2769z"
                    fill="#ffecb3"
                    strokeWidth=".65934"
                />
            </svg>
        </SvgIcon>
    );
}