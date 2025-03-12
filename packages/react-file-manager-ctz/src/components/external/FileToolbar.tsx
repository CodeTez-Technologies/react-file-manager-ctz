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
        padding: theme.spacing(1.5 , 3),
        borderBottom: `1px solid ${theme.palette.divider}`,

        '& .toolbarContainer': {
            display: 'flex',
            justifyContent: 'space-between'
        },
        '& .toolbarLeft': {
            paddingBottom: theme.palette.primary,
            flexWrap: 'nowrap',
            display: 'flex',
        },
        '& .toolbarCenter': {
            display: 'flex',
            gap: theme.spacing(1.5),
        },
        '& .toolbarRight': {
            display: 'flex',
            alignItems:'center'
        },
    },
}));

export interface FileToolbarProps { };

export const FileToolbar: React.FC<FileToolbarProps> = React.memo(() => {

    const selectFileCount = useSelector(selectSelectedFiles);
    const dispatch: ExplorerDispatch = useDispatch();

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
                    <NavbarDropdown key="toolbar-dropdown" name="Actions" icon='moreAction' fileActionIds={dropdownItems} />
                )}
            </>
        );
    }, [toolbarItems]);

    if (selectFileCount.length === 0) return null;

    return (
        <ToolbarContainer className={'toolbarWrapper'}>
            <div className={'toolbarContainer'}>
                <div className={'toolbarLeft'}>
                    <ToolbarInfo />
                </div>
                <div className={'toolbarCenter'}>{toolbarItemComponents}</div>
                <div className={'toolbarRight'}><ToolbarCloseButton /></div>
            </div>
        </ToolbarContainer>
    );
});

// const useStyles = makeGlobalExplorerStyles(theme => ({
//     toolbarWrapper: {
//         padding: 10,
//     },
//     toolbarContainer: {
//         flexWrap: 'wrap-reverse',
//         display: 'flex',
//     },
//     toolbarLeft: {
//         paddingBottom: theme.palette.primary,
//         flexWrap: 'nowrap',
//         flexGrow: 10000,
//         display: 'flex',

//     },
//     toolbarLeftFiller: {
//         flexGrow: 10000,
//     },
//     toolbarRight: {
//         paddingBottom: theme.margins.rootLayoutMargin,
//         flexWrap: 'nowrap',
//         display: 'flex',
//         gap: 5
//     },
// }));


