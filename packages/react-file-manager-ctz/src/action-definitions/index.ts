import { DefaultActions } from './default';
import { EssentialActions } from './essential';
import { ExtraActions } from './extra';

export { OptionIds } from './option-ids';

export const ExplorerActions = {
  ...EssentialActions,
  ...DefaultActions,
  ...ExtraActions,
};

export const EssentialFileActions = [
  ExplorerActions.MouseClickFile,
  ExplorerActions.KeyboardClickFile,
  ExplorerActions.StartDragNDrop,
  ExplorerActions.EndDragNDrop,
  ExplorerActions.MoveFiles,
  ExplorerActions.ChangeSelection,
  ExplorerActions.OpenFiles,
  ExplorerActions.OpenParentFolder,
  ExplorerActions.OpenFileContextMenu,
];

export const DefaultFileActions = [
  ExplorerActions.OpenSelection,
  ExplorerActions.SelectAllFiles,
  ExplorerActions.ClearSelection,
  ExplorerActions.EnableListView,
  // TODO: Don't enable until compact view is fully supported
  // ExplorerActions.EnableCompactView,
  ExplorerActions.EnableGridView,
  ExplorerActions.SortFilesByName,
  ExplorerActions.SortFilesBySize,
  ExplorerActions.SortFilesByDate,
  ExplorerActions.ToggleHiddenFiles,
  ExplorerActions.ToggleShowFoldersFirst,
  ExplorerActions.FocusSearchInput,
];
