import { ExplorerActions } from '../action-definitions/index';
import { RootState } from '../types/redux.types';
import { SortOrder } from '../types/sort.types';

export const initialRootState: RootState = {
    instanceId: 'EXPLORER_INVALID_ID', // should be overwritten by preloaded state

    externalFileActionHandler: null,

    rawFileActions: [],
    fileActionsErrorMessages: [],
    fileActionMap: {},
    fileActionIds: [],
    toolbarItems: [],
    contextMenuItems: [],

    rawFolderChain: null,
    folderChainErrorMessages: [],
    folderChain: [],

    rawFiles: [],
    filesErrorMessages: [],
    fileMap: {},
    fileIds: [],
    cleanFileIds: [],

    sortedFileIds: [],
    hiddenFileIdMap: {},

    focusSearchInput: null,
    searchString: '',
    searchMode: 'currentFolder',

    selectionMap: {},
    disableSelection: false,

    fileViewConfig: ExplorerActions.EnableGridView.fileViewConfig,

    sortActionId: null,
    sortOrder: SortOrder.ASC,

    optionMap: {},

    thumbnailGenerator: null,
    doubleClickDelay: 300,
    disableDragAndDrop: false,
    clearSelectionOnOutsideClick: true,
    forceEnableOpenParent: false,
    hideToolbarInfo: false,

    lastClick: null,

    contextMenuMounted: false,
    contextMenuConfig: null,

    listCols: [],
};
