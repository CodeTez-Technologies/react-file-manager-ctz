import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box, styled, Tooltip, useMediaQuery } from '@mui/material';

import { selectSelectionSize } from '../../redux/selectors';
import CustomCheckBox from '../customize/CustomCheckBox';
import { important, makeGlobalExplorerStyles } from '../../util/styles';

const SelectedItemDetail = styled(Box)(({ theme }: any) => ({
    '&.infoContainer': {
        display: 'flex',
        gap: theme.spacing(2),
        alignItems: 'center',
        height: theme.toolbar.size,
    },
    '& .infoText': {
        lineHeight: important(theme.toolbar.lineHeight),
        fontSize: important(theme.toolbar.fontSize),
        marginLeft: important(12),
        height: theme.toolbar.size, 
    },
}))

export interface ToolbarInfoProps { }

export const ToolbarInfo: React.FC<ToolbarInfoProps> = React.memo(() => {

    const isMobile = useMediaQuery("(max-width: 764px)");
    const selectionSize = useSelector(selectSelectionSize);

    return (
        // <SelectedItemDetail className='selectedItemDetail'>
        //     <CustomCheckBox className={'show'} checked={true} />
        //     {isMobile ? (
        //         <Tooltip title='Selected Items'>
        //             <Box className='selectCount'>{selectionSize ?? '0'}</Box>
        //         </Tooltip>
        //     ) : (
        //         <Box className='flex items-center' >
        //             <Typography variant="h6" className="selectedItems">{selectionSize ?? '0'} Items Selected</Typography>
        //         </Box>
        //     )}
        // </SelectedItemDetail>
        <SelectedItemDetail className='infoContainer'>
            <CustomCheckBox className={'show'} checked={true} />
            <Typography className='infoText' variant="body1">
            {selectionSize ?? '0'} Items Selected
            </Typography>
        </SelectedItemDetail>
    );
});



