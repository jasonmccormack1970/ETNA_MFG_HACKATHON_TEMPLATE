import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
// import './App.css';
import Launches from './components/launches';
import Hello from './components/hello';
import Me from './components/me';
import Home from './pages/home';
import Test1 from './pages/test1';
import MissingRoute from './pages/MissingRoute';
import { Container } from 'react-bootstrap';
import { NavigationBar } from './components/navigationbar';

// const client = new ApolloClient({
//     uri: 'http://localhost:3600/graphql',
// });

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <Container>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/test1" component={Test1} />
                            <Route component={MissingRoute} />
                        </Switch>
                    </Router>
                </Container>
            </React.Fragment>
        );
    }
}

export default App;
