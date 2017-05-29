import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { replace } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import { routes } from './routes';
import configureStore from './configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green100, green500, green700} from 'material-ui/styles/colors';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: green500,
        primary2Color: green700,
        primary3Color: green100,
    },
}, {
    avatar: {
        borderColor: null,
    },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36',
});

export default createServerRenderer(params => {
    return new Promise<RenderResult>((resolve, reject) => {
        // Prepare Redux store with in-memory history, and dispatch a navigation event
        // corresponding to the incoming URL
        const store = configureStore(createMemoryHistory());
        store.dispatch(replace(params.location));

        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin
        const routerContext: any = {};
        const app = (
            <Provider store={ store }>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <StaticRouter context={ routerContext } location={ params.location.path } children={ routes } />
                </MuiThemeProvider>
            </Provider>
        );
        renderToString(app);

        // If there's a redirection, just send this information back to the host application
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }

        // Once any async tasks are done, we can perform the final render
        // We also send the redux store state, so the client can continue execution where the server left off
        params.domainTasks.then(() => {
            resolve({
                html: renderToString(app),
                globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
});
