import React from 'react';
// Mui
import { Button, styled } from '@mui/material';
import type { ButtonProps } from '@mui/material';


// Styled Button
const Btn = styled(Button)(({ theme, themecolor }: { themecolor?: string, theme: any }) => ({
    borderRadius: theme.shape.borderRadius,
    gap: theme.spacing(1),
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    lineHeight: 'initial',
    minWidth :'fit-content',

    '&.MuiButton-sizeSmall': {
        padding: theme.spacing(0.75, 1.75),
        '& .MuiButton-icon': {
            '& svg': {
                width: '14px',
                height: '14px'
            }
        }
    },
    '&.MuiButton-sizeLarge': {
        padding: theme.spacing(0.75, 1.75),
        '&' :{

        },
        '& .MuiButton-icon': {
            'svg': {
                width: '20px',
                height: '20px'
            }
        }
    },
    '&.MuiButton-outlinedPrimary': {
        border: `1px solid ${themecolor ? themecolor : theme.palette.primary.main}`,
        '&:has(&.MuiButtonGroup-firstButton , &.MuiButtonGroup-grouped:first-of-type)': {
            borderRightColor: 'transparent'
        },
        color: themecolor ? themecolor : theme.palette.primary.main,
        '&:hover': {
            background: themecolor ? themecolor + '14' : theme.palette.primary.lighterOpacity,
        },
        '& .MuiButton-icon': {
            '& svg': {
                fill: themecolor ? themecolor : theme.palette.primary.main,
            }
        }
    },
    '&.MuiButton-outlinedSecondary': {
        border: `1px solid ${themecolor ? themecolor : theme.palette.divider}`,
        '&:has(&.MuiButtonGroup-firstButton , &.MuiButtonGroup-grouped:first-of-type)': {
            borderRightColor: 'transparent'
        },
        color: themecolor ? themecolor : theme.palette.secondary.main,
        '&:hover': {
            background: themecolor ? themecolor + '14' : theme.palette.secondary.lighterOpacity,
        },
        '& .MuiButton-icon': {
            '& svg': {
                fill: themecolor ? themecolor : theme.palette.secondary.main,
            }
        }
    },
    '&.MuiButton-containedPrimary': {
        border: `1px solid ${themecolor ? themecolor : theme.palette.primary.main}`,
        background: themecolor ? themecolor : theme.palette.primary.main,
        boxShadow: `0px 2px 6px color-mix(in srgb, ${themecolor ? themecolor : theme.palette.primary.main} 30%, transparent)`,
        lineHeight: 'initial',
        '& .MuiButton-icon': {
            '& svg': {
                fill: theme.palette.common.white,
            }
        },
        '&:hover': {
            background: themecolor ? themecolor : theme.palette.primary.dark,
        }
    },
    '&.MuiButton-containedSecondary': {
        border: `1px solid ${themecolor ? themecolor : theme.palette.secondary.main}`,
        background: themecolor ? themecolor : theme.palette.secondary.main,
        boxShadow: `0px 2px 6px color-mix(in srgb, ${themecolor ? themecolor : theme.palette.secondary.main} 30%, transparent)`,
        lineHeight: 'initial',
        '& .MuiButton-icon': {
            '& svg': {
                fill: theme.palette.common.white,
            }
        },
        '&:hover': {
            background: themecolor ? themecolor : theme.palette.secondary.dark,
        }
    },
    '& .MuiButton-icon': {
        display: "flex",
        margin: "unset",
        alignItems: "center",
    }
}));

// Custom Button Component
const CustomButton = ({ children, themecolor, ...props }: { themecolor?: string, children?: any } & ButtonProps) => {
    return <Btn themecolor={themecolor} {...props}>{children}</Btn>;
};

export default CustomButton;
