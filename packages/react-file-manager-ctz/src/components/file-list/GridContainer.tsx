import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { SmartFileEntry } from "./FileEntry";
import { useIsMobileBreakpoint } from "../../util/styles";
import { selectFileViewConfig, selectors, selectFileData } from "../../redux/selectors";
import { Box, styled, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useParamSelector } from "../../redux/store";
import { FileViewConfigGrid } from "../../types/file-view.types";

export interface FileListGridProps {
  width: number;
  height: number;
}

export const GridContainer: React.FC<FileListGridProps> = ({ width, height }) => {
  const viewConfig = useSelector(selectFileViewConfig) as FileViewConfigGrid;
  const displayFileIds = useSelector(selectors.getDisplayFileIds) as string[];

  const fileCount = useMemo(() => displayFileIds.length, [displayFileIds]);
  const isMobileBreakpoint = useIsMobileBreakpoint();

  // Memoized files list
  const files = displayFileIds.map((fileId) => useParamSelector(selectFileData, fileId));


  // Memoized categorized files
  const { cabinets, folders, normalFiles } = useMemo(() => {
    const categorized = {
      cabinets: [] as typeof files,
      folders: [] as typeof files,
      normalFiles: [] as typeof files,
    };

    files.forEach((file) => {
      if (!file) return;
      if (file.isDir && file.parentId == null) categorized.cabinets.push(file);
      else if (file.isDir) categorized.folders.push(file);
      else categorized.normalFiles.push(file);
    });

    return categorized;
  }, [files]);

  // Memoized render function
  const renderFiles = (fileArray: any[]) =>
    fileArray.map((file, index) => (
      <Box key={file.id} className="gridItem">
        <SmartFileEntry fileId={file.id} displayIndex={index} fileViewMode={viewConfig.mode} />
      </Box>
    ));

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
              <Typography variant="h6" className="titleText">Cabinet</Typography>
            </BlockTitle>
            <GridViewBlock>{renderFiles(cabinets)}</GridViewBlock>
          </BlockViewChild>
        )}
        {folders.length > 0 && (
          <BlockViewChild>
            <BlockTitle>
              <Typography variant="h6" className="titleText">Folder</Typography>
            </BlockTitle>
            <GridViewBlock>{renderFiles(folders)}</GridViewBlock>
          </BlockViewChild>
        )}
        {normalFiles.length > 0 && (
          <BlockViewChild>
            <BlockTitle>
              <Typography variant="h6" className="titleText">Files</Typography>
            </BlockTitle>
            <GridViewBlock>{renderFiles(normalFiles)}</GridViewBlock>
          </BlockViewChild>
        )}
      </BlockView>
    </BlockViewParent>
  );
};

const GridViewBlock = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gridColumnGap: theme.spacing(2),
  gridRowGap: theme.spacing(2),
  width: "100%",
  height: "auto",
  "& .gridItem": {
    display: "flex",
  },
}));

const BlockViewParent = styled(Box)(({ width, height }) => ({
  width: width,
  height: height,
  display: "flex",
  overflow: "auto",
}));

const BlockView = styled(Box)(({ theme }) => ({
  gap: theme.spacing(3.5),
  display: "flex",
  flexDirection: "column",
  position: "relative",
  padding: theme.spacing(2, 3),
  width: "100%",
  height: "fit-content",
  "& .lastModified": {
    position: "absolute",
    right: theme.spacing(3),
    top: theme.spacing(2),
    display: "flex",
    gap: "10px",
  },
}));

const BlockViewChild = styled(Box)(({ theme }) => ({
  gap: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));

const BlockTitle = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  "& .titleText": {
    fontSize: "16px",
    fontWeight: 400,
  },
}));