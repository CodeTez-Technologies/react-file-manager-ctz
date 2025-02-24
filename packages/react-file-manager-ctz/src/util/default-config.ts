import { ExplorerActions } from '../action-definitions/index';
import { ExplorerIconPlaceholder } from '../components/internal/ExplorerIconPlaceholder';
import { FileBrowserProps } from '../types/file-browser.types';

export type ExplorerConfig = Pick<
    FileBrowserProps,
    | 'fileActions'
    | 'onFileAction'
    | 'thumbnailGenerator'
    | 'doubleClickDelay'
    | 'disableSelection'
    | 'disableDefaultFileActions'
    | 'hideToolbarInfo'
    | 'forceEnableOpenParent'
    | 'disableDragAndDrop'
    | 'disableDragAndDropProvider'
    | 'defaultSortActionId'
    | 'defaultFileViewActionId'
    | 'clearSelectionOnOutsideClick'
    | 'iconComponent'
    | 'darkMode'
    | 'i18n'
    | 'listCols'
>;

export const defaultConfig: ExplorerConfig = {
    fileActions: null,
    onFileAction: null,
    thumbnailGenerator: null,
    doubleClickDelay: 300,
    disableSelection: false,
    disableDefaultFileActions: false,
    forceEnableOpenParent: false,
    hideToolbarInfo: false,
    disableDragAndDrop: false,
    disableDragAndDropProvider: false,
    defaultSortActionId: ExplorerActions.SortFilesByName.id,
    defaultFileViewActionId: ExplorerActions.EnableListView.id,
    clearSelectionOnOutsideClick: true,
    iconComponent: ExplorerIconPlaceholder,
    darkMode: false,
    i18n: {},
    listCols: []
};

export const setExplorerDefaults = (config: Partial<ExplorerConfig>) => {
    for (const key of Object.keys(defaultConfig)) {
        if (key in config) {
            defaultConfig[key as keyof ExplorerConfig] = config[key as keyof ExplorerConfig] as any;
        }
    }
};
