import merge from 'deepmerge';
import React, { ReactNode, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'react-jss';
import { Provider as ReduxProvider } from 'react-redux';
import shortid from 'shortid';
import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    ThemeOptions,
} from '@mui/material/styles';

import { useExplorerStore } from '../../redux/store';
import { FileBrowserHandle, FileBrowserProps } from '../../types/file-browser.types';
import { defaultConfig } from '../../util/default-config';
import { getValueOrFallback } from '../../util/helpers';
import { useStaticValue } from '../../util/hooks-helpers';
import { ExplorerFormattersContext, defaultFormatters } from '../../util/i18n';
import { ExplorerIconContext } from '../../util/icon-helper';
import { darkThemeOverride, lightTheme, mobileThemeOverride, useIsMobileBreakpoint } from '../../util/styles';
import { ExplorerBusinessLogic } from '../internal/ExplorerBusinessLogic';
import { ExplorerIconPlaceholder } from '../internal/ExplorerIconPlaceholder';
import { ExplorerPresentationLayer } from '../internal/ExplorerPresentationLayer';

// if (process.env.NODE_ENV === 'development') {
//     const whyDidYouRender = require('@welldone-software/why-did-you-render');
//     whyDidYouRender(React, {
//         trackAllPureComponents: true,
//     });
// }

export const FileBrowser = React.forwardRef<FileBrowserHandle, FileBrowserProps & { children?: ReactNode; }>((props, ref) => {

    const { instanceId, iconComponent, children } = props;
    const disableDragAndDrop = getValueOrFallback(
        props.disableDragAndDrop,
        defaultConfig.disableDragAndDrop,
        'boolean',
    );
    const disableDragAndDropProvider = getValueOrFallback(
        props.disableDragAndDropProvider,
        defaultConfig.disableDragAndDropProvider,
        'boolean',
    );
    const darkMode = getValueOrFallback(props.darkMode, defaultConfig.darkMode, 'boolean');
    const i18n = getValueOrFallback(props.i18n, defaultConfig.i18n);
    const formatters = useMemo(() => ({ ...defaultFormatters, ...i18n?.formatters }), [i18n]);

    const explorerInstanceId = useStaticValue(() => instanceId ?? shortid.generate());
    const store = useExplorerStore(explorerInstanceId);

    const isMobileBreakpoint = useIsMobileBreakpoint();

    const theme = useMemo(() => {
        let muiOptions: ThemeOptions = {
            cssVarPrefix: 'mui',
            palette: { mode: darkMode ? 'dark' : 'light' },
        };
        if (props.muiThemeOptions) {
            muiOptions = merge(muiOptions, props.muiThemeOptions);
        }
        const muiTheme = createTheme(muiOptions);
        const combinedTheme = merge(
            muiTheme,
            merge(merge(lightTheme, darkMode ? darkThemeOverride : {}), props.theme || {}),
        );
        return isMobileBreakpoint ? merge(combinedTheme, mobileThemeOverride) : combinedTheme;
    }, [darkMode, isMobileBreakpoint]);

    const explorerComps = (
        <>
            <ExplorerBusinessLogic ref={ref} {...props} />
            <ExplorerPresentationLayer>{children}</ExplorerPresentationLayer>
        </>
    );

    return (
        <IntlProvider locale="en" defaultLocale="en" {...i18n}>
            <ExplorerFormattersContext.Provider value={formatters}>
                <ReduxProvider store={store}>
                    <ThemeProvider theme={theme}>
                        <StyledEngineProvider injectFirst>
                            <MuiThemeProvider theme={theme}>
                                <ExplorerIconContext.Provider
                                    value={iconComponent ?? defaultConfig.iconComponent ?? ExplorerIconPlaceholder}
                                >
                                    {disableDragAndDrop || disableDragAndDropProvider ? (
                                        explorerComps
                                    ) : (
                                        <DndProvider backend={HTML5Backend}>{explorerComps}</DndProvider>
                                    )}
                                </ExplorerIconContext.Provider>
                            </MuiThemeProvider>
                        </StyledEngineProvider>
                    </ThemeProvider>
                </ReduxProvider>
            </ExplorerFormattersContext.Provider>
        </IntlProvider>
    );
});

FileBrowser.displayName = 'FileBrowser';
