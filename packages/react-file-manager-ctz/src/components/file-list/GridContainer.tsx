import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { SmartFileEntry } from "./FileEntry";
import { makeGlobalExplorerStyles, useIsMobileBreakpoint } from '../../util/styles';
import { FileViewConfigGrid } from "../..";
import { selectFileViewConfig, selectors } from '../../redux/selectors';
import { Box, styled, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { useParamSelector } from '../../redux/store';
import { selectFileData } from '../../redux/selectors';


export interface FileListGridProps {
  width: number;
  height: number;
}

const GridContainer: React.FC<FileListGridProps> = ({ width, height }) => {

  const viewConfig = useSelector(selectFileViewConfig) as FileViewConfigGrid;

  // Add a default value `[]` to avoid undefined errors
  const displayFileIds = useSelector(selectors.getDisplayFileIds) as string[];  // or number[] based on your data

  const fileCount = useMemo(() => displayFileIds.length, [displayFileIds]);
  const isMobileBreakpoint = useIsMobileBreakpoint();

  // const files = useMemo(() => displayFileIds.map(fileId => useParamSelector(selectFileData, fileId)), [displayFileIds]);
  const files = displayFileIds.map(fileId => useParamSelector(selectFileData, fileId));

  const cabinets = files.filter(file => file?.isDir === true && file?.parentId == null);
  const folders = files.filter(file => file?.isDir === true && file?.parentId !== null);
  const normalFiles = files.filter(file => file?.isDir === false);


  // Moved `cellRenderer` inside to access `displayFileIds` and `viewConfig`
  const renderFiles = (fileArray: any[]) => (
    fileArray.filter(file => file).map((file, index) => (
      <Box key={file.id} className='gridItem'>
        <SmartFileEntry fileId={file.id} displayIndex={index} fileViewMode={viewConfig.mode} />
      </Box>
    ))
  );


  return (

    <BlockViewParent width={width} height={height}>
      <BlockView>
        <Box className="lastModified">
          <Typography>Last Modified</Typography>
          <ArrowUpwardIcon fontSize="small" />
        </Box>
        {cabinets.length > 0 && (
          <BlockViewChild>
            <BlockTitle>
              <Typography variant="h6" className="titleText">
                Cabinet
              </Typography>
            </BlockTitle>
            <GridViewBlock width={width} height={height}>
              {renderFiles(cabinets)}
            </GridViewBlock>
          </BlockViewChild>
        )}
        {folders.length > 0 && (
          <BlockViewChild>
            <BlockTitle>
              <Typography variant="h6" className="titleText">
                Folder
              </Typography>
            </BlockTitle>
            <GridViewBlock width={width} height={height}>
              {renderFiles(folders)}</GridViewBlock>
          </BlockViewChild>
        )}
        {normalFiles.length > 0 && (
          <BlockViewChild>
            <BlockTitle>
              <Typography variant="h6" className="titleText">
                Files
              </Typography>
            </BlockTitle>
            <GridViewBlock width={width} height={height}>
              {renderFiles(normalFiles)}</GridViewBlock>
          </BlockViewChild>
        )}
      </BlockView>
    </BlockViewParent>
  );
};

export default GridContainer;


const GridViewBlock = styled(Box)(({ theme, width, height }: { width: any, height: any }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gridColumnGap: theme.spacing(2),
  gridRowGap: theme.spacing(2),
  width: width + 'px',
  height: 'fit-content',
  '& .gridItem': {
    display: 'flex',
  }
}))

// Styled Components
const BlockViewParent = styled(Box)(({ theme, width, height }: { width: any, height: any }) => ({
  display: 'flex',
  width: width + 'px',
}));

// Styled Components
const BlockView = styled(Box)(({ theme }) => ({
  gap: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  '& .lastModified': {
    position: 'absolute',
    right: 0,
    top: '4px',
    display : 'flex',
    gap: '10px'
  }
}));

const BlockViewChild = styled(Box)(({ theme }) => ({
  gap: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column'
}));

const BlockTitle = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  '& .titleText': {
    fontSize: '16px',
    fontWeight: 400
  }
}));