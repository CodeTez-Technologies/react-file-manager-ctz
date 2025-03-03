import React, { useContext, useMemo } from "react";

import { DndEntryState, FileEntryProps } from "../../types/file-list.types";
import { useLocalizedFileEntryStrings } from "../../util/i18n";
import { ExplorerIconContext } from "../../util/icon-helper";
import { c, makeLocalExplorerStyles } from "../../util/styles";
import { TextPlaceholder } from "../external/TextPlaceholder";
import {
  useDndIcon,
  useFileEntryHtmlProps,
  useFileEntryState,
} from "./FileEntry-hooks";
import { FileEntryName } from "./FileEntryName";
import { FileEntryState, useCommonEntryStyles } from "./GridEntryPreview";
import { selectListColumns } from "../../redux/selectors";

import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Box, styled, Typography } from "@mui/material";
import CustomCheckBox from "../customize/CustomCheckBox";

interface StyleState {
  entryState: FileEntryState;
  dndState: DndEntryState;
  columnWidths?: number;
}

export const ListEntry: React.FC<FileEntryProps> = React.memo(
  ({ file, selected, focused, dndState, columnWidths }) => {

    const entryState: FileEntryState = useFileEntryState(
      file,
      selected,
      focused
    );
    
    const dndIconName = useDndIcon(dndState);
    const { fileModDateString, fileSizeString } =
      useLocalizedFileEntryStrings(file);
    const styleState = useMemo<StyleState>(
      () => ({
        entryState,
        dndState,
      }),
      [dndState, entryState]
    );
    const classes = useStyles(styleState);
    const commonClasses = useCommonEntryStyles(entryState);
    const ExplorerIcon = useContext(ExplorerIconContext);
    const fileEntryHtmlProps = useFileEntryHtmlProps(file);
    const listCols = useSelector(selectListColumns);


    const fileModDate =
      typeof file?.modDate === "string"
        ? format(new Date(file.modDate), "MMM dd, yyyy HH:mm")
        : "-";

    const renderFileInformationData = (row: any) => {
      return (
        <FileInformation className="fileItems">
          <Box component="figure" className="fileIconBlock">
            <ExplorerIcon
              icon={dndIconName ?? entryState.icon}
              spin={dndIconName ? false : entryState.iconSpin}
              fixedWidth={true}
            />
          </Box>
          <Box className="flex flex-col fileDetailBlock">
            <FileEntryName file={file} />
            {row.createdUser && (
              <Typography variant="body1" className="fileDescription">
                Created by{" "}
                <span>
                  {" "}
                  {row.createdUser?.firstName} {row.createdUser?.lastName}
                </span>
              </Typography>
            )}
          </Box>
        </FileInformation>
      );
    };

    const columns = [
      {
        key: "name",
        label: "Name",
        resizable: true,
        component: (row: any) => renderFileInformationData(row),
      },

      {
        key: "createdAt",
        label: "Created At",
        resizable: false,
        component: (row: any) => (
          <Typography>
            {new Date(row.createdAt).toLocaleString()} by{" "}
            {row.updatedUser?.firstName} {row.updatedUser?.lastName}
          </Typography>
        ),
      },
      ...listCols.map((item) => ({
        key: item.label.toLowerCase().replace(/\s+/g, "_"), // Convert label to a lowercase key with underscores
        label: item.label,
        resizable: true,
        component: (row: any) => <Typography>-</Typography>, // Placeholder component
    }))
      
    ];

    return (
      <ListItem
        {...fileEntryHtmlProps}
        entryState={entryState}
        style={{
          gridTemplateColumns: [
            "40px",
            ...columns.map((col) => columnWidths?.[col.key] ? `${columnWidths[col.key]}px` : "1fr")
          ].join(" ")
        }}
      >
        <Box className="checkBoxBlock">
          <CustomCheckBox
            className={'show'}
            checked={entryState.selected}
          />
        </Box>
        {columns.map((col) => (
          <ResizableCell key={col.key}>
            {col.component ? col.component(file) : "-"}
          </ResizableCell>
        ))}
        {/* <div className={commonClasses.focusIndicator}></div>
            <div className={c([commonClasses.selectionIndicator, classes.listFileEntrySelection])}></div>
            <div className={classes.listFileEntryIcon}>
                <ExplorerIcon
                    icon={dndIconName ?? entryState.icon}
                    spin={dndIconName ? false : entryState.iconSpin}
                    fixedWidth={true}
                />
            </div>
            <div className={classes.listFileEntryName} title={file ? file.name : undefined}>
                <FileEntryName file={file} />
            </div>
            <div className={classes.listFileEntryProperty}>
                {file ? fileSizeString ?? <span>—</span> : <TextPlaceholder minLength={10} maxLength={20} />}
            </div>
            <div className={classes.listFileEntryProperty}>
                {file ? fileModDate ?? <span>—</span> : <TextPlaceholder minLength={5} maxLength={15} />}
            </div>
            {
                listCols.map((entry, index) => (
                    <div key={index} className={classes.listFileEntryProperty}>
                        {entry.getValue(file) ?? '-'}
                    </div>
                ))
            } */}
      </ListItem>
    );
  }
);

