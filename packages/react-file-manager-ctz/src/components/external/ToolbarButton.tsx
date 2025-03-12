/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Button from '@mui/material/Button';
import React, { useContext, useEffect } from 'react';
import { Nullable } from 'tsdef';

import { selectFileActionData } from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';
import { IconName } from '../../types/icons.types';
import { CustomVisibilityState } from '../../types/action.types';
import { useFileActionProps, useFileActionTrigger } from '../../util/file-actions';
import { useLocalizedFileActionStrings } from '../../util/i18n';
import { ExplorerIconContext } from '../../util/icon-helper';
import { c, important, makeGlobalExplorerStyles } from '../../util/styles';
import { Box, styled } from '@mui/material';

export interface ToolbarButtonProps {
    className?: string;
    text: string;
    tooltip?: string;
    active?: boolean;
    icon?: Nullable<IconName | string>;
    iconOnly?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    dropdown?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = React.memo((props) => {

    const { className: externalClassName, text, tooltip, active, icon, iconOnly, onClick, disabled, dropdown } = props;
    const ExplorerIcon = useContext(ExplorerIconContext);

    const iconComponent =
        icon || iconOnly ? (
            <IconBlock className={iconOnly ? '' : 'iconFigure'}>
                <ExplorerIcon icon={icon ? icon : IconName.fallbackIcon} fixedWidth={true} />
            </IconBlock>
        ) : null;

    const className = c({
        [externalClassName ?? '']: true,
        ['baseButton']: true,
        ['iconOnlyButton']: iconOnly,
        ['activeButton']: !!active,
    });

    return (
        <>
            {
                (icon || iconOnly) && text ?
                    (<Button variant={'contained'} startIcon={<ExplorerIcon icon={icon ? icon : IconName.fallbackIcon} fixedWidth={true} />} onClick={onClick} title={tooltip ? tooltip : text} disabled={disabled || !onClick} sx={{ textTransform: 'capitalize' }} size='small'>
                        {text}
                    </Button>)
                    :
                    (<DropDownButton variant={dropdown ? "default" : "contained"} className={className} onClick={onClick} title={tooltip ? tooltip : text} disabled={disabled || !onClick}>
                        {iconComponent}
                        {text && !iconOnly && <span>{text}</span>}
                        {dropdown && text && !iconOnly && (
                            <div className='iconDropdown'>
                                <ExplorerIcon icon={IconName.dropdown} fixedWidth={true} />
                            </div>
                        )}
                    </DropDownButton>)
            }
        </>
    );
});

export interface SmartToolbarButtonProps {
    fileActionId: string;
}

export const SmartToolbarButton: React.FC<SmartToolbarButtonProps> = React.memo((props) => {

    const { fileActionId } = props;

    const action = useParamSelector(selectFileActionData, fileActionId);
    const triggerAction = useFileActionTrigger(fileActionId);
    const { icon, active, disabled } = useFileActionProps(fileActionId);
    const { buttonName, buttonTooltip } = useLocalizedFileActionStrings(action);

    if (!action) return null;
    const { button } = action;
    if (!button) return null;
    if (action.customVisibility !== undefined && action.customVisibility() === CustomVisibilityState.Hidden) return null;

    return (
        <ToolbarButton
            text={buttonName}
            tooltip={buttonTooltip}
            icon={icon}
            iconOnly={button.iconOnly}
            active={active}
            onClick={triggerAction}
            disabled={disabled}
        />
    );
});

const DropDownButton = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    '&.baseButton': {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        '& .iconDropdown svg': {
            width: '12px',
            height: '12px',
            color: theme.palette.text.secondary,
        }
    }
}))

const IconBlock = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '5px',
    borderRadius: '4px',
    '&:hover': {
        background: theme.palette.action.hover,
    },
    'svg': {
        stroke: theme.palette.text.secondary,
        width: '20px',
        height: '20px',
    }
}))
