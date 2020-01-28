import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { NavigationBar } from './components/navigationbar';
import Home from './pages/home';
import Test1 from './pages/test1';
import Empty from './pages/empty';
import MissingRoute from './pages/MissingRoute';

class App extends Component {
    render() {
        return (
            <div>
                <React.Fragment>
                    <Container>
                        <NavigationBar />

                        <Router>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/test1" component={Test1} />
                                <Route exact path="/empty" component={Empty} />
                                <Route component={MissingRoute} />
                            </Switch>
                        </Router>
                    </Container>
                </React.Fragment>
            </div>
        );
    }
}

export default App;
