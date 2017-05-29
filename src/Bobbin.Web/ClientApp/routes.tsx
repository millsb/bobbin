import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import PatternNav from "./components/PatternNav";

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/patterns' component={ PatternNav } />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
</Layout>;
