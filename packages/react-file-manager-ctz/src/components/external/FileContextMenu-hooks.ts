import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nullable } from 'tsdef';

import { ExplorerActions } from '../../action-definitions/index';
import { reduxActions } from '../../redux/reducers';
import { selectContextMenuMounted } from '../../redux/selectors';
import { thunkRequestFileAction } from '../../redux/thunks/dispatchers.thunks';
import { ExplorerDispatch } from '../../types/redux.types';
import { findElementAmongAncestors } from '../../util/helpers';
import { useInstanceVariable } from '../../util/hooks-helpers';

export const findClosestExplorerFileId = (element: HTMLElement | any): Nullable<string> => {
    const fileEntryWrapperDiv = findElementAmongAncestors(
        element,
        (element: any) =>
            element.tagName && element.tagName.toLowerCase() === 'div' && element.dataset && element.dataset.explorerFileId,
    );
    return fileEntryWrapperDiv ? fileEntryWrapperDiv.dataset.explorerFileId! : null;
};

export const useContextMenuTrigger = () => {

    const dispatch: ExplorerDispatch = useDispatch();
    const contextMenuMountedRef = useInstanceVariable(useSelector(selectContextMenuMounted));

    return useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        // Use default browser context menu when Explorer context menu component
        // is not mounted.
        if (!contextMenuMountedRef.current) return;
        // Users can use Alt+Right Click to bring up browser's default
        // context menu instead of Explorer's context menu.
        if (event.altKey) return;

        event.preventDefault();

        const triggerFileId = findClosestExplorerFileId(event.target);
        dispatch(
            thunkRequestFileAction(ExplorerActions.OpenFileContextMenu, {
                clientX: event.clientX,
                clientY: event.clientY,
                triggerFileId,
            }),
        );
    }, [contextMenuMountedRef, dispatch]);
};

export const useContextMenuDismisser = () => {

    const dispatch: ExplorerDispatch = useDispatch();

    return useCallback(() => dispatch(reduxActions.hideContextMenu()), [dispatch]);
};
