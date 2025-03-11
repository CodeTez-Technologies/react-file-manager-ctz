import { filesize } from 'filesize';
import { createContext, useContext, useMemo } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { Nullable, Undefinable } from 'tsdef';

import { FileAction } from '../types/action.types';
import { FileData } from '../types/file.types';
import { ExplorerFormatters } from '../types/i18n.types';
import { FileHelper } from './file-helper';

export enum I18nNamespace {
    Toolbar = 'toolbar',
    FileList = 'fileList',
    FileEntry = 'fileEntry',
    FileContextMenu = 'contextMenu',

    FileActions = 'actions',
    FileActionGroups = 'actionGroups',
}

export const getI18nId = (namespace: I18nNamespace, stringId: string): string => `explorer.${namespace}.${stringId}`;

export const getActionI18nId = (actionId: string, stringId: string): string =>
    `explorer.${I18nNamespace.FileActions}.${actionId}.${stringId}`;

export const useLocalizedFileActionGroup = (groupName: string) => {
    console.log('groupName' , groupName)
    const intl = useIntl();
    return useMemo(() => {
        return intl.formatMessage({
            id: getI18nId(I18nNamespace.FileActionGroups, groupName),
            defaultMessage: groupName,
        });
    }, [groupName, intl]);
};

export const useLocalizedFileActionStrings = (action: Nullable<FileAction>) => {
    const intl = useIntl();
    return useMemo(() => {
        if (!action) {
            return {
                buttonName: '',
                buttonTooltip: undefined,
            };
        }

        const buttonName = intl.formatMessage({
            id: getActionI18nId(action.id, 'button.name'),
            defaultMessage: action.button?.name,
        });

        let buttonTooltip: Undefinable<string> = undefined;
        if (action.button?.tooltip) {
            // We only translate the tooltip if the original action has a tooltip.
            buttonTooltip = intl.formatMessage({
                id: getActionI18nId(action.id, 'button.tooltip'),
                defaultMessage: action.button?.tooltip,
            });
        }

        return {
            buttonName,
            buttonTooltip,
        };
    }, [action, intl]);
};

export const useLocalizedFileEntryStrings = (file: Nullable<FileData>) => {
    const intl = useIntl();
    const formatters = useContext(ExplorerFormattersContext);
    return useMemo(() => {
        return {
            fileModDateString: formatters.formatFileModDate(intl, file),
            fileSizeString: formatters.formatFileSize(intl, file),
        };
    }, [file, formatters, intl]);
};

export const defaultFormatters: ExplorerFormatters = {
    formatFileModDate: (intl: IntlShape, file: Nullable<FileData>): Nullable<string> => {
        const safeModDate = FileHelper.getModDate(file);
        if (safeModDate) {
            /*
            const dateOpts: FormatDateOptions = {
              dateStyle: 'medium',
              timeStyle: 'short',
            }
            */
            // return intl.formatDate(safeModDate, dateOpts);
            return intl.formatDate(safeModDate);
        } else {
            return null;
        }
    },
    formatFileSize: (_intl: IntlShape, file: Nullable<FileData>): Nullable<string> => {
        if (!file || typeof file.size !== 'number') return null;

        const size = file.size;
        const sizeData = filesize(size, { bits: false, output: 'object', base: 2 }) as any;
        if (sizeData.symbol === 'B') {
            return `${Math.round(sizeData.value / 10) / 100.0} KB`;
        } else if (sizeData.symbol === 'KB') {
            return `${Math.round(sizeData.value)} ${sizeData.symbol}`;
        }

        return convertUnitSymbol(`${sizeData.value} ${sizeData.symbol}`);
    },
};

/**
 * Convert SI unit symbols (KiB, MiB, etc.) to decimal unit symbols (KB, MB, etc.).
 * @param {string} sizeStr - Size with SI unit (e.g., "1024 KiB", "1 MiB").
 * @returns {string} - Size with decimal unit (e.g., "1024 KB", "1 MB").
 */
function convertUnitSymbol(sizeStr: string) {
    // Define a mapping for SI unit replacements
    const symbolMap: Record<string, string> = {
        KiB: 'KB',
        MiB: 'MB',
        GiB: 'GB',
        TiB: 'TB',
        PiB: 'PB',
    };

    // Replace the SI unit symbol with the decimal unit symbol
    return sizeStr.replace(/\b(KiB|MiB|GiB|TiB|PiB)\b/g, (match) => symbolMap[match]);
}

export const ExplorerFormattersContext = createContext(defaultFormatters);
