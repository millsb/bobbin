import * as React from 'react';
import { NavMenu } from './NavMenu';
import AppBar from 'material-ui/AppBar';
import PatternNav from './PatternNav';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <AppBar></AppBar>
                <div>{this.props.children}</div>
            </div>
        );
    }
}
