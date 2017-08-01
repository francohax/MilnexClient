import React from 'react';
import classNames from 'classnames';
import {IndexRoute, Route} from 'react-router';
import {connect} from 'react-redux';
import actions from './redux/actions';

import {Grid, Row, Col, MainContainer} from '@sketchpixy/rubix';

import Footer from './common/footer';
import Header from './common/header';
import Sidebar from './common/sidebar';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Lock from './routes/Lock';

@connect((state) => {
    return {}
})
class App extends React.Component {
    render() {

        this.props.dispatch(actions.fetchMe());
        this.props.dispatch(actions.setToken());

        return (
            <MainContainer {...this.props}>
                <Sidebar />
                <Header />
                <div id='body'>
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                {this.props.children}
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <Footer />
            </MainContainer>
        );
    }
}

const routes = (
    <Route component={App}>
        <IndexRoute component={Home}/>
        {/*<Route path='/home2' component={Home2} />*/}
    </Route>
);

const basicRoutes = (
    <Route>
        <Route path='login' component={Login}/>
        <Route path='register' component={Register}/>
        <Route path='lock' component={Lock}/>
    </Route>
);

const combinedRoutes = (
    <Route>
        <Route>
            {routes}
        </Route>
        <Route>
            {basicRoutes}
        </Route>
    </Route>
);

export default (
    <Route>
        {/*<Route path='/' component={Home} />*/}
        <Route path='/'>
            {combinedRoutes}
        </Route>
    </Route>
);

