import React, { ReactElement, ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Box, styled, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {selectContextMenuItems, selectSelectedFiles, selectToolbarItems } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { ExplorerDispatch } from '../../types/redux.types';
import { reduxActions } from '../../redux/reducers';

import { makeGlobalExplorerStyles } from '../../util/styles';
import { ToolbarInfo } from './ToolbarInfo';
import { SmartToolbarButton } from './ToolbarButton';
import { NavbarDropdown } from './NavbarDropdown';


const FloatingPopupBlock = styled(Box)(({ theme}) => ({
    position: "absolute",
    top: "6px",
    left: "0",
    width: `calc(100% - ${theme.spacing(6)})`,
    zIndex: 9,
    padding: theme.spacing(0 , 3),
    '& > .shadowBlock': {
        // boxShadow: 'var(--mui-customShadows-xs)',
        boxShadow:  `0px 3px 12px rgb(47 43 61 / 0.14)`,
        padding: theme.spacing(1),
        // paddingLeft: '57px',
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '.selectedItems': {
            fontSize: '12px',
            fontWeight: 500
        }
    },

    '& .actionButton':{
        display : 'flex',
        gap: theme.spacing(2)
    },
    '& .smallBtn': {
        padding: '5px 15px',
    }
}));

const CloseButton = styled(Box)(({ theme }) => ({
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

const ActionButton = styled(Box)(({ theme }) => ({
    width: '28px',
    height: '28px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    'svg': {
        width: '12px',
        height: '12px',
        fill: theme.palette.text.primary,
    },

}))

export interface FileToolbarProps { }

export const FileToolbar: React.FC<FileToolbarProps> = React.memo(() => {

    const classes = useStyles();

    const selectFileCount = useSelector(selectSelectedFiles);
    const dispatch: ExplorerDispatch = useDispatch();

    const onClose = () => {
        dispatch(reduxActions.clearSelection());
    }

    // const toolbarItems = useSelector(selectToolbarItems);

    const toolbarItems = useSelector(selectContextMenuItems);

    const requiredActions = ["copy_files", "download_files", "share_files"];

    const toolbarItemComponents = useMemo(() => {
        const directButtons: ReactElement[] = [];
        const dropdownItems: string[] = [];
    
        for (const item of toolbarItems) {
            if (typeof item === 'string') {
                    directButtons.push(
                        <SmartToolbarButton key={`toolbar-item-${item}`} fileActionId={item} />
                    );

            } else if (typeof item === 'object' && item.fileActionIds) {
                // If it's an object, add the whole group to dropdown
                item.fileActionIds.forEach(action => {
                    if (requiredActions.includes(action)) {
                        directButtons.push(
                            <SmartToolbarButton key={`toolbar-item-${action}`} fileActionId={action} />
                        );
                    } else {
                        dropdownItems.push(action);
                    }
                });
            }
        }
    
        return (
            <>
                {directButtons}
                {dropdownItems.length > 0 && (
                <NavbarDropdown key="toolbar-dropdown" name="More Actions" text='moreAction' fileActionIds={dropdownItems} />
            )}
            </>
        );
    }, [toolbarItems]);

    return (
        <Box sx={{ position: 'relative' }}>
            {selectFileCount.length !== 0 &&
                <FloatingPopupBlock className={classes.toolbarWrapper}>
                   <div className={`${classes.toolbarContainer} shadowBlock`}>
                        <div className={classes.toolbarLeft}>
                           <ToolbarInfo />      
                        </div>
                        <div className={`${classes.toolbarRight} actionButton`}>
                          {toolbarItemComponents}
                        </div>
                        <Tooltip title='Close'>
                            <CloseButton onClick={onClose}>
                                <CloseIcon />
                            </CloseButton>
                        </Tooltip>
                    </div>
                </FloatingPopupBlock>
            }
        </Box>
    );
});

const useStyles = makeGlobalExplorerStyles(theme => ({
    toolbarWrapper: {},
    toolbarContainer: {},
    toolbarLeft: {display : 'flex'},
    toolbarLeftFiller: {},
    toolbarRight: {display : 'flex'},
}));


