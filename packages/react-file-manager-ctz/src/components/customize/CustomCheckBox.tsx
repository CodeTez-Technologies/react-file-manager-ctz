import React from "react";

import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import type { CheckboxProps } from '@mui/material/Checkbox';
import { Box } from '@mui/material';

// Styled
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    padding: '8px',
    background: 'transparent',
    '.checkIcon':{
          background : 'transparent',
          boxShadow : 'unset',
    },
    '&.show': {
        '&:not(.Mui-checked,.MuiCheckbox-indeterminate)': {
            '.checkIcon': {
                border: `1.3px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper,
                boxShadow: `0px 0.333px ${theme.palette.divider} 0px ${theme.palette.divider}, 0px 0.667px ${theme.palette.divider} 0px ${theme.palette.divider}`,
            },
            '.minusIcon': {
                border: `1.3px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper,
                boxShadow: `0px 0.333px ${theme.palette.divider} 0px ${theme.palette.divider}, 0px 0.667px ${theme.palette.divider} 0px ${theme.palette.divider}`,
            }
        }
    },
    '&.hovered': {
        '&:not(.Mui-checked,.MuiCheckbox-indeterminate)': {
            background: theme.palette.primary.lighterOpacity,
            '.checkIcon': {
                borderColor: theme.palette.primary.main,
                background: theme.palette.primary.lighterOpacity,
                boxShadow: `inset 0 0 0 1px ${theme.palette.primary.lighterOpacity}, inset 0 -1px 0 ${theme.palette.primary.lightOpacity}`,
            },
            '.minusIcon': {
                borderColor: theme.palette.primary.main,
                background: theme.palette.primary.lighterOpacity,
                boxShadow: `inset 0 0 0 1px ${theme.palette.primary.lighterOpacity}, inset 0 -1px 0 ${theme.palette.primary.lightOpacity}`,
            }
        },
    },
    '&.Mui-checked > .MuiBox-root': {
        border: 'unset',
        boxShadow: 'unset',
    },
    '& input:hover~.minusIcon': {
        background: theme.palette.primary.main,
    }
}));

const BpIcon = styled(Box)(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    border: '1px solid transparent',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2
    },
    'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
        ...theme.applyStyles('dark', {
            backgroundColor: '#30404d'
        })
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
        ...theme.applyStyles('dark', {
            background: 'rgba(57,75,89,.5)'
        })
    },
    ...theme.applyStyles('dark', {
        boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
        backgroundColor: '#394b59',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
    })
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fillRule='evenodd' clipRule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.primary.main,
    }
}));


const BpIndeterminateIcon = styled(BpIcon)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    '&::before': {
        content: '""',
        display: "block",
        width: "12px",
        height: "2px",
        backgroundColor: "#fff",
        transform: "translateY(-50%)",
        position: "absolute",
        top: "50%"
    },
}));

// Inspired by Blueprint.js
function BpCheckbox(props: CheckboxProps & { className?: string }) {
    const { className, ...rest } = props;

    return (
        <CustomCheckbox
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon className='checkIcon' />}
            indeterminateIcon={<BpIndeterminateIcon className='minusIcon' />}
            inputProps={{ 'aria-label': 'Checkbox demo' }}
            className={className}
            {...rest}
        />
    );
}

export default function CustomCheckBox({
    className,
    ...props
}: { className?: string } & CheckboxProps) {
    return <BpCheckbox className={className} {...props} />;
}
