import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {createBrowserHistory} from 'history';
import configureStore from './configureStore';
import {ApplicationState}  from './store';
import * as RoutesModule from './routes';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { green500, green700, green100 } from 'material-ui/styles/colors';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let routes = RoutesModule.routes;

// Create browser history to use in the Redux store
const history = createBrowserHistory();

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(history, initialState);

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


function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing configuration
    // and injects the app into a DOM element.
    ReactDOM.render(
        <AppContainer>
            <Provider store = {store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <ConnectedRouter history = {history} children = {routes} />
                </MuiThemeProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('react-app')
    );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
