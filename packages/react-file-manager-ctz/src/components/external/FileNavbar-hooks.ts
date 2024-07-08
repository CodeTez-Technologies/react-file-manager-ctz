import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nullable } from 'tsdef';

import { ExplorerActions } from '../../action-definitions/index';
import { selectFolderChain } from '../../redux/selectors';
import { thunkRequestFileAction } from '../../redux/thunks/dispatchers.thunks';
import { FileData } from '../../types/file.types';
import { ExplorerDispatch } from '../../types/redux.types';
import { FileHelper } from '../../util/file-helper';

export interface FolderChainItem {
  file: Nullable<FileData>;
  disabled: boolean;
  onClick?: () => void;
}

export const useFolderChainItems = (): FolderChainItem[] => {
  const folderChain = useSelector(selectFolderChain);
  const dispatch: ExplorerDispatch = useDispatch();

  const folderChainItems = useMemo(() => {
    const items: FolderChainItem[] = [];
    if (!folderChain) return items;

    for (let i = 0; i < folderChain.length; ++i) {
      const file = folderChain[i];
      items.push({
        file,
        disabled: !file,
        onClick:
          !FileHelper.isOpenable(file) || i === folderChain.length - 1
            ? undefined
            : () =>
              dispatch(
                thunkRequestFileAction(ExplorerActions.OpenFiles, {
                  targetFile: file,
                  files: [file],
                }),
              ),
      });
    }
    return items;
  }, [dispatch, folderChain]);
  return folderChainItems;
};
