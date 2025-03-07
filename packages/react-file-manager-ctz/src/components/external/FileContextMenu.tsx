/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';

import { reduxActions } from '../../redux/reducers';
import { selectContextMenuConfig, selectContextMenuItems } from '../../redux/selectors';
import { getI18nId, I18nNamespace } from '../../util/i18n';
import { important, makeGlobalExplorerStyles } from '../../util/styles';
import { useContextMenuDismisser } from './FileContextMenu-hooks';
import { SmartToolbarDropdownButton } from './ToolbarDropdownButton';
import { ExplorerDispatch } from '../../types/redux.types';
import { Box, styled, useMediaQuery } from '@mui/material';

import { useParamSelector } from '../../redux/store';
import { selectFileActionData } from '../../redux/selectors';

export interface FileContextMenuProps { }

const ContextMenuItem: React.FC<{ fileActionId: string[], hideContextMenu: any , subMenuPosition: string }> = ({ fileActionId, hideContextMenu , subMenuPosition}) => {
    // Fetch all actions based on fileActionIds
    const buttonActions = fileActionId.map((id) => useParamSelector(selectFileActionData, id)).filter(Boolean);

    // Function to group by `groupType`
    const groupByType = (actions: any) => {
        return actions.reduce((acc:any, action:any) => {
          const groupType = action.button.groupType || "ungrouped";
          if (!acc[groupType]) {
            acc[groupType] = [];
          }
          acc[groupType].push(action);
          return acc;
        }, {});
      };
  
  const groupedActions = groupByType(buttonActions);

  return (
    <>
      {Object.entries(groupedActions).map(([groupType, group]) => (
        <DropDownSection key={groupType}>
          {(group as { id: string }[]).map((action:any) => (
            <SmartToolbarDropdownButton
              key={`context-menu-item-${action.id}`}
              fileActionId={action.id}
              onClickFollowUp={hideContextMenu}
              subMenuPosition={subMenuPosition}
            />
          ))}
        </DropDownSection>
      ))}
    </>
  );
};

export const FileContextMenu: React.FC<FileContextMenuProps> = React.memo(() => {
    
    const dispatch: ExplorerDispatch = useDispatch();
    const [subMenuPosition, setSubMenuPosition] = useState<string>('left');
    const isMobile = useMediaQuery("(max-width: 764px)");

    useEffect(() => {
        dispatch(reduxActions.setContextMenuMounted(true));
        return () => {
            dispatch(reduxActions.setContextMenuMounted(false));
        };
    }, [dispatch]);

    const intl = useIntl();
    const browserMenuShortcutString = intl.formatMessage(
        {
            id: getI18nId(I18nNamespace.FileContextMenu, 'browserMenuShortcut'),
            defaultMessage: 'Browser menu: {shortcut}',
        },
        { shortcut: <strong>Alt + Right Click</strong> },
    );

    const contextMenuConfig = useSelector(selectContextMenuConfig);
    const contextMenuItems = useSelector(selectContextMenuItems);

    const hideContextMenu = useContextMenuDismisser();
    const contextMenuItemComponents = useMemo(() => {
        return contextMenuItems.flatMap((item) => {
            if (typeof item === 'string') {
                return (
                    <SmartToolbarDropdownButton
                        key={`context-menu-item-${item}`}
                        fileActionId={item}
                        onClickFollowUp={hideContextMenu}
                        subMenuPosition={subMenuPosition}
                    />
                );
            } else {
                return (
                    <ContextMenuItem key={`context-menu-item-${item.name}`} fileActionId={item.fileActionIds} hideContextMenu={hideContextMenu} subMenuPosition={subMenuPosition} />
                );
            }
        });
    }, [contextMenuItems, hideContextMenu ,subMenuPosition]);
    
    
    const anchorPosition = useMemo(
        () => (contextMenuConfig ? { top: contextMenuConfig.mouseY, left: contextMenuConfig.mouseX } : undefined),
        [contextMenuConfig],
    );

    const dropdownRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (!dropdownRef.current || !anchorPosition) return;
        if (isMobile) {
            setSubMenuPosition("center");
            return;
        }
        const menuElement = dropdownRef.current.querySelector('.MuiPaper-root') as HTMLDivElement;
        if (!menuElement) return;

        const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuElement;
        let { top: newX, left: newY } = anchorPosition;
        
        newX = Math.min(newX, window.innerWidth - menuWidth);
        newY = Math.min(newY, window.innerHeight - menuHeight);
        
        setSubMenuPosition(newX + menuWidth * 2 > window.innerWidth ? 'right' : 'left');
    }, [anchorPosition]);
    
    return (
        <ActionMenu
            elevation={2}
            disablePortal
            onClose={hideContextMenu}
            transitionDuration={150}
            open={!!contextMenuConfig}
            anchorPosition={anchorPosition}
            anchorReference="anchorPosition"
            ref={dropdownRef}
        >
            {contextMenuItemComponents}
            {/* <ListSubheader component="div" className={classes.browserMenuTooltip}>
        {browserMenuShortcutString}
      </ListSubheader> */}
        </ActionMenu>
    );
});

const useStyles = makeGlobalExplorerStyles(() => ({
    contextMenuRoot: { minWidth: { md: '260px' }, maxWidth: { md: '280px' } },
    contextMenuList: {
        padding: '10px',
    },

    browserMenuTooltip: {
        lineHeight: important('30px'),
        fontSize: important('0.7em'),
    },
}));

const ActionMenu = styled(Menu)(({theme})=>({
    '& .MuiPaper-root':{
        minWidth: '280px',
        overflow: 'visible',
        // boxShadow: 'var(--mui-customShadows-md)',
        borderRadius: theme.shape.borderRadius,
        '& .MuiList-root':{
            padding: '0px',
            '& .MuiListItemText-root':{
                margin: '0px !important'
            }
        }
    }
}));

const DropDownSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1, 0),
    '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
}));