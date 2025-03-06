
import React from 'react'

import { Box, styled } from '@mui/material'
// Icons
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CustomBreadcrumb from '../customize/CustomBreadcrumb';

const MyDrive = () => {
  return (
      <MyDriveBlock>
            <IconGroup>
                <AccountTreeOutlinedIcon />
            </IconGroup>
            <CustomBreadcrumb path={'newone\\newone\\newone\\Interview\\Resume Management\\digital Marketing'}/>
      </MyDriveBlock>
  )
}

export default MyDrive

const MyDriveBlock = styled(Box)(({theme}) => ({
    display : 'flex',
    alignItems : 'center',
    gap: theme.spacing(2),

}))


const IconGroup = styled(Box)(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    padding: '5px 15px',
    display: 'flex',
    width: 'fit-content',
    fontSize: '14px',
    '&:hover , &:focus': {
        color:  theme.palette.primary.main,
    }
}))    
