/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';
import { Nullable } from 'tsdef';

import { FileData } from '../../types/file.types';
import { makeLocalExplorerStyles } from '../../util/styles';
import { useFileNameComponent, useModifierIconComponents } from './FileEntry-hooks';

export interface FileEntryNameProps {
  file: Nullable<FileData>;
}

export const FileEntryName: React.FC<FileEntryNameProps> = React.memo(({ file }) => {
  const modifierIconComponents = useModifierIconComponents(file);
  const fileNameComponent = useFileNameComponent(file);

  const classes = useStyles();
  return (
    <div className='fileName' title={file ? file.name : undefined} >
      {modifierIconComponents.length > 0 && <span className={classes.modifierIcons}>{modifierIconComponents}</span>}
      {fileNameComponent}
    </div>
  );
});
FileEntryName.displayName = 'FileEntryName';

const useStyles = makeLocalExplorerStyles((theme) => ({
  modifierIcons: {
    color: theme.palette.text.primary,
    position: 'relative',
    fontSize: '0.775em',
    paddingRight: 5,
  },
}));
