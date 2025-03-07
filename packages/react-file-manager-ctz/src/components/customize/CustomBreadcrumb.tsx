import React, { useState } from "react";
import { Box, Breadcrumbs, styled, Typography, Menu, MenuItem, Link, Tooltip, useMediaQuery } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AngleIcon from "../../icons/Assets/AngleIcon";

const BreadcrumbsBlock = styled(Breadcrumbs)(({ theme }) => ({
  "& .MuiBreadcrumbs-ol": {
    whiteSpace: "nowrap",
    flexWrap: "nowrap",
  },
  "& .breadcrumbsText": {
    fontSize: "14px",
    fontWeight: 400,
    minWidth: "50px",
    maxWidth: '150px',
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    textTransform: "capitalize",
    cursor: "pointer",
  },
  "& .breadcrumbsLastBlock": {
    display: "flex",
    gap: theme.spacing(0.5),
    alignItems: "center",
    "& svg": {
      width: "12px",
      height: "12px",
      fill: theme.palette.text.secondary,
    },
  },
}));

const MenuBlock = styled(Box)(({ theme }) => ({
  display: "flex",
  "& .menuIcon": {
    display: "flex",
    background: theme.palette.divider,
    borderRadius: "100%",
    padding: "5px",
    "&:hover": {
      background: theme.palette.action.hover,
    },
    "& svg": {
      width: "14px",
      height: "14px",
    },
  },
}));

const ActionMenu = styled(Menu)(({ theme }) => ({
  marginTop: "10px",
  "& .MuiPaper-root": {
    minWidth: "280px",
    "& .MuiList-root": {
      padding: theme.spacing(1),
      "& .MuiButtonBase-root": {
        borderRadius: "5px",
      },
      "& .MuiListItemText-root": {
        margin: "0px !important",
      },
    },
  },
}));

interface CustomBreadcrumbProps {
  path: any;
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({ path }) => {
  const isMobile = useMediaQuery("(max-width: 764px)");

  const linkParts =
    typeof path === "string"
      ? path.replace(/\\/g, "/").split("/")
      : path.map((item) => item.file.name);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BreadcrumbsBlock separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {(isMobile || linkParts.length > 3) &&
        <Tooltip title={linkParts[0]}>
          <Link className="breadcrumbsText" underline="hover">
            {linkParts[0]}
          </Link>
        </Tooltip>
      }
      {(isMobile || linkParts.length > 3) &&
        <MenuBlock>
          <Box onClick={handleClick} className="menuIcon">
            <MoreHorizIcon />
          </Box>
          <ActionMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} autoFocus={false}>
            {linkParts.slice(1, -1).map((item, index) => (
              <MenuItem key={index} onClick={handleClose} disableRipple disableTouchRipple disableFocusRipple>
                {item}
              </MenuItem>
            ))}
          </ActionMenu>
        </MenuBlock>
      }
      {
        (!isMobile && linkParts.length <= 3) &&
        linkParts.slice(0, -1).map((item, index) => (
          <Tooltip key={index} title={item}>
            <Link className="breadcrumbsText" underline="hover">
              {item}
            </Link>
          </Tooltip>
        ))
      }
      {linkParts.length > 0 && (
        <Box className="breadcrumbsLastBlock">
          <Tooltip title={linkParts[linkParts.length - 1]}>
            <Typography variant="h6" className="breadcrumbsText">
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