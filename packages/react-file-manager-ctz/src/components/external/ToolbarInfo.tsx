import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box, styled, Tooltip, useMediaQuery } from '@mui/material';

import { selectSelectionSize } from '../../redux/selectors';
import CustomCheckBox from '../customize/CustomCheckBox';
import { important, makeGlobalExplorerStyles } from '../../util/styles';

const SelectedItemDetail = styled(Box)(({ theme }: any) => ({
    '&.selectedItemDetail': {
        display: 'flex',
        gap: theme.spacing(2),
        alignItems: 'center'
    },
    '& .selectCount': {
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        background: theme.palette.action.hover,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
    },
}))

export interface ToolbarInfoProps { }

export const ToolbarInfo: React.FC<ToolbarInfoProps> = React.memo(() => {

    const classes = useStyles();

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
        <div className={classes.infoContainer}>
            <Typography className={classes.infoText} variant="body1">
            {selectionSize ?? '0'} Items Selected
            </Typography>
        </div>
    );
});

const useStyles = makeGlobalExplorerStyles(theme => ({
    infoContainer: {
        height: theme.toolbar.size,
        display: 'flex',
    },
    infoText: {
        lineHeight: important(theme.toolbar.lineHeight),
        fontSize: important(theme.toolbar.fontSize),
        marginLeft: important(12),
        height: theme.toolbar.size,
    },
    extraInfoSpan: {
        marginRight: important(8),
        marginLeft: important(8),
        opacity: 0.8,
    },
    selectionSizeText: {
        color: theme.colors.textActive,
    },
    hiddenCountText: {},
}));

