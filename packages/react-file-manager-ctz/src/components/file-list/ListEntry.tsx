import React, { useContext, useMemo } from 'react';

import { DndEntryState, FileEntryProps } from '../../types/file-list.types';
import { useLocalizedFileEntryStrings } from '../../util/i18n';
import { ExplorerIconContext } from '../../util/icon-helper';
import { c, makeLocalExplorerStyles } from '../../util/styles';
import { TextPlaceholder } from '../external/TextPlaceholder';
import { useDndIcon, useFileEntryHtmlProps, useFileEntryState } from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, useCommonEntryStyles } from './GridEntryPreview';
import { selectListColumns } from '../../redux/selectors';

import { format } from 'date-fns';
import { useSelector } from 'react-redux';

interface StyleState {
    entryState: FileEntryState;
    dndState: DndEntryState;
}

export const ListEntry: React.FC<FileEntryProps> = React.memo(({ file, selected, focused, dndState }) => {
    const entryState: FileEntryState = useFileEntryState(file, selected, focused);
    const dndIconName = useDndIcon(dndState);
    const { fileModDateString, fileSizeString } = useLocalizedFileEntryStrings(file);
    const styleState = useMemo<StyleState>(
        () => ({
            entryState,
            dndState,
        }),
        [dndState, entryState],
    );
    const classes = useStyles(styleState);
    const commonClasses = useCommonEntryStyles(entryState);
    const ExplorerIcon = useContext(ExplorerIconContext);
    const fileEntryHtmlProps = useFileEntryHtmlProps(file);
    const listCols = useSelector(selectListColumns);

    const fileModDate = typeof file?.modDate === 'string' ? format(new Date(file.modDate), 'MMM dd, yyyy HH:mm') : '-';

    return (
        <div className={classes.listFileEntry} {...fileEntryHtmlProps}>
            <div className={commonClasses.focusIndicator}></div>
            <div className={c([commonClasses.selectionIndicator, classes.listFileEntrySelection])}></div>
            <div className={classes.listFileEntryIcon}>
                <ExplorerIcon
                    icon={dndIconName ?? entryState.icon}
                    spin={dndIconName ? false : entryState.iconSpin}
                    fixedWidth={true}
                />
            </div>
            <div className={classes.listFileEntryName} title={file ? file.name : undefined}>
                <FileEntryName file={file} />
            </div>
            <div className={classes.listFileEntryProperty}>
                {file ? fileSizeString ?? <span>—</span> : <TextPlaceholder minLength={10} maxLength={20} />}
            </div>
            <div className={classes.listFileEntryProperty}>
                {file ? fileModDate ?? <span>—</span> : <TextPlaceholder minLength={5} maxLength={15} />}
            </div>
            {
                listCols.map((entry, index) => (
                    <div key={index} className={classes.listFileEntryProperty}>
                        {entry.getValue(file) ?? '-'}
                    </div>
                ))
            }
        </div>
    );
});

const useStyles = makeLocalExplorerStyles((theme) => ({
    listFileEntry: {
        boxShadow: `inset ${theme.palette.divider} 0 -1px 0`,
        fontSize: theme.listFileEntry.fontSize,
        color: ({ dndState }: StyleState) =>
            dndState.dndIsOver ? (dndState.dndCanDrop ? theme.dnd.canDropColor : theme.dnd.cannotDropColor) : 'inherit',
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        height: '100%',
    },
    listFileEntrySelection: {
        opacity: 0.6,
    },
    listFileEntryIcon: {
        color: ({ entryState, dndState }: StyleState) =>
            dndState.dndIsOver
                ? dndState.dndCanDrop
                    ? theme.dnd.canDropColor
                    : theme.dnd.cannotDropColor
                : entryState.color,
        fontSize: theme.listFileEntry.iconFontSize,
        boxSizing: 'border-box',
        padding: [2, 4],
        zIndex: 20,
        width: '24px',
        height: '24px',
    },
    listFileEntryName: {
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '1 1 300px',
        paddingLeft: 8,
        zIndex: 20,
    },
    listFileEntryProperty: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '0 1 150px',
        padding: [2, 8],
        zIndex: 20,
    },
}));
