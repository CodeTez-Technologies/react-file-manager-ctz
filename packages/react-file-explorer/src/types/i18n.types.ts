import { IntlConfig, IntlShape } from 'react-intl';
import { Nullable } from 'tsdef';

import { FileData } from './file.types';

export interface I18nConfig extends Partial<IntlConfig> {
  formatters?: Partial<ExplorerFormatters>;
}

export interface ExplorerFormatters {
  formatFileModDate: (intl: IntlShape, file: Nullable<FileData>) => Nullable<string>;
  formatFileSize: (intl: IntlShape, file: Nullable<FileData>) => Nullable<string>;
}
