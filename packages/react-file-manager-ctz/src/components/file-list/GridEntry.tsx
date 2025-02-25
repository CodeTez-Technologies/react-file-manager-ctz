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
import { Box, styled } from "@mui/material";

export const GridEntry: React.FC<FileEntryProps> = React.memo(
  ({ file, selected, focused, dndState }) => {
    const isDirectory = FileHelper.isDirectory(file);
    const entryState = useFileEntryState(file, selected, focused);

    const classes = useFileEntryStyles(entryState);
    const fileEntryHtmlProps = useFileEntryHtmlProps(file);
    const entryClassName = c({
      [classes.gridFileEntry]: true,
    });
    return (
      <>
{/* 
      <div className={entryClassName} {...fileEntryHtmlProps}>
        <GridEntryPreviewFile className={classes.gridFileEntryPreview} entryState={entryState} dndState={dndState} />
        <div className={classes.gridFileEntryNameContainer}>
          <FileEntryName className={classes.gridFileEntryName} file={file} />
        </div>
      </div> */}
      <GridItems className='fileItems' {...fileEntryHtmlProps} state={entryState}>
        {/* <Box className="fileCheckBox"> 
          <CustomCheckBox
            className={
              hovered?.id === file.id || selectedItem?.id == file.id
                ? "hovered"
                : ""
            }
            checked={
              (multipleSelectedItems instanceof Set &&
                multipleSelectedItems.has(file.id)) ||
              selectedItem?.id === file.id
            }
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation(); // Prevent click from affecting parent elements
              handleMultipleSelectedItem(file);
            }}
          />
        </Box> */}
        <Box component="figure" className="fileIconBlock">
          <GridEntryPreviewFile className={classes.gridFileEntryPreview} entryState={entryState} dndState={dndState} />
        </Box>
        <Box className="flex flex-col fileDetailBlock">
           <FileEntryName file={file} />
        </Box>
      </GridItems>
      </>
    );
  }
);
GridEntry.displayName = "GridEntry";

const useFileEntryStyles = makeLocalExplorerStyles((theme) => ({
  gridFileEntry: {
    // flexDirection: 'column',
    // display: 'flex',
    // height: '100%',
  },
  gridFileEntryPreview: {
    // flexGrow: 1,
  },
  gridFileEntryName: {
    backgroundColor: (state: FileEntryState) =>
      state.selected ? "rgba(0,153,255, .25)" : "transparent",
    textDecoration: (state: FileEntryState) =>
      state.focused ? "underline" : "none",
    borderRadius: 3,
    padding: [2, 4],
    fontWeight: 500,
  },
}));


// Styled
const GridItems = styled(Box)<{ state: any }>(({ theme, state }) => ({
  '&.fileItems': {
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1.5),
      gap: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      '&:hover': {
          background: theme.palette.action.hover
      },
      ...(state.selected && {
        background: theme.palette.primary.lighterOpacity
      }),
      '& .fileCheckBox': {
          position: 'absolute',
          top: '5px',
          right: '5px',
      },
      '& .fileIconBlock': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0px',
          '& svg': {
              width: '32px',
              height: '32px'
          }
      },
      '& .fileDetailBlock': {
          width: 'calc(100% - 45px)',
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
  }
}));
