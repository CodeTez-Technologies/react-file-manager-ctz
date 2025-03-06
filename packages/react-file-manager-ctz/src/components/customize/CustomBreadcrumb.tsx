import React, { useState } from "react";
import { Box, Breadcrumbs, styled, Typography, Menu, MenuItem, Link, Tooltip } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AutoSizer from "react-virtualized-auto-sizer";
import AngleIcon from "../../icons/Assets/AngleIcon";

const BreadcrumbsBlock = styled(Breadcrumbs)(({theme})=>({
  '& .MuiBreadcrumbs-ol': {
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap'
  },
  '& .breadcrumbsText': {
    fontSize: '14px',
    fontWeight: 400,
    minWidth: '50px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textTransform: 'capitalize',
    cursor: 'pointer'
  },
  '& .breadcrumbsLastBlock':{
      display : 'flex',
      gap: theme.spacing(0.5),
      alignItems: 'center',
      '& svg':{
      width: '12px',
      height: '12px',
      fill: theme.palette.text.secondary
  }  
  }
}));

const MenuBlock = styled(Box)(({theme})=>({
  display: 'flex',
  '& .menuIcon':{
     display: 'flex',
     background: theme.palette.divider,
     borderRadius: '100%',
     padding: '5px',
     '&:hover':{
        background: theme.palette.action.hover,
     },
     '& svg':{
       width : '14px',
       height: '14px'
     }
  }
}));

const ActionMenu = styled(Menu)(({theme})=>({
  marginTop : '10px',
  '& .MuiPaper-root':{
      '& .MuiList-root':{
        padding: theme.spacing(1),
        '& .MuiButtonBase-root':{
            borderRadius : '5px',
        },
          '& .MuiListItemText-root':{
              margin: '0px !important'
          }
      }
  }
}));

interface CustomBreadcrumbProps {
  path: any;
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({ path }) => {

  const linkParts = typeof path === "string" ? path.replace(/\\/g, "/").split("/") : path;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  console.log('linkParts' , linkParts)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BreadcrumbsBlock separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Tooltip title={'My Drive'}>
        <Link className='breadcrumbsText' underline='hover'>
          My Drive
        </Link>
      </Tooltip>
      {linkParts.length > 0 && (
        <MenuBlock>
          <Box onClick={handleClick} className='menuIcon'>
            <MoreHorizIcon />
          </Box>
          <ActionMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {linkParts.slice(1, -1).map((item, index) => (
              <MenuItem key={index} onClick={handleClose}>{item}</MenuItem>
            ))}
          </ActionMenu>
        </MenuBlock>
      )}

      {linkParts.length > 1 && (
       <Box className='breadcrumbsLastBlock'>
        <Tooltip title={linkParts[linkParts.length - 1]}>
          <Typography variant="h6" className='breadcrumbsText'>
            {linkParts[linkParts.length - 1]}
          </Typography>
        </Tooltip>
        <AngleIcon />
       </Box>
      )}
    </BreadcrumbsBlock>
  );
};

export default CustomBreadcrumb;
