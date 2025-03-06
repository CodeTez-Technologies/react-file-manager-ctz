/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Box from '@mui/material/Box';
import React, { ReactElement, ReactNode, useMemo } from 'react';

import { ExplorerActions } from '../../action-definitions/index';
import { important, makeGlobalExplorerStyles } from '../../util/styles';
import { useFolderChainItems } from './FileNavbar-hooks';
import { FolderChainButton } from './FolderChainButton';
import { SmartToolbarButton } from './ToolbarButton';
import { styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectHideToolbarInfo, selectToolbarItems } from '../../redux/selectors';
import MyDrive from './MyDrive';
import { NavbarDropdown } from './NavbarDropdown';
import { useStyles } from '../file-list/DnDFileEntry';

export interface FileNavbarProps {
    children?: ReactNode
}

export const FileNavbar: React.FC<FileNavbarProps> = React.memo((props) => {

    const { children } = props;

    const classes = useStyles();
    const folderChainItems = useFolderChainItems();

    const folderChainComponents = useMemo(() => {
        const components: ReactElement[] = [];
        for (let i = 0; i < folderChainItems.length; ++i) {
            const key = `folder-chain-${i}`;
            const component = (
                <FolderChainButton
                    key={key}
                    first={i === 0}
                    current={i === folderChainItems.length - 1}
                    item={folderChainItems[i]}
                />
            );
            components.push(component);
        }
        return components;
    }, [folderChainItems]);

    const navbarItems = useSelector(selectToolbarItems);

    const navbarItemComponents = useMemo(() => {
        const components: ReactElement[] = [];
        // @ts-ignore
        // Extract all fileActionIds from items
        const items = navbarItems.filter(i => i.name !== 'Actions');
        const fileActionIds = items.flatMap(item =>
            typeof item === 'string' ? [] : item.fileActionIds
        );

        // Split into two categories
        const enableOptions = fileActionIds.filter(id => id.startsWith("enable"));
        const sortOptions = fileActionIds.filter(id => id.startsWith("sort"));
        const filterOptions = fileActionIds.filter(id => id.startsWith("filter"));
        const create = fileActionIds.filter(id => !id.startsWith("sort") && !id.startsWith("enable") && !id.startsWith("filter"));

        if (enableOptions.length > 0) {
            components.push(
                <NavbarDropdown key="enable-options" icon="layout" fileActionIds={enableOptions} />
            );
        }
        if (filterOptions.length > 0) {
            components.push(
                <NavbarDropdown key="filter-options" icon="filter" fileActionIds={filterOptions} />
            );
        }

        // Add Sort Options Dropdown
        if (sortOptions.length > 0) {
            components.push(
                <NavbarDropdown key="sort-options" icon='sort' fileActionIds={sortOptions} />
            );
        }

        return (
            <>
                {create.length > 0 &&
                    <NavbarDropdown key="create" icon="plus" text='new' fileActionIds={create} />
                }
                <Box className='actionDropDown'>{components} </Box>
            </>
        )

    }, [navbarItems]);

    const hideToolbarInfo = useSelector(selectHideToolbarInfo);

    return (
        <NavbarWrapper className='navbarWrapper'>
            <Box className='navbarContainer'>
                <Box className='navbarInnerContainer'>
                    <Box className='navbarLeft'>
                        {/* <navbarSearch /> */}
                        {/* {!hideToolbarInfo && <navbarInfo />} */} 
                        {children ? children : <MyDrive />}
                    </Box>
                    <Box className='navbarRight'>{navbarItemComponents}</Box>
                </Box>
            </Box>
        </NavbarWrapper>


    );
});

const NavbarWrapper = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& .navbarContainer': {
        display: 'flex',
        padding: theme.spacing(1.5, 3),
        width: '100%',
        '& .navbarInnerContainer': {
            width: 'calc(100% - 48px)',
            maxWidth: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
        }
    },
    '& .navbarLeft': {
        display: 'flex',
        height: 'fit-content'
    },
    '& .navbarLeftFiller': {
    },
    '& .navbarRight': {
        display: 'flex',
        gap: theme.spacing(1.5),
        alignItems: 'center',
        '& .actionDropDown': {
            display: 'flex',
            gap: theme.spacing(1),
        }
    },
})) 
