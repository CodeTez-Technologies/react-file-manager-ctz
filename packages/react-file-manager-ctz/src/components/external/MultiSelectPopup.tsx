import  React from "react";

import { Box, ButtonGroup, styled, Tooltip, Typography, useMediaQuery } from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import CompressIcon from "@mui/icons-material/Compress";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';



import CustomButton from "../customize/CustomButton";
import CopyIcon from "../../icons/Assets/CopyIcon";
import DownloadIcon from "../../icons/Assets/DownloadIcon";
import ShareIcon from "../../icons/Assets/ShareIcon";
import AngleIcon from "../../icons/Assets/AngleIcon";
import MenuDotIcon from "../../icons/Assets/MenuDotIcon";
import { useContextMenuTrigger } from "./FileContextMenu-hooks";
import { ToolbarInfo } from "./ToolbarInfo";
import { selectContextMenuItems } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { FileActionGroup, FileActionMenuItem } from "../../types/action-menus.types";

const FloatingPopupBlock = styled(Box)(({ theme}) => ({
    position: "absolute",
    top: "6px",
    left: "0",
    width: `calc(100% - ${theme.spacing(6)})`,
    zIndex: 9,
    padding: theme.spacing(0 , 3),
    '& > .shadowBlock': {
        // boxShadow: 'var(--mui-customShadows-xs)',
        boxShadow:  `0px 3px 12px rgb(47 43 61 / 0.14)`,
        padding: theme.spacing(1),
        // paddingLeft: '57px',
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '.selectedItems': {
            fontSize: '12px',
            fontWeight: 500
        }
    },

    '& .actionButton':{
        display : 'flex',
        gap: theme.spacing(2)
    },
    '& .smallBtn': {
        padding: '5px 15px',
    }
}));

const CloseButton = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.error.main}`,
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    cursor: 'pointer',
    '& svg': {
        fill: theme.palette.error.main,
        width: '16px',
        height: '16px'
    }
}));

const ActionButton = styled(Box)(({ theme }) => ({
    width: '28px',
    height: '28px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    'svg': {
        width: '12px',
        height: '12px',
        fill: theme.palette.text.primary,
    },

}))

interface FloatingPopupProps {
    shareFolder?: boolean
    setShareFolder ?:(view : boolean) => void,
    count: any
}



const MultiSelectPopup = ({ onClose }: FloatingPopupProps) => {
    const isMobile = useMediaQuery("(max-width: 764px)");
    const showContextMenu = useContextMenuTrigger();

    const contextMenuItems = useSelector(selectContextMenuItems);

    console.log('contextMenuItems', contextMenuItems);

    const requiredActions = ["copy_files", "download_files", "share_files"];

    // Helper function to check if item is a FileActionGroup
    const isFileActionGroup = (item: FileActionMenuItem): item is FileActionGroup =>
        typeof item === "object" && item !== null && "fileActionIds" in item;

    // Filter primary actions (copy, download, share)
    const primaryActions = contextMenuItems?.filter(
        item => isFileActionGroup(item) && requiredActions.some(action => item.fileActionIds.includes(action))
    ) as FileActionGroup[];

    const filteredContextMenuItems = contextMenuItems?.map(item => {
        if (isFileActionGroup(item)) {
            return {
                ...item,
                fileActionIds: item.fileActionIds.filter(action => !requiredActions.includes(action)) // Remove requiredActions
            };
        }
        return item;
    });

    return (
        <FloatingPopupBlock>
            <Box className='shadowBlock'>
                <ToolbarInfo />
                <Box className='actionButton'>
                    {primaryActions.some(action => action.fileActionIds.includes("copy_files")) && (
                        <CustomButton variant="outlined" startIcon={<CopyIcon color='inherit' />} size='small' themecolor='#376534'>
                            {!isMobile && 'Copy Link'}
                        </CustomButton>
                    )}

                    {primaryActions.some(action => action.fileActionIds.includes("download_files")) && (
                        <CustomButton variant="outlined" startIcon={<DownloadIcon color='inherit' />} size='small' themecolor='#BE670E'>
                            {!isMobile && 'Download'}
                        </CustomButton>
                    )}

                    {primaryActions.some(action => action.fileActionIds.includes("share_files")) && (
                        <ButtonGroup>
                            <CustomButton variant="outlined" startIcon={<ShareIcon color='inherit' />} size='small' themecolor='#A8247F'>
                                {!isMobile && 'Share'}
                            </CustomButton>
                            <CustomButton variant="outlined" startIcon={<AngleIcon color={'inherit'} />} size='small' themecolor='#A8247F' />
                        </ButtonGroup>
                    )}

                    {filteredContextMenuItems.length > 0 && (
                        <ActionButton onClick={showContextMenu}>
                            <MenuDotIcon color='inherit' />
                        </ActionButton>
                    )}
                </Box>
                <Tooltip title='Close'>
                    <CloseButton onClick={onClose}>
                        <CloseIcon />
                    </CloseButton>
                </Tooltip>
            </Box>
        </FloatingPopupBlock>
    );
}

export default MultiSelectPopup;
