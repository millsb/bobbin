import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as PatternDataState from '../store/PatternData';
import { List, ListItem }from 'material-ui/List';
import {Pattern} from "../store/PatternData";

// At runtime, Redux will merge together...
type PatternNavProps =
    PatternDataState.PatternDataState                   // ... state we've requested from the Redux store
    & typeof PatternDataState.actionCreators            // ... plus action creators we've requested
    & RouteComponentProps<{}>;                          // ... plus incoming routing parameters

class PatternNav extends React.Component<PatternNavProps, {}> {
    componentWillMount() {
        this.props.actionRequestPatterns();
    }
   render() {
       return (
           <div>
               <List>
                   {this.props.patterns.map( (pattern: Pattern, index: Number) =>
                        <ListItem primaryText={pattern.shortName} key={index} />
                   )}
               </List>
           </div>
       );
   }
}

export default connect(
    (state: ApplicationState) => state.patternData, // Selects which state properties are merged into the component's props
    PatternDataState.actionCreators                 // Selects which action creators are merged into the component's props
)(PatternNav) as typeof PatternNav;
