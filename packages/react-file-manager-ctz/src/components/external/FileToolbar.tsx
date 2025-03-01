import React, { ReactElement, ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectToolbarItems, selectHideToolbarInfo } from '../../redux/selectors';
import { SmartToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarInfo } from './ToolbarInfo';
import { ToolbarSearch } from './ToolbarSearch';
import { Box, styled } from '@mui/material';
import MultiSelectPopup from './MultiSelectPopup';

export interface FileToolbarProps { }

export const FileToolbar: React.FC<FileToolbarProps & { children?: ReactNode; }> = React.memo((props) => {

    const { children } = props;
    const toolbarItems = useSelector(selectToolbarItems);

    const toolbarItemComponents = useMemo(() => {
        const components: ReactElement[] = [];
        // @ts-ignore
       // Extract all fileActionIds from items
       const items = toolbarItems.filter(i => i.name !== 'Actions');
    const fileActionIds = items.flatMap(item => item.fileActionIds || []);

    // Split into two categories
    const enableOptions = fileActionIds.filter(id => id.startsWith("enable"));
    const sortOptions = fileActionIds.filter(id => id.startsWith("sort"));

    if (enableOptions.length > 0) {
        components.push(
            <ToolbarDropdown key="enable-options" icon="enable" name="enable" fileActionIds={enableOptions} />
        );
    }

    // Add Sort Options Dropdown
    if (sortOptions.length > 0) {
        components.push(
            <ToolbarDropdown key="sort-options" icon="sort" name="sort" fileActionIds={sortOptions} />
        );
    }

    return components;
        return components;
    }, [toolbarItems]);

    const hideToolbarInfo = useSelector(selectHideToolbarInfo);
    
    return (
        <>
            <ToolbarWrapper className='toolbarWrapper'>
                <Box className='toolbarContainer'>
                    <Box className='toolbarLeft'>
                        <ToolbarSearch />
                        {!hideToolbarInfo && <ToolbarInfo />}
                        {children}
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
        padding: theme.spacing(2, 3),
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
        gap: theme.spacing(3)
    },
})) 
