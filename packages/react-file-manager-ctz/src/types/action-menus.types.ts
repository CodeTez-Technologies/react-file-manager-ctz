import { Nullable } from 'tsdef';
import { IconName } from '../types/icons.types';

export interface FileActionGroup {
    name: string;
    sortOrder: number;
    icon?: Nullable<IconName | string>;
    fileActionIds: string[];
}

export type FileActionMenuItem = string | FileActionGroup;
