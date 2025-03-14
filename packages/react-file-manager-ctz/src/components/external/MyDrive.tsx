
import React from 'react';

import { Box, styled, Theme } from '@mui/material';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CustomBreadCrumb from '../customize/CustomBreadCrumb';

export const MyDrive = ({ breadcrumb }: { breadcrumb: any }) => {
    return (
        <MyDriveBlock>
            <IconGroup>
                <AccountTreeOutlinedIcon />
            </IconGroup>
            <CustomBreadCrumb path={breadcrumb} />
        </MyDriveBlock>
    );
}

const MyDriveBlock = styled(Box)(({ theme }: { theme: any }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2), // Ensure theme.spacing is properly typed
}));

const IconGroup = styled(Box)(({ theme }: { theme: Theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    padding: '5px 15px',
    display: 'flex',
    width: 'fit-content',
    fontSize: '14px',
    '&:hover , &:focus': {
        color: theme.palette.primary.main,
    }
})); 
