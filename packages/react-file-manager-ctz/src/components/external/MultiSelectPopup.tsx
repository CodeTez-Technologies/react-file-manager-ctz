import  React from "react";

import { Box, ButtonGroup, styled, Tooltip, Typography } from "@mui/material"

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
        paddingLeft: '57px',
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
    onClose: (value : any) => void,
    shareFolder: boolean
    setShareFolder ?:(view : boolean) => void,
}

const data = [
    {
        icon: <ManageAccountsOutlinedIcon fontSize="small" />,
        label: 'Manage Access',
    },
    {
        icon: <StarBorderIcon fontSize="small" />,
        label: 'Add to Favorites',
    },
    {
        icon: <CompressIcon fontSize="small" />,
        label: 'Compress',
    },
]

const MultiSelectPopup = ({ onClose}: FloatingPopupProps) => {
    return (
        <FloatingPopupBlock >
            <Box className='shadowBlock'>
                <Box className='flex items-center'>
                    <Typography variant="h6" className="selectedItems">4 File Selected</Typography>
                </Box>
                <Box className='flex gap-4 items-center actionButton'>
                    <CustomButton variant="outlined" startIcon={<CopyIcon color='inherit' />} size='small' themeColor='#376534'>
                        Copy Link
                    </CustomButton>
                    <CustomButton variant="outlined" startIcon={<DownloadIcon color='inherit' />} size='small' themeColor='#BE670E'>
                        Download
                    </CustomButton>
                    <ButtonGroup>
                        <CustomButton variant="outlined" startIcon={<ShareIcon color='inherit' />} size='small' themeColor='#A8247F'>
                            Share
                        </CustomButton>
                        <CustomButton variant="outlined" startIcon={<AngleIcon color={'inherit'} />} size='small' themeColor='#A8247F' />
                    </ButtonGroup>
                    <ActionButton>
                        <MenuDotIcon color='inherit' />
                    </ActionButton>
                </Box>
                <Tooltip title='Close'>
                    <CloseButton onClick={onClose} >
                        <CloseIcon />
                    </CloseButton>
                </Tooltip>
            </Box>
        </FloatingPopupBlock>
    )
}

export default MultiSelectPopup
