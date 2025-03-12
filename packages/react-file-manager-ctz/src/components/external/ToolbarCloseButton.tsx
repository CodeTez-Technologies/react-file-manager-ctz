import React from 'react';

import { Box, styled, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';

import { ExplorerDispatch } from '../../types/redux.types';
import { reduxActions } from '../../redux/reducers';

const CloseButton = styled(Box)(({ theme }: any) => ({
    border: `1px solid ${theme.palette.error.main}`,
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    cursor: 'pointer',
    '& svg': {
        fill: theme.palette.error.main,
        width: '16px',
        height: '16px'
    }
}));

export interface ToolbarCloseButtonProps { };

export const ToolbarCloseButton: React.FC<ToolbarCloseButtonProps> = React.memo(() => {

    const dispatch: ExplorerDispatch = useDispatch();

    const onClose = () => {
        dispatch(reduxActions.clearSelection());
    }

    return (
        <Tooltip title='Close'>
            <CloseButton onClick={onClose}>
                <CloseIcon />
            </CloseButton>
        </Tooltip>
    );
});