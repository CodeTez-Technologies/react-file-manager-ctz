/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Menu from '@mui/material/Menu';
import React, { useCallback, useMemo } from 'react';

import { FileActionGroup } from '../../types/action-menus.types';
import { useLocalizedFileActionGroup } from '../../util/i18n';
import { important, makeGlobalExplorerStyles } from '../../util/styles';
import { ToolbarButton, ToolbarButtonProps } from './ToolbarButton';
import { SmartToolbarDropdownButton } from './ToolbarDropdownButton';
import { styled } from '@mui/material';

export type NavbarDropdownProps = {
    name?: string;
    icon?: string;
    text?: string;
    fileActionIds: any[];  // Change from fileActionIds to items
};

export const NavbarDropdown: React.FC<NavbarDropdownProps> = React.memo((props) => {

    
    const { name, icon, fileActionIds , text} = props;
    console.log('moreAction' ,text )
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget),
        [setAnchor],
    );
    const handleClose = useCallback(() => setAnchor(null), [setAnchor]);

    const menuItemComponents = useMemo(
        () =>
            fileActionIds.map((id,index) => (
                <SmartToolbarDropdownButton key={`menu-item-${id}-${index}`} fileActionId={id} onClickFollowUp={handleClose} />
            )),
        [fileActionIds, handleClose],
    );

    const localizedName = useLocalizedFileActionGroup(name ?? '');
    const toolbarButtonProps: ToolbarButtonProps = {
        text: localizedName,
        onClick: handleClick,
        dropdown: true,
    };
    if (icon) {
        toolbarButtonProps.icon = icon;
        toolbarButtonProps.iconOnly = true;
        toolbarButtonProps.text = text ? text : '';
    }

    return (
        <>
            <ToolbarButton {...toolbarButtonProps} />
            <ActionMenu
                autoFocus
                keepMounted
                elevation={2}
                anchorEl={anchor}
                onClose={handleClose}
                open={Boolean(anchor)}
                transitionDuration={150}>
                {menuItemComponents}
            </ActionMenu>
        </>
    );
});

const ActionMenu = styled(Menu)(({theme})=>({
    marginTop : '10px',
    '& .MuiPaper-root':{
        '& .MuiList-root':{
            '& .MuiListItemText-root':{
                margin: '0px !important'
            }
        }
    }
}));


