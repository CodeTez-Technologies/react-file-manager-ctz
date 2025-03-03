/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { CSSProperties, useContext } from 'react';
import { useIntl } from 'react-intl';

import { IconName } from '../../types/icons.types';
import { getI18nId, I18nNamespace } from '../../util/i18n';
import { ExplorerIconContext } from '../../util/icon-helper';
import { makeGlobalExplorerStyles } from '../../util/styles';

export interface FileListEmptyProps {
  width: number;
  height: number;
}

export const FileListEmpty: React.FC<FileListEmptyProps> = (props) => {

  const { width, height } = props;
  const classes = useStyles();
  const ExplorerIcon = useContext(ExplorerIconContext);
  const style: CSSProperties = {
    width,
    height,
  };

  const intl = useIntl();
  const emptyString = intl.formatMessage({
    id: getI18nId(I18nNamespace.FileList, 'nothingToShow'),
    defaultMessage: 'Nothing to show',
  });

  return (
    <div className={classes.fileListEmpty}>
      <div className={classes.fileListEmptyContent}>
        <ExplorerIcon icon={IconName.folderOpen} />
        &nbsp; {emptyString}
      </div>
    </div>
  );
};

const useStyles = makeGlobalExplorerStyles((theme) => ({
  fileListEmpty: {
    color: theme.palette.text.disabled,
    position: 'relative',
    textAlign: 'center',
    fontSize: '1.2em',
    width: 'calc(100vw - 10px)',
    height: 'calc(100vh - 10px)',
  },
  fileListEmptyContent: {
    transform: 'translateX(-50%) translateY(-50%)',
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '100%',
    height: '100%',
    display : 'flex',
    alignItems: 'center',
    justifyContent : 'center'
  },
}));
