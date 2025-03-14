import React from "react";

import { FileEntryProps } from "../../types/file-list.types";
import { FileHelper } from "../../util/file-helper";
import { c, makeLocalExplorerStyles } from "../../util/styles";
import { useFileEntryHtmlProps, useFileEntryState } from "./FileEntry-hooks";
import { FileEntryName } from "./FileEntryName";
import {
  FileEntryState,
  GridEntryPreviewFile,
  GridEntryPreviewFolder,
} from "./GridEntryPreview";
import { Box, styled, Typography } from "@mui/material";
import CustomCheckBox from "../customize/CustomCheckBox";
import DefaultImage from "../../icons/tempImage";



export const GridEntry: React.FC<FileEntryProps> = React.memo(
  ({ file, selected, focused, dndState }) => {
    
    const isDirectory = FileHelper.isDirectory(file);
    const entryState = useFileEntryState(file, selected, focused);
    const fileEntryHtmlProps = useFileEntryHtmlProps(file);
    const classes = useFileEntryStyles(entryState);

    const entryClassName = c({
      [classes.gridFileEntry]: true,
  });

    return (
      <>
        {
          file && file.isDir === false ?
            <FileView className={entryClassName} state={entryState?.selected.toString()} {...fileEntryHtmlProps}>
              <Box component="figure" className="fileImageBlock">
                <DefaultImage />
                <Box className="fileCheckBox">
                  <CustomCheckBox className='hovered'
                    checked={selected}
                  />  
                </Box>
                <Box className='fileType'>
                   <GridEntryPreviewFile  entryState={entryState} dndState={dndState} />
                </Box>
              </Box>
              <Box className="flex flex-col fileDetailBlock">
                <Typography variant="h6" className="fileName">
                  <FileEntryName file={file} />
                </Typography>
              </Box>
            </FileView>
            :
            <FolderView  className={entryClassName} state={entryState?.selected.toString()} {...fileEntryHtmlProps}>
              <Box component="figure" className="folderIconBlock">
                <GridEntryPreviewFile  entryState={entryState} dndState={dndState} />
              </Box>
              <Box className="flex flex-col folderDetailBlock">
                <FileEntryName file={file} />
              </Box>
              <Box className="fileCheckBox">
                <CustomCheckBox className='hovered'
                  checked={selected}
                />  
              </Box>
            </FolderView>
        }
      </>
    );
  }
);
GridEntry.displayName = "GridEntry";


// Styled
const FolderView = styled(Box)<{ state: boolean }>(({ theme, state }) => ({
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
    gap: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: state === 'true' ?  `color-mix(in srgb, ${theme.palette.primary.main} 10%, transparent)` :theme.palette.action.hover ,
      "& .fileCheckBox": {
        '& .MuiCheckbox-root':{
            opacity:' 1 !important'
        }
      }
    },
    ...(state === 'true' ? {
      background: `color-mix(in srgb, ${theme.palette.primary.main} 10%, transparent)`,
    } : {}),
    '& .fileCheckBox': {
      position: 'absolute',
      top: '2px',
      right: '2px',
      '& .MuiCheckbox-root:not(.Mui-checked)':{
        opacity: 0
      }
    },
    '& .folderIconBlock': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0px',
      '& svg': {
        width: '32px',
        height: '32px'
      }
    },
    '& .folderDetailBlock': {
      width: 'calc(100% - 60px)',
      '& .fileName': {
        fontSize: '14px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '100%',
        textTransform: 'capitalize'
      },
      '& .fileDescription': {
        fontSize: '10px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '100%',
        textTransform: 'capitalize'
      }
    }
}));

const FileView = styled(Box)<{ state: FileEntryState }>(({ theme, state }) => ({
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      '&:hover': {
          background: theme.palette.action.hover,
          "& .fileCheckBox": {
            '& .MuiCheckbox-root':{
                opacity:' 1 !important'
            }
          }
      },
      ...(state.selected && {
        background: theme.palette.primary.lighterOpacity
      }),
      '& .fileImageBlock': {
          borderTopLeftRadius: 'initial',
          borderTopRightRadius: 'initial',
          display: 'flex',
          width: '100%',
          height: '150px',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#EBEBEB',
          position: 'relative',
          margin: 0,
          '&.img': {
              objectFit: 'cover'
          },
          '.fileCheckBox': {
              position: 'absolute',
              top: '5px',
              right: '5px',
              '& .MuiCheckbox-root:not(.Mui-checked)':{
                opacity: 0
              }
          },
          '& .fileType': {
              padding: theme.spacing(0.5),
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: theme.spacing(1),
              left: theme.spacing(1),
              background: theme.palette.common.white,
              '& svg': {
                  width: '16px',
                  height: '16px'
              }
          }
      },
      '& .fileDetailBlock': {
          width: '100%',
          padding: theme.spacing(1.5),
          '& .fileName': {
              fontSize: '14px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              maxWidth: '100%',
              textTransform: 'capitalize'
          },
          '& .fileDescription': {
              fontSize: '10px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              maxWidth: '100%',
              textTransform: 'capitalize'
          }
      }
}));

const useFileEntryStyles = makeLocalExplorerStyles(theme => ({
  gridFileEntry: {
  },
  gridFileEntryPreview: {
  },
  gridFileEntryNameContainer: {
  },
  gridFileEntryName: {
  },
}));
