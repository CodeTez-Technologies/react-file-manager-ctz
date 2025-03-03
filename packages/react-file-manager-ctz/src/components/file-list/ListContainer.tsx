import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { FixedSizeList } from "react-window";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  selectFileViewConfig,
  selectListColumns,
  selectors,
} from "../../redux/selectors";
import { FileViewMode } from "../../types/file-view.types";
import { useInstanceVariable } from "../../util/hooks-helpers";
import { SmartFileEntry } from "./FileEntry";
import CustomCheckBox from "../customize/CustomCheckBox";

export interface FileListListProps {
  width: number;
  height: number;
}

export const ListContainer: React.FC<FileListListProps> = React.memo(
  (props) => {

    const { width, height } = props;

    const listCols = useSelector(selectListColumns);
    const viewConfig = useSelector(selectFileViewConfig);

    const listRef = useRef<FixedSizeList>();

    const displayFileIds = useSelector(selectors.getDisplayFileIds) as [];
    const displayFileIdsRef = useInstanceVariable(displayFileIds);
    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(
      {}
    );
    const listContainerRef = useRef<HTMLDivElement | null>(null);
    const [hoveredHeader, setHoveredHeader] = useState<string | null>(null);
    const resizingColumn = useRef<string | null>(null);
    const startX = useRef<number>(0);
    const startWidth = useRef<number>(0);
    const column = useMemo(() => ["name", "createdAt" , ...listCols?.map(item => item.label)], [listCols]);

    // const getItemKey = useCallback(
    //     (index: number) => displayFileIdsRef.current[index] ?? `loading-file-${index}`,
    //     [displayFileIdsRef],
    // );

    useEffect(() => {
      if (!listContainerRef.current) return;

      const parentWidth = listContainerRef.current.clientWidth;
      const totalColumns = column.length;
      const initialWidth = Math.floor(parentWidth / totalColumns);

      setColumnWidths((prevWidths) => {
        const newWidths = { ...prevWidths };

        column.forEach((col) => {
          if (!newWidths[col] || isNaN(newWidths[col])) {
            newWidths[col] = initialWidth;
          }
        });

        return newWidths;
      });
    }, [width, column]);

    const handleMouseDown = (key: string, event: React.MouseEvent) => {

      resizingColumn.current = key;
      startX.current = event.clientX;
      startWidth.current = columnWidths[key] || 100; // Default to 100 if undefined

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {

      if (!resizingColumn.current) return;

      const deltaX = event.clientX - startX.current;
      const newWidth = Math.max(50, startWidth.current + deltaX);  // Minimum 50px

      setColumnWidths((prev) => ({
        ...prev,
        [resizingColumn.current as string]: newWidth,
      }));
    };

    const handleMouseUp = () => {
      resizingColumn.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const listComponent = useMemo(() => {
      // const rowRenderer = (index: number) => {
      //   return (
      //     <ListItemParent className="listParent">
      //       <SmartFileEntry
      //         fileId={displayFileIds[index] ?? null}
      //         displayIndex={index}
      //         fileViewMode={FileViewMode.List}
      //         columnWidths={columnWidths}
      //       />
      //     </ListItemParent>
      //   );
      // };



      const headerRenderer = () => {
        return (
          <ListHeaderRow
            onMouseOver={() => setHoveredHeader("show")}
            onMouseLeave={() => setHoveredHeader(null)}
            style={{
              gridTemplateColumns: ["40px", ... column.map((col) => columnWidths[col] ? `${columnWidths[col]}px` : '1fr')].join(" ")
            }}
          >
              <Box className="checkBoxBlock">
                <CustomCheckBox
                  className={hoveredHeader ? "show" : ""}
                />
              </Box>
            {column.map((col) => (
              <ResizableCell
              key={col}
              style={{ flex: columnWidths[col] ? `0 0 ${columnWidths[col]}px` : "1" }}
              >
                <ListHeaderText variant="h6">{col}</ListHeaderText>
                <ResizeHandle
                  onMouseDown={(e) => handleMouseDown(col, e)}
                >
                  <Box className="resizeHandleBar"></Box>
                </ResizeHandle>
              </ResizableCell>
            ))}
          </ListHeaderRow>
        );
      };

      return (
        <List
          id="listContainer"
          ref={listContainerRef}
          width={width}
          height={height}
        >
          <Box className="listHeader">
            {headerRenderer()}
          </Box>
            <Box className="listBody">
              {displayFileIds.map((fileId, index) => (
                <ListItemParent key={fileId ?? index} className="listParent">
                  <SmartFileEntry
                    fileId={fileId}
                    displayIndex={index}
                    fileViewMode={FileViewMode.List}
                    columnWidths={columnWidths}
                  />
                </ListItemParent>
              ))}
            </Box>        
        </List>
      );
    }, [viewConfig.entryHeight, height, displayFileIds, width , columnWidths]);

    return listComponent;
  }
);



const List = styled(Box)(({ theme, width, height }) => ({
  width: width,
  height: height,
  overflow: 'auto',
  position: 'relative',
  "& .listBody": {
    width: "fit-content",
    height: `calc(100% - 60px)`,
    minWidth: '100%',
  },
  "& .listHeader": {
    height: "60px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    position : 'sticky',
    top:'0',
    background: theme.palette.background.paper,
    zIndex: 1,
    width: "fit-content",
  },
}));

const ListItemParent = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  width: "100%",
}));


const ListHeaderRow = styled(Box)(() => ({
  display: 'grid',
  '.checkBoxBlock': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    position: 'relative',
    zIndex: 100
  }
}));

const ResizableCell = styled(Box)(
  ({ theme, align, header }: { theme: any; align?: string; header?: boolean }) => ({
    padding: header ? theme.spacing(3) : theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    minWidth: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '& p ,&': {
      fontSize: '12px',
      fontWeight: 400
    },
    ...(align == 'center' && {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    })
  })
);

const ResizeHandle = styled(Box)(({ theme }) => ({
  cursor: 'col-resize',
  position: 'absolute',
  right: '0px',
  top: '50%',
  transform: 'translateY(-50%)',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    '& .resizeHandleBar': {
      background: theme.palette.primary.main
    }
  },
  '& .resizeHandleBar': {
    width: '2px',
    height: '90%',
    borderRadius: '3px',
    background: theme.palette.divider
  }
}));

const ListHeaderText = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'capitalize'
}));
