import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Box, BoxProps, styled } from '@mui/material';

import { selectContextMenuItems, selectSelectedFiles, selectToolbarItems } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { ExplorerDispatch } from '../../types/redux.types';
import { reduxActions } from '../../redux/reducers';

import { makeGlobalExplorerStyles } from '../../util/styles';
import { ToolbarInfo } from './ToolbarInfo';
import { SmartToolbarButton } from './ToolbarButton';
import { NavbarDropdown } from './NavbarDropdown';
import { ToolbarCloseButton } from './ToolbarCloseButton';

const ToolbarContainer = styled(Box)<BoxProps>(({ theme }: { theme: any }) => ({
    '&.toolbarWrapper': {

    },
    '& .toolbarContainer': {

    },
    '& .toolbarLeft': {

    },
    '& .toolbarCenter': {

    },
    '& .toolbarRight': {

    },
    // position: "absolute",
    // top: "6px",
    // left: "0",
    // width: `calc(100% - ${theme.spacing(6)})`,
    // zIndex: 9,
    // padding: theme.spacing(0, 3),
    // '& > .shadowBlock': {
    //     // boxShadow: 'var(--mui-customShadows-xs)',
    //     boxShadow: `0px 3px 12px rgb(47 43 61 / 0.14)`,
    //     padding: theme.spacing(1),
    //     // paddingLeft: '57px',
    //     background: theme.palette.background.paper,
    //     borderRadius: theme.shape.borderRadius,
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     '.selectedItems': {
    //         fontSize: '12px',
    //         fontWeight: 500
    //     }
    // },

    // '& .actionButton': {
    //     display: 'flex',
    //     gap: theme.spacing(2)
    // },
    // '& .smallBtn': {
    //     padding: '5px 15px',
    // }
}));

export interface FileToolbarProps { };

export const FileToolbar: React.FC<FileToolbarProps> = React.memo(() => {

    const classes = useStyles();

    const selectFileCount = useSelector(selectSelectedFiles);
    const dispatch: ExplorerDispatch = useDispatch();

    // const toolbarItems = useSelector(selectToolbarItems);

    const toolbarItems = useSelector(selectContextMenuItems);
    console.log('toolbarItems', toolbarItems)

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
                    <NavbarDropdown key="toolbar-dropdown" name="Actions" icon='moreAction' fileActionIds={dropdownItems} />
                )}
            </>
        );
    }, [toolbarItems]);

    if (selectFileCount.length === 0) return null;

    return (
        // <ToolbarContainer className={classes.toolbarWrapper}>
        //     <div className={`${classes.toolbarContainer} shadowBlock`}>
        //         <div className={classes.toolbarLeft}>
        //             <ToolbarInfo />
        //         </div>
        //         <div className={`${classes.toolbarRight} actionButton`}>
        //             {toolbarItemComponents}
        //         </div>
        //         <ToolbarCloseButton />
        //     </div>
        // </ToolbarContainer>
        <div className={classes.toolbarWrapper}>
            <div className={classes.toolbarContainer}>
                <div className={classes.toolbarLeft}>
                    <ToolbarInfo />
                </div>
                <div className={classes.toolbarRight}>{toolbarItemComponents}</div>
                <div className={classes.toolbarRight}><ToolbarCloseButton /></div>
            </div>
        </div>
    );
});

const useStyles = makeGlobalExplorerStyles(theme => ({
    toolbarWrapper: {
        padding: 10,
    },
    toolbarContainer: {
        flexWrap: 'wrap-reverse',
        display: 'flex',
    },
    toolbarLeft: {
        paddingBottom: theme.palette.primary,
        flexWrap: 'nowrap',
        flexGrow: 10000,
        display: 'flex',

    },
    toolbarLeftFiller: {
        flexGrow: 10000,
    },
    toolbarRight: {
        paddingBottom: theme.margins.rootLayoutMargin,
        flexWrap: 'nowrap',
        display: 'flex',
        gap: 5
    },
}));


