/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

// import { faGitAlt } from '@fortawesome/free-brands-svg-icons/faGitAlt';
// import { faLinux } from '@fortawesome/free-brands-svg-icons/faLinux';
// import { faNodeJs } from '@fortawesome/free-brands-svg-icons/faNodeJs';
// import { faPhp } from '@fortawesome/free-brands-svg-icons/faPhp';
// import { faPython } from '@fortawesome/free-brands-svg-icons/faPython';
// import { faRust } from '@fortawesome/free-brands-svg-icons/faRust';
// import { faUbuntu } from '@fortawesome/free-brands-svg-icons/faUbuntu';
// import { faWindows } from '@fortawesome/free-brands-svg-icons/faWindows';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
// import { faBalanceScale } from '@fortawesome/free-solid-svg-icons/faBalanceScale';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons/faBoxOpen';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
// import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes';
// import { faDatabase } from '@fortawesome/free-solid-svg-icons/faDatabase';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
// import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
// import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
// import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
// import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
// import { faFileArchive } from '@fortawesome/free-solid-svg-icons/faFileArchive';
// import { faFileCode } from '@fortawesome/free-solid-svg-icons/faFileCode';
// import { faFileExcel } from '@fortawesome/free-solid-svg-icons/faFileExcel';
// import { faFileImage } from '@fortawesome/free-solid-svg-icons/faFileImage';
// import { faFilePdf } from '@fortawesome/free-solid-svg-icons/faFilePdf';
// import { faFileWord } from '@fortawesome/free-solid-svg-icons/faFileWord';
// import { faFilm } from '@fortawesome/free-solid-svg-icons/faFilm';
import { faFistRaised } from '@fortawesome/free-solid-svg-icons/faFistRaised';
// import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons/faFolderPlus';
// import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
// import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons/faLevelUpAlt';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
// import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
// import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faObjectGroup } from '@fortawesome/free-solid-svg-icons/faObjectGroup';
import { faPaste } from '@fortawesome/free-solid-svg-icons/faPaste';
// import { faRunning } from '@fortawesome/free-solid-svg-icons/faRunning';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import { faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons/faSortAmountDownAlt';
import { faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons/faSortAmountUpAlt';
// import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh';
import { faThLarge } from '@fortawesome/free-solid-svg-icons/faThLarge';
import { faThList } from '@fortawesome/free-solid-svg-icons/faThList';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
// import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconName, ExplorerIconProps } from './types/icons.types';

// SVG Icons
import PdfIcon from './icons/pdf';
import WordIcon from './icons/word';
import SpreadSheetIcon from './icons/spreadsheet';
import FolderIcon from './icons/folder';
import ImageIcon from './icons/image';
import FileIcon from './icons/file';
import CabinetIcon from './icons/cabinet';

// @ts-ignore
const IconMap: { [iconName in IconName]: any } = {
  // Misc
  [IconName.loading]: faCircleNotch,
  [IconName.dropdown]: faChevronDown,
  [IconName.placeholder]: faMinus,

  // File Actions: Drag & drop
  [IconName.dndDragging]: faFistRaised,
  [IconName.dndCanDrop]: faArrowDown,
  [IconName.dndCannotDrop]: faTimes,

  // File Actions: File operations
  [IconName.openFiles]: faBoxOpen,
  [IconName.openParentFolder]: faLevelUpAlt,
  [IconName.copy]: faCopy,
  [IconName.paste]: faPaste,
  [IconName.share]: faShareAlt,
  [IconName.search]: faSearch,
  [IconName.star]: faStar,
  [IconName.selectAllFiles]: faObjectGroup,
  [IconName.clearSelection]: faEraser,

  // File Actions: Sorting & options
  [IconName.sortAsc]: faSortAmountDownAlt,
  [IconName.sortDesc]: faSortAmountUpAlt,
  [IconName.toggleOn]: faToggleOn,
  [IconName.toggleOff]: faToggleOff,

  // File Actions: File Views
  [IconName.list]: faList,
  [IconName.compact]: faThList,
  [IconName.smallThumbnail]: faTh,
  [IconName.largeThumbnail]: faThLarge,

  // File Actions: Unsorted
  // [IconName.folder]: faFolder,
  [IconName.folderCreate]: faFolderPlus,
  [IconName.folderOpen]: faFolderOpen,
  [IconName.folderChainSeparator]: faChevronRight,
  [IconName.download]: faDownload,
  [IconName.upload]: faUpload,
  [IconName.trash]: faTrash,
  [IconName.fallbackIcon]: faExclamationTriangle,

  // File modifiers
  // [IconName.symlink]: faExternalLinkAlt,
  // [IconName.hidden]: faEyeSlash,

  // Generic file types
  // [IconName.file]: faFile,
  // [IconName.license]: faBalanceScale,
  // [IconName.code]: faFileCode,
  [IconName.config]: faCogs,
  // [IconName.model]: faCubes,
  // [IconName.database]: faDatabase,
  // [IconName.text]: faFileAlt,
  // [IconName.archive]: faFileArchive,
  // [IconName.image]: faFileImage,
  // [IconName.video]: faFilm,
  // [IconName.info]: faInfoCircle,
  // [IconName.key]: faKey,
  // [IconName.lock]: faLock,
  // [IconName.music]: faMusic,
  // [IconName.terminal]: faTerminal,
  // [IconName.users]: faUsers,

  // OS file types
  // [IconName.linux]: faLinux,
  // [IconName.ubuntu]: faUbuntu,
  // [IconName.windows]: faWindows,

  // Programming language file types
  // [IconName.rust]: faRust,
  // [IconName.python]: faPython,
  // [IconName.nodejs]: faNodeJs,
  // [IconName.php]: faPhp,

  // Development tools file types
  // [IconName.git]: faGitAlt,

  // Other program file types
  // [IconName.pdf]: faFilePdf,
  // [IconName.excel]: faFileExcel,
  // [IconName.word]: faFileWord,
  // [IconName.flash]: faRunning,
} as const;



export const IconFA: React.FC<ExplorerIconProps> = React.memo((props) => {
  const { icon } = props;

  if (IconMap[icon as keyof typeof IconMap]) {
    const faProps = {
      ...props,
      icon: IconMap[icon as keyof typeof IconMap],
    } as const;

    return <FontAwesomeIcon {...faProps} />;
  }

  switch (icon) {
    case 'word':
      return <WordIcon />;
    case 'excel':
      return <SpreadSheetIcon />;
    case 'folder':
      return <FolderIcon />;
    case 'pdf':
      return <PdfIcon />;
    case 'image':
      return <ImageIcon />;
    case 'cabinet':
      return <CabinetIcon />;
    default:
      return <FileIcon />;
  }
});
