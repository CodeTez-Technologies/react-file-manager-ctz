/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';

import { selectHiddenFileCount, selectors, selectSelectionSize } from '../../redux/selectors';
import { getI18nId, I18nNamespace } from '../../util/i18n';
import { important, makeGlobalExplorerStyles } from '../../util/styles';
import { Box, styled, Tooltip, useMediaQuery } from '@mui/material';
import CustomCheckBox from '../customize/CustomCheckBox';

const SelectedItemDetail = styled(Box)(({theme})=>({
    '&.selectedItemDetail':{
        display : 'flex',
        gap: theme.spacing(2),
        alignItems : 'center'
    },
    '& .selectCount':{
        width : '25px',
        height: '25px',
        borderRadius : '50%',
        background : theme.palette.action.hover,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
    }, 
}))

export interface ToolbarInfoProps { }

export const ToolbarInfo: React.FC<ToolbarInfoProps> = React.memo(() => {

    const displayFileIds = useSelector(selectors.getDisplayFileIds);
    const selectionSize = useSelector(selectSelectionSize);
    const hiddenCount = useSelector(selectHiddenFileCount);

    const intl = useIntl();

    const isMobile = useMediaQuery("(max-width: 764px)");

    // const fileCountString = intl.formatMessage(
    //     {
    //         id: getI18nId(I18nNamespace.Toolbar, 'visibleFileCount'),
    //         defaultMessage: `{fileCount, plural,
    //             =0 {# items}
    //             one {# item}
    //             other {# items}
    //         }`,
    //     },
    //     { fileCount: displayFileIds.length },
    // );
    // const selectedString = intl.formatMessage(
    //     {
    //         id: getI18nId(I18nNamespace.Toolbar, 'selectedFileCount'),
    //         defaultMessage: `{fileCount, plural,
    //             =0 {}
    //             other {# selected}
    //         }`,
    //     },
    //     { fileCount: selectionSize },
    // );
    // const hiddenString = intl.formatMessage(
    //     {
    //         id: getI18nId(I18nNamespace.Toolbar, 'hiddenFileCount'),
    //         defaultMessage: `{fileCount, plural,
    //             =0 {}
    //             other {# hidden}
    //         }`,
    //     },
    //     { fileCount: hiddenCount },
    // );

    return (
        <SelectedItemDetail className='selectedItemDetail'>
            <CustomCheckBox
                className={'show'}
                checked={true} />
            {
                isMobile ?
                    <Tooltip title='Selected Items'>
                        <Box className='selectCount'>{selectionSize ?? '0'}</Box>
                    </Tooltip>
                    :
                    <Box className='flex items-center' >
                        <Typography variant="h6" className="selectedItems">{selectionSize ?? '0'} Items Selected</Typography>
                    </Box>
            }
        </SelectedItemDetail>
    );
});