const useStyles = makeLocalExplorerStyles((theme) => ({
  listFileEntry: {
    color: ({ dndState }: StyleState) =>
      dndState.dndIsOver
        ? dndState.dndCanDrop
          ? theme.dnd.canDropColor
          : theme.dnd.cannotDropColor
        : "inherit",
    boxShadow: `inset ${theme.palette.divider} 0 -1px 0`,
    fontSize: theme.listFileEntry.fontSize,
    alignItems: "center",
    position: "relative",
    height: "100%",
  },
  listFileEntrySelection: {
    opacity: 0.6,
  },
  listFileEntryIcon: {
    color: ({ entryState, dndState }: StyleState) =>
      dndState.dndIsOver
        ? dndState.dndCanDrop
          ? theme.dnd.canDropColor
          : theme.dnd.cannotDropColor
        : entryState.color,
    fontSize: theme.listFileEntry.iconFontSize,
    boxSizing: "border-box",
    padding: [2, 4],
    zIndex: 20,
    width: "24px",
    height: "24px",
  },
  listFileEntryName: {
    textOverflow: "ellipsis",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    overflow: "hidden",
    flex: "1 1 300px",
    paddingLeft: 8,
    zIndex: 20,
  },
  listFileEntryProperty: {
    fontSize: theme.listFileEntry.propertyFontSize,
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    overflow: "hidden",
    flex: "0 1 150px",
    padding: [2, 8],
    zIndex: 20,
  },
}));

const ListItem = styled(Box)(({ theme ,entryState } :{entryState : any}) => ({
  display: "grid",
  ...(entryState.selected && {
    // background: `rgb(${theme.palette.primary.main}) / 0.16)`,
    background: `color-mix(in srgb, ${theme.palette.primary.main} 10%, transparent)`,
  }),
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "&:hover": {
    ...(!entryState.selected && {
      background: theme.palette.action.hover,
    }),
    "& .checkBoxBlock": {
      '& .MuiCheckbox-root':{
          opacity:' 1 !important'
      }
    }
  },
  "& .checkBoxBlock": {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    position: "relative",
    '& .MuiCheckbox-root:not(.Mui-checked)':{
       opacity: 0
    }
  },
}));

const FileInformation = styled(Box)(({ theme }) => ({
  "&.fileItems": {
    gap: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    "& .fileIconBlock": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: '0',
      "& svg": {
        width: "32px",
        height: "32px",
      },
    },
    "& .fileDetailBlock": {
      width: "calc(100% - 80px)",
      "& .fileName": {
        fontSize: "14px",
        fontWeight: 500,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        maxWidth: "100%",
        textTransform: "capitalize",
      },
      "& .fileDescription": {
        fontSize: "12px",
        FontWeight: 400,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        maxWidth: "100%",
        textTransform: "capitalize",
      },
    },
  },
}));

const ResizableCell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  position: "relative",
  minWidth: "0",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "& p ,&": {
    fontSize: "12px",
    fontWeight: 400,
  },
}));
