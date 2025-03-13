import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box, styled, useMediaQuery } from '@mui/material';

import { selectSelectionSize } from '../../redux/selectors';
import CustomCheckBox from '../customize/CustomCheckBox';
import { important } from '../../util/styles';

const ToolbarInfoContainer = styled(Box)(({ theme }: any) => ({
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
}));

export interface ToolbarInfoProps { }

export const ToolbarInfo: React.FC<ToolbarInfoProps> = React.memo(() => {

    const isMobile = useMediaQuery("(max-width: 764px)");
    const selectionSize = useSelector(selectSelectionSize);

    return (
        <ToolbarInfoContainer className='infoContainer'>
            <CustomCheckBox className={'show'} checked={true} />
            <Typography className='infoText' variant="body1">
                {selectionSize ?? '0'} Items Selected
            </Typography>
        </ToolbarInfoContainer>
    );
});