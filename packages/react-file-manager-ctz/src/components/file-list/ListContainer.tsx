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
import { makeLocalExplorerStyles } from "../../util/styles";
import { SmartFileEntry } from "./FileEntry";
import { BorderBottom } from "@mui/icons-material";

export interface FileListListProps {
  width: number;
  height: number;
}

export const ListContainer: React.FC<FileListListProps> = React.memo(
  (props) => {

    debugger

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
   const column = useMemo(() => ["name", "createdAt"], []);

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
                if (!(col in newWidths)) {
                    newWidths[col] = initialWidth;
                }
            });
    
            return newWidths;
        });
    }, []); 

    const handleMouseDown = (key: string, event: React.MouseEvent) => {
        resizingColumn.current = key;
        startX.current = event.clientX;
        startWidth.current = columnWidths[key];

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!resizingColumn.current) return;
    
        const deltaX = event.clientX - startX.current;
        const newWidth = Math.max(100, startWidth.current + deltaX);
    
        setColumnWidths((prev) => ({
            ...prev,
            [resizingColumn.current as string]: newWidth,
        }));
    };

    const handleMouseUp = () => {
        resizingColumn.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const listComponent = useMemo(() => {
      const rowRenderer = (index: number) => {
        return (
          <ListItemParent className="listParent">
            <SmartFileEntry
              fileId={displayFileIds[index] ?? null}
              displayIndex={index}
              fileViewMode={FileViewMode.List}
              columnWidths={columnWidths}
            />
          </ListItemParent>
        );
      };

     

      const headerRenderer = () => {
        return (
          <ListHeaderRow
            onMouseOver={() => setHoveredHeader("show")}
            onMouseLeave={() => setHoveredHeader(null)}
            style={{
                gridTemplateColumns: column.map((col) => `${columnWidths[col] ? columnWidths[col]+'px' : '1fr'} `).join(" ")
            }}
          >
            {/* {checkboxSelection && (
              <Box className="checkBoxBlock">
                <CustomCheckBox
                  className={hoveredHeader ? "show" : ""}
                  checked={isHeaderChecked}
                  indeterminate={isHeaderIndeterminate || selectedItem}
                  onChange={handleHeaderCheckboxChange}
                />
              </Box>
            )} */}
            {column.map((col) => (
              <ResizableCell
                style={{ width: columnWidths[col] }}
                header={true}
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
            {displayFileIds.map((_, index) => rowRenderer(index))}
          </Box>
        </List>
      );
    }, [viewConfig.entryHeight, height, displayFileIds, width]);

    return listComponent;
  }
);

const List = styled(Box)(({ theme, width, height }) => ({
  width: width,
  height: height,
  "& .listBody": {
    width: "100%",
    height: `calc(100% - 60px)`,
    overflowY: "auto",
  },
  "& .listHeader": {
    height: "60px",
    borderBottom: `1px solid ${theme.palette.divider}`
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
