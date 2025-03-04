import * as React from 'react';

const AngleIcon = ({color} : {color ?: any}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
           <path d="M2.1501 4.51709L5.31954 7.68653C5.69385 8.06084 6.30635 8.06084 6.68065 7.68653L9.8501 4.51709" stroke={color ? color : 'inherit'} strokeWidth="1.2963" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
  }

  export default AngleIcon
