import * as React from 'react';

const DownloadIcon = ({ color }: { color: any }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.37145 3.02781V7.2895C6.37145 7.57218 6.14124 7.80342 5.85855 7.80342H4.93053L7.15017 10.4897L9.39641 7.80342H8.4363C8.14904 7.80342 7.92086 7.57014 7.92086 7.2895L7.9234 3.02781H6.37145ZM1.68091 13.9995C1.39721 13.9995 1.16699 13.7693 1.16699 13.4851V11.7441C1.16699 11.4599 1.39721 11.2297 1.68091 11.2297C1.96462 11.2297 2.19483 11.4599 2.19483 11.7441V12.9706H12.1422V11.7441C12.1422 11.4609 12.3714 11.2317 12.6541 11.2317C12.9368 11.2317 13.167 11.4609 13.167 11.7441V13.4851C13.167 13.7678 12.9368 13.9995 12.6541 13.9995H1.68091ZM8.43632 2.00151C8.719 2.00151 8.9482 2.23071 8.9482 2.5139V6.77559L10.495 6.77661C10.6122 6.77661 10.7288 6.81583 10.8256 6.8963C11.0426 7.07813 11.0711 7.40207 10.8888 7.61957L7.55362 11.6093C7.33869 11.8741 6.95719 11.8711 6.75193 11.6215L3.45957 7.63687C3.15091 7.28135 3.41322 6.77609 3.84005 6.77609H5.34671V2.55926C5.33958 2.41257 5.37167 2.29492 5.46488 2.18388C5.55911 2.07131 5.69968 2 5.85859 2L8.43641 2.00204L8.43632 2.00151Z" fill={color} />
        </svg>
    )
}

export default DownloadIcon
