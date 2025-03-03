/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback, useContext } from 'react';
import { Nullable } from 'tsdef';

import { selectFileActionData } from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';
import { IconName } from '../../types/icons.types';
import { CustomVisibilityState } from '../../types/action.types';
import { useFileActionProps, useFileActionTrigger } from '../../util/file-actions';
import { useLocalizedFileActionStrings } from '../../util/i18n';
import { ExplorerIconContext } from '../../util/icon-helper';
import { c, important, makeGlobalExplorerStyles } from '../../util/styles';

import { Box, Menu, styled, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface ToolbarDropdownButtonProps {
    text: string;
    active?: boolean;
    icon?: Nullable<IconName | string>;
    onClick?: () => void;
    disabled?: boolean;
    item?: any;
}

export const ToolbarDropdownButton = React.forwardRef(
    (props: ToolbarDropdownButtonProps, ref: React.Ref<HTMLLIElement>) => {
        const { text, active, icon, onClick, disabled, item } = props;
        const classes = useStyles();
        const ExplorerIcon = useContext(ExplorerIconContext);

        const className = c({
            [classes.contextMenuItem]: true,
            [classes.baseButton]: true,
            [classes.activeButton]: active,
        });
        return (
            <DropdownItemList ref={ref} onClick={onClick} disabled={disabled}>
                <DropdownItem>
                {icon && (
                    <ListItemIcon className={classes.icon}>
                        <ExplorerIcon icon={icon} fixedWidth={true} />
                    </ListItemIcon>
                )}
                <ListItemText primaryTypographyProps={{ className: classes.text }}>{text}</ListItemText>
                {item?.button?.dropdownItem &&
                    <Box className='flex ml-auto'>
                        <ArrowForwardIosIcon fontSize="small" className="arrowIcon" />
                    </Box>
                }
                {Array.isArray(item?.button?.dropdownItem) && item.button.dropdownItem.length > 0 && (
                    <SubDropdown className="subDropdown">
                        {item.button.dropdownItem.map((subItem: any, subIndex: number) => (
                            <DropdownItemList key={subIndex} onClick={subItem.onClick}>
                                <DropdownItem className="dropdownItem">
                                    {subItem.icon && 
                                        <ExplorerIcon icon={subItem.icon} fixedWidth={true} />
                                    }
                                    <Typography variant="h6" className="dropdownLabel">{subItem.label}</Typography>
                                </DropdownItem>
                            </DropdownItemList>
                        ))}
                    </SubDropdown>
                )}
                </DropdownItem>
            </DropdownItemList>
        );
    },
);

const useStyles = makeGlobalExplorerStyles((theme) => ({
    baseButton: {
        lineHeight: important(theme.toolbar.lineHeight),
        height: important(theme.toolbar.size),
        minHeight: important('auto'),
        minWidth: important('auto'),
        padding: important(theme.toolbar.buttonPadding),
    },
    icon: {
        fontSize: important(theme.toolbar.fontSize),
        minWidth: important('auto'),
        color: important('inherit'),
        marginRight: 8,
    },
    text: {
        fontSize: important(theme.toolbar.fontSize),
    },
    activeButton: {
        color: important(theme.colors.textActive),
    },
    contextMenuItem: {
        lineHeight: '18px !important',
        padding: '18px 10px !important'
    }
}));

export interface SmartToolbarDropdownButtonProps {
    fileActionId: string;
    onClickFollowUp?: () => void;
}

export const SmartToolbarDropdownButton = React.forwardRef(
    (props: SmartToolbarDropdownButtonProps, ref: React.Ref<HTMLLIElement>) => {
        const { fileActionId, onClickFollowUp } = props;

        // Fetch action data first
        const action = useParamSelector(selectFileActionData, fileActionId);

        // If action is undefined, return null BEFORE calling hooks
        if (!action || !action.button) return null;
        if (action.customVisibility !== undefined && action.customVisibility() === CustomVisibilityState.Hidden)
            return null;

        // These hooks should only be called if action is defined
        const triggerAction = useFileActionTrigger(fileActionId);
        const { icon, active, disabled } = useFileActionProps(fileActionId);
        const { buttonName } = useLocalizedFileActionStrings(action);

        const handleClick = useCallback(() => {
            triggerAction();
            if (onClickFollowUp) onClickFollowUp();
        }, [onClickFollowUp, triggerAction]);

        return (
            <ToolbarDropdownButton
                ref={ref}
                text={buttonName}
                icon={icon}
                onClick={handleClick}
                active={active}
                disabled={disabled}
                item={action}
            />
        );
    },
);

const SubDropdown = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    display: 'none',
    minWidth: '200px',
    // ...(subMenuPosition == 'right' ? {
    //     right: '100%',
    //     marginRight: theme.spacing(1),
    // } : {
    left: 'calc(100%)',
    marginLeft: theme.spacing(1),
        // }),
    background: theme.palette.background.paper,
    boxShadow:  `0px 3px 12px rgb(47 43 61 / 0.14)`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 0),

    '& .dropdownItem': {

    }
}));

const DropdownItemList = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0, 1)
}));

const DropdownItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    display: 'flex',
    gap: theme.spacing(2),
    cursor: 'pointer',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '5px',

    '&:before': {
        content: '""',
        width: "20px",
        height: "28px",
        position: "absolute",
        opacity: 0,
        right: "-17px"
    },

    '& svg': {
        width: '18px',
        height: '18px',
    },
    '& .arrowIcon': {
        width: '14px',
        height: '14px',
    },
    '&:hover': {
        background: theme.palette.action.hover,
        '.subDropdown': {
            display: 'block'
        }
    },
    '& .dropdownLabel': {
        fontSize: '14px',
        fontWeight: 500,
        whiteSpace: 'nowrap'
    }
}));


