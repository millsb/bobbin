import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <h1>Home</h1>
        );
    }
}
