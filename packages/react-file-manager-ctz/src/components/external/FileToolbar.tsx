import React, { ReactElement, ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectToolbarItems, selectHideToolbarInfo } from '../../redux/selectors';
import { SmartToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarInfo } from './ToolbarInfo';
import { ToolbarSearch } from './ToolbarSearch';
import { Box, Button, styled } from '@mui/material';
import MultiSelectPopup from './MultiSelectPopup';
import MyDrive from './MyDrive';

export interface FileToolbarProps { }

export const FileToolbar: React.FC<FileToolbarProps & { children?: ReactNode; }> = React.memo((props) => {

    const { children } = props;

    const toolbarItems = useSelector(selectToolbarItems);

    const toolbarItemComponents = useMemo(() => {
        const components: ReactElement[] = [];
        // @ts-ignore
    // Extract all fileActionIds from items
    const items = toolbarItems.filter(i => i.name !== 'Actions');
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
            <ToolbarDropdown key="enable-options" icon="layout" fileActionIds={enableOptions} />
        );
    }
    if (filterOptions.length > 0) {
        components.push(
            <ToolbarDropdown key="filter-options" icon="filter" fileActionIds={filterOptions} />
        );
    }

    // Add Sort Options Dropdown
    if (sortOptions.length > 0) {
        components.push(
            <ToolbarDropdown key="sort-options" icon='sort' fileActionIds={sortOptions} />
        );
    }

    return (
        <>
           {create.length > 0 && 
               <ToolbarDropdown key="create" icon="plus" text='new' fileActionIds={create} />
           }
          <Box className='actionDropDown'>{ components } </Box>
        </>
    )

    }, [toolbarItems]);

    const hideToolbarInfo = useSelector(selectHideToolbarInfo);
    
    return (
        <>
            <ToolbarWrapper className='toolbarWrapper'>
                <Box className='toolbarContainer'>
                    <Box className='toolbarLeft'>
                        {/* <ToolbarSearch /> */}
                        {/* {!hideToolbarInfo && <ToolbarInfo />} */}
                        {children ? children : <MyDrive/>}
                    </Box>
                    <Box className='toolbarRight'>{toolbarItemComponents}</Box>
                </Box>
            </ToolbarWrapper>
        </>
    );
});

const ToolbarWrapper = styled(Box)(({theme})=>({
     borderBottom : `1px solid ${theme.palette.divider}`,
    '& .toolbarContainer':{
        flexWrap: 'wrap-reverse',
        display: 'flex',
        padding: theme.spacing(1.5, 3),
        alignItems: 'center',
        justifyContent : 'space-between',
    },
    '& .toolbarLeft': {
        display: 'flex',
        height: 'fit-content'
    },
    '& .toolbarLeftFiller': {
    },
    '& .toolbarRight': {
        display: 'flex',
        gap: theme.spacing(2),
        '& .actionDropDown':{
            display: 'flex',
            gap: theme.spacing(1),
        }
    },
})) 
