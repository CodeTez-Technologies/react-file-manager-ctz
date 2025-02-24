import { GenericFileActionHandler, MapFileActionsToData } from './types/action-handler.types';
import { ExplorerActionUnion } from './types/file-browser.types';

export { FileBrowser } from './components/external/FileBrowser';
export { FileNavbar } from './components/external/FileNavbar';
export { FileToolbar } from './components/external/FileToolbar';
export { FileList } from './components/file-list/FileList';
export { FileContextMenu } from './components/external/FileContextMenu';
export { FullFileBrowser } from './components/external/FullFileBrowser';

export { ExplorerActions, DefaultFileActions, OptionIds } from './action-definitions';
export { defineFileAction } from './util/helpers';

export { ExplorerIconContext } from './util/icon-helper';
export { makeGlobalExplorerStyles, type ExplorerTheme } from './util/styles';

export { FileHelper } from './util/file-helper';
export { FileData, FileArray } from './types/file.types';
export { FileAction, FileActionEffect, FileSelectionTransform, FileActionButton, CustomVisibilityState } from './types/action.types';
export type {
    GenericFileActionHandler,
    MapFileActionsToData,
    FileActionData,
    FileActionState,
} from './types/action-handler.types';
export type { ExplorerActionUnion } from './types/file-browser.types';
export { IconName } from './types/icons.types';
export type ExplorerIconProps = import('./types/icons.types').ExplorerIconProps;
export type { FileBrowserHandle, FileBrowserProps } from './types/file-browser.types';
export type { FileViewMode } from './types/file-view.types';
export type FileViewConfig = import('./types/file-view.types').FileViewConfig;
export type FileViewConfigGrid = import('./types/file-view.types').FileViewConfigGrid;
export type FileViewConfigList = import('./types/file-view.types').FileViewConfigList;
export type { ThumbnailGenerator } from './types/thumbnails.types';

export type { I18nConfig, ExplorerFormatters } from './types/i18n.types';
export { defaultFormatters, getI18nId, getActionI18nId, I18nNamespace } from './util/i18n';

export { setExplorerDefaults } from './util/default-config';

export type { ExplorerDndFileEntryType } from './types/dnd.types';
export type ExplorerDndFileEntryItem = import('./types/dnd.types').ExplorerDndFileEntryItem;

export type FileActionHandler = GenericFileActionHandler<ExplorerActionUnion>;
export type ExplorerFileActionData = MapFileActionsToData<ExplorerActionUnion>;

// Extensions
export * from './extensions';

// Redux/Store
export * from './redux/reducers';
export * from './redux/store';
export * from './redux/selectors';
export { thunkDispatchFileAction, thunkRequestFileAction } from './redux/thunks/dispatchers.thunks';

// Icons
export { IconFA } from './IconFA';