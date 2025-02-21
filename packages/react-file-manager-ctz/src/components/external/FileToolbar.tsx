import React, { ReactElement, ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectToolbarItems, selectHideToolbarInfo } from '../../redux/selectors';
import { makeGlobalExplorerStyles } from '../../util/styles';
import { SmartToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarInfo } from './ToolbarInfo';
import { ToolbarSearch } from './ToolbarSearch';

export interface FileToolbarProps { }

export const FileToolbar: React.FC<FileToolbarProps & { children?: ReactNode; }> = React.memo((props) => {
    const { children } = props;
    const classes = useStyles();
    const toolbarItems = useSelector(selectToolbarItems);

    const toolbarItemComponents = useMemo(() => {
        const components: ReactElement[] = [];
        // @ts-ignore
        const items = toolbarItems.filter(i => i.name !== 'Actions');

        for (let i = 0; i < items.length; ++i) {
            const item = items[i];

            const key = `toolbar-item-${typeof item === 'string' ? item : item.name}`;
            const component =
                typeof item === 'string' ? (
                    <SmartToolbarButton key={key} fileActionId={item} />
                ) : (
                    <ToolbarDropdown key={key} {...item} />
                );
            components.push(component);
        }
        return components;
    }, [toolbarItems]);

    const hideToolbarInfo = useSelector(selectHideToolbarInfo);
    
    return (
        <div className={classes.toolbarWrapper}>
            <div className={classes.toolbarContainer}>
                <div className={classes.toolbarLeft}>
                    <ToolbarSearch />
                    {!hideToolbarInfo && <ToolbarInfo />}
                    {children}
                </div>
                <div className={classes.toolbarRight}>{toolbarItemComponents}</div>
            </div>
        </div>
    );
});

const useStyles = makeGlobalExplorerStyles((theme) => ({
    toolbarWrapper: {},
    toolbarContainer: {
        flexWrap: 'wrap-reverse',
        display: 'flex',
        padding: '15px'
    },
    toolbarLeft: {
        paddingBottom: theme.margins.rootLayoutMargin,
        flexWrap: 'wrap',
        flexGrow: 10000,
        display: 'flex',
    },
    toolbarLeftFiller: {
        flexGrow: 10000,
    },
    toolbarRight: {
        paddingBottom: theme.margins.rootLayoutMargin,
        flexWrap: 'wrap',
        display: 'flex',
    },
}));
