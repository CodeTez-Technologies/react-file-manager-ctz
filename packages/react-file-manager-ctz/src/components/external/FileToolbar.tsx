import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { selectContextMenuItems, selectSelectedFiles } from '../../redux/selectors';
import MultiSelectPopup from './MultiSelectPopup';
import MyDrive from './MyDrive';
import { useDispatch } from 'react-redux';
import { ExplorerDispatch } from '../../types/redux.types';
import { reduxActions } from '../../redux/reducers';
import { Box } from '@mui/material';


export interface FileToolbarProps { }

export const FileToolbar: React.FC<FileToolbarProps> = React.memo(() => {

    const selectFileCount = useSelector(selectSelectedFiles);
    const dispatch: ExplorerDispatch = useDispatch();

    const onClose = ()=>{
        dispatch(reduxActions.clearSelection());
    } 

    

    return (
        <Box sx={{position: 'relative'}}>
           {selectFileCount.length !== 0 && <MultiSelectPopup onClose={onClose} />}
        </Box>
    );
});


