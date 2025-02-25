import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { SmartFileEntry } from "./FileEntry";
import { makeGlobalExplorerStyles, useIsMobileBreakpoint } from '../../util/styles';
import { FileViewConfigGrid } from "../..";
import { selectFileViewConfig, selectors } from '../../redux/selectors';
import { Box, styled } from "@mui/material";


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

  // Moved `cellRenderer` inside to access `displayFileIds` and `viewConfig`
  const cellRenderer = (index: number) => {
    const fileId = displayFileIds[index];
    if (!fileId) return null;

    return (
      <Box key={fileId} className='gridItem'>
        <SmartFileEntry fileId={fileId} displayIndex={index} fileViewMode={viewConfig.mode} />
      </Box>
    );
  };

  return (
    <GridViewBlock width={width} height={height}>
      {displayFileIds.map((_, index) => cellRenderer(index))}
    </GridViewBlock>
  );
};

export default GridContainer;


const GridViewBlock = styled(Box)(({ theme , width , height } :{width : any , height : any}) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gridColumnGap: theme.spacing(2),
  gridRowGap: theme.spacing(2),
  width: width+'px',
  height: 'fit-content',
  '& .gridItem':{
      display : 'flex',
  }
}))