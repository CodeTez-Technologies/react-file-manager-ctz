import { Nilable } from 'tsdef';

import { StartDragNDropPayload } from './action-payloads.types';
import { FileData } from './file.types';

export interface ExplorerDndDropResult {
  dropTarget: Nilable<FileData> | any;
  dropEffect: 'move' | 'copy';
}

// any: used to be DragObjectWithType (removed from react-dnd)
export type ExplorerDndFileEntryItem = any & {
  payload: StartDragNDropPayload;
};
export const ExplorerDndFileEntryType = 'dnd-explorer-file-entry';
