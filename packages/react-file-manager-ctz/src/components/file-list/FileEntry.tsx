import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Nullable } from 'tsdef';

import { selectFileData, selectIsDnDDisabled, selectIsFileSelected } from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';
import { DndEntryState, FileEntryProps } from '../../types/file-list.types';
import { FileViewMode } from '../../types/file-view.types';
import { FileHelper } from '../../util/file-helper';
import { makeGlobalExplorerStyles } from '../../util/styles';
import { ClickableWrapper, ClickableWrapperProps } from '../internal/ClickableWrapper';
import { CompactEntry } from './CompactEntry';
import { DnDFileEntry } from './DnDFileEntry';
import { useFileClickHandlers } from './FileEntry-hooks';
import {GridEntry }  from './GridEntry';
import { ListEntry } from './ListEntry';

export interface SmartFileEntryProps {
  fileId: Nullable<string>;
  displayIndex: number;
  fileViewMode: FileViewMode;
  columnWidths?: number;
}

const disabledDndState: DndEntryState = {
  dndIsDragging: false,
  dndIsOver: false,
  dndCanDrop: false,
};

export const SmartFileEntry: React.FC<SmartFileEntryProps> = React.memo(({ fileId, displayIndex, fileViewMode ,columnWidths}) => {
  const classes = useStyles();

  // Basic properties
  const file = useParamSelector(selectFileData, fileId);
  const selected = useParamSelector(selectIsFileSelected, fileId);
  const dndDisabled = useSelector(selectIsDnDDisabled);

  // Clickable wrapper properties
  const fileClickHandlers = useFileClickHandlers(file, displayIndex);
  const [focused, setFocused] = useState(false);
  const clickableWrapperProps: ClickableWrapperProps = {
    wrapperTag: 'div',
    passthroughProps: { className: classes.fileEntryClickableWrapper },
    ...(FileHelper.isClickable(file) ? fileClickHandlers : undefined),
    setFocused,
  };

  // File entry properties
  const fileEntryProps: Omit<FileEntryProps, 'dndState'> = {
    file,
    selected,
    focused,
  };

  let EntryComponent: React.FC<FileEntryProps>;
  if (fileViewMode === FileViewMode.List) EntryComponent = ListEntry;
  else if (fileViewMode === FileViewMode.Compact) EntryComponent = CompactEntry;
  else EntryComponent = GridEntry;

  return dndDisabled ? (
    <ClickableWrapper {...clickableWrapperProps}>
      <EntryComponent {...fileEntryProps} dndState={disabledDndState} columnWidths={columnWidths}/>
    </ClickableWrapper>
  ) : (
    <DnDFileEntry file={file}>
      {(dndState) => (
        <ClickableWrapper {...clickableWrapperProps}>
          <EntryComponent {...fileEntryProps} dndState={dndState} columnWidths={columnWidths}/>
        </ClickableWrapper>
      )}
    </DnDFileEntry>
  );
});
SmartFileEntry.displayName = 'SmartFileEntry';

const useStyles = makeGlobalExplorerStyles(() => ({
  fileEntryClickableWrapper: {
    // We disable default browser outline because Explorer provides its own outline
    // (which doesn't compromise accessibility, hopefully)
    outline: 'none !important',
    position: 'relative',
    height: '100%',
    width: '100%'
  },
}));
