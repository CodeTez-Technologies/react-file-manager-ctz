/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { useContext, useEffect } from 'react';
import { Nullable } from 'tsdef';

import { DndEntryState } from '../../types/file-list.types';
import { IconName } from '../../types/icons.types';
import { ExplorerIconContext } from '../../util/icon-helper';
import { c, important, makeLocalExplorerStyles } from '../../util/styles';
import { FileThumbnail } from './FileThumbnail';
import { GridEntryDndIndicator } from './GridEntryDndIndicator';

export type FileEntryState = {
  childrenCount: Nullable<number>;
  color: string;
  icon: IconName | string;
  thumbnailUrl: Nullable<string>;
  iconSpin: boolean;  
  selected: boolean;
  focused: boolean;
};

export interface FileEntryPreviewProps {
  className?: string;
  entryState: FileEntryState;
  dndState: DndEntryState;
}

export const GridEntryPreviewFolder: React.FC<FileEntryPreviewProps> = React.memo((props) => {
  const { className: externalClassName, entryState, dndState } = props;

  const folderClasses = useFolderStyles(entryState);
  const fileClasses = useFileStyles(entryState);
  const commonClasses = useCommonEntryStyles(entryState);
  const className = c({
    [folderClasses.previewFile]: true,
    [externalClassName || '']: !!externalClassName,
  });
  return (
    <div className={className}>
      <div className={folderClasses.folderBackSideMid}>
        <div className={folderClasses.folderBackSideTop} />
        <div className={folderClasses.folderFrontSide}>
          <GridEntryDndIndicator className={fileClasses.dndIndicator} dndState={dndState} />
          <div className={c([fileClasses.fileIcon, folderClasses.fileIcon])}>{entryState.childrenCount}</div>
          <div className={commonClasses.selectionIndicator}></div>
          <FileThumbnail className={fileClasses.thumbnail} thumbnailUrl={entryState.thumbnailUrl} />
        </div>
      </div>
    </div>
  );
});
GridEntryPreviewFolder.displayName = 'GridEntryPreviewFolder';

const useFolderStyles = makeLocalExplorerStyles((theme) => ({
  previewFile: {
    borderRadius: theme.gridFileEntry.borderRadius,
    position: 'relative',
    overflow: 'hidden',
  },
  folderBackSideTop: {
    backgroundColor: (state: FileEntryState) => state.color,
    boxShadow: (state: FileEntryState) => {
      let color = theme.gridFileEntry.folderBackColorTint;
      if (state.focused) color = 'rgba(0, 0, 0, 0.3)';
      else if (state.selected) color = 'rgba(0, 153, 255, .4)';
      return `inset ${color} 0 0 0 999px`;
    },
    borderTopLeftRadius: theme.gridFileEntry.borderRadius,
    borderTopRightRadius: 10,
    position: 'absolute',
    right: '60%',
    height: 13,
    top: -10,
    left: 0,
    '&:after': {
      borderRightColor: theme.palette.background.paper,
      borderTopColor: theme.palette.background.paper,
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      borderWidth: [0, 15, 10, 0],
      borderStyle: 'solid',
      position: 'absolute',
      display: 'block',
      content: '""',
      right: 0,
      top: 0,
    },
  },
  folderBackSideMid: {
    backgroundColor: (state: FileEntryState) => state.color,
    boxShadow: (state: FileEntryState) => {
      let color = theme.gridFileEntry.folderBackColorTint;
      if (state.focused) color = 'rgba(0, 0, 0, 0.3)';
      else if (state.selected) color = 'rgba(0, 153, 255, .4)';
      return `inset ${color} 0 0 0 999px`;
    },
    borderTopRightRadius: theme.gridFileEntry.borderRadius,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 10,
  },
  folderFrontSide: {
    boxShadow: (state: FileEntryState) => {
      const shadows: string[] = [];
      if (state.focused) shadows.push('inset rgba(0, 0, 0, 1) 0 0 0 3px');
      if (state.selected) shadows.push('inset rgba(0, 153, 255, .65) 0 0 0 3px');
      shadows.push(`inset ${theme.gridFileEntry.folderFrontColorTint} 0 0 0 999px`);
      return shadows.join(', ');
    },
    backgroundColor: (state: FileEntryState) => state.color,
    borderRadius: theme.gridFileEntry.borderRadius,
    position: 'absolute',
    overflow: 'hidden',
    bottom: 0,
    right: 0,
    left: 0,
    top: 10,
  },
  fileIcon: {
    fontSize: important(theme.gridFileEntry.childrenCountSize),
  },
}));

export const GridEntryPreviewFile: React.FC<FileEntryPreviewProps> = React.memo((props) => {
  const { className: externalClassName, entryState, dndState } = props;
  const fileClasses = useFileStyles(entryState);
  const commonClasses = useCommonEntryStyles(entryState);
  const ExplorerIcon = useContext(ExplorerIconContext);
  const className = c({
    [fileClasses.previewFile]: true,
    [externalClassName || '']: !!externalClassName,
  });

  return (
    <div className={className}>
      <GridEntryDndIndicator className={fileClasses.dndIndicator} dndState={dndState} />
      <div className={fileClasses.fileIcon}>
        <ExplorerIcon icon={entryState.icon} spin={entryState.iconSpin} />
      </div>
      <div className={commonClasses.selectionIndicator}></div>
      <FileThumbnail className={fileClasses.thumbnail} thumbnailUrl={entryState.thumbnailUrl} />
    </div>
  );
});
GridEntryPreviewFile.displayName = 'GridEntryPreviewFile';

const useFileStyles = makeLocalExplorerStyles((theme) => ({
  previewFile: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },
  dndIndicator: {
    zIndex: 14,
  },
  fileIcon: {
    display : 'flex',
  },
  thumbnail: {
    borderRadius: theme.gridFileEntry.borderRadius,
    position: 'absolute',
    zIndex: 6,
    bottom: 5,
    right: 5,
    left: 5,
    top: 5,
  },
}));

export const useCommonEntryStyles = makeLocalExplorerStyles(() => ({
  selectionIndicator: {
    display: (state: FileEntryState) => (state.selected ? 'block' : 'none'),
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
  focusIndicator: {
    display: (state: FileEntryState) => (state.focused ? 'block' : 'none'),
    boxShadow: 'inset rgba(0, 0, 0, 1) 0 0 0 2px',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 11,
  },
}));
