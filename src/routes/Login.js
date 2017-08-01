import React from 'react';
import classNames from 'classnames';
import {Link, withRouter} from 'react-router';
import actions from '../redux/actions';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

import {
    Row,
    Col,
    Icon,
    Grid,
    Form,
    Alert,
    Badge,
    Panel,
    Button,
    PanelBody,
    FormGroup,
    LoremIpsum,
    InputGroup,
    FormControl,
    ButtonGroup,
    ButtonToolbar,
    PanelContainer,
} from '@sketchpixy/rubix';

@withRouter
@connect((state) => {
    return {loginErrorMessage: state.loginErrorMessage}
})
export default class Login extends React.Component {
    handleLogin(e) {
        e.preventDefault();
        e.stopPropagation();

        let email = ReactDOM.findDOMNode(this.email).value;
        let password = ReactDOM.findDOMNode(this.password).value;
        this.props.dispatch(actions.login(email, password));
    }

    componentDidMount() {
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    render() {
        let error = this.props.loginErrorMessage ?
            (
                <Alert danger>
                    <div>{this.props.loginErrorMessage}</div>
                </Alert>
            ) : null;

        return (
            <div id='auth-container' className='login fadeIn animated'>
                <div id='auth-row'>
                    <div id='auth-cell'>
                        <Grid>
                            <Row>
                                <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                                    <PanelContainer controls={false}>
                                        <Panel>
                                            <PanelBody style={{padding: 0}}>
                                                <div className='text-center bg-darkcyan fg-white'>
                                                    <h3 style={{margin: 0, padding: 25}}>Sign in to Rubix</h3>
                                                </div>
                                                {/*<div className='bg-hoverblue fg-black50 text-center'*/}
                                                {/*style={{padding: 12.5}}>*/}
                                                {/*<div>You need to sign in for those awesome features</div>*/}
                                                {/*<div style={{marginTop: 12.5, marginBottom: 12.5}}>*/}
                                                {/*<Button id='facebook-btn' lg bsStyle='darkblue' type='submit'>*/}
                                                {/*<Icon glyph='icon-fontello-facebook'/>*/}
                                                {/*<span>Sign in <span*/}
                                                {/*className='hidden-xs'>with facebook</span></span>*/}
                                                {/*</Button>*/}
                                                {/*</div>*/}
                                                {/*<div>*/}
                                                {/*<a id='twitter-link' href='#'><Icon*/}
                                                {/*glyph='icon-fontello-twitter'/><span> or with twitter</span></a>*/}
                                                {/*</div>*/}
                                                {/*</div>*/}
                                                <div>
                                                    {/*<div className='text-center' style={{padding: 12.5}}>*/}
                                                    {/*or use your Rubix account*/}
                                                    {/*</div>*/}
                                                    <div style={{
                                                        padding: 25,
                                                        paddingTop: 0,
                                                        paddingBottom: 0,
                                                        margin: 'auto',
                                                        marginBottom: 25,
                                                        marginTop: 25
                                                    }}>
                                                        <Form onSubmit={::this.handleLogin}>
                                                            <FormGroup controlId='emailaddress'>
                                                                <InputGroup bsSize='large'>
                                                                    <InputGroup.Addon>
                                                                        <Icon glyph='icon-fontello-mail'/>
                                                                    </InputGroup.Addon>
                                                                    <FormControl autoFocus type='email'
                                                                                 className='border-focus-blue'
                                                                                 placeholder='example@email.com'
                                                                                 ref={(email) => this.email = email}
                                                                    />
                                                                </InputGroup>
                                                            </FormGroup>
                                                            <FormGroup controlId='password'>
                                                                <InputGroup bsSize='large'>
                                                                    <InputGroup.Addon>
                                                                        <Icon glyph='icon-fontello-key'/>
                                                                    </InputGroup.Addon>
                                                                    <FormControl type='password'
                                                                                 className='border-focus-blue'
                                                                                 placeholder='password'
                                                                                 ref={(password) => this.password = password}/>
                                                                </InputGroup>
                                                            </FormGroup>
                                                            {error}
                                                            <FormGroup>
                                                                <Grid>
                                                                    <Row>
                                                                        <Col xs={6} collapseLeft collapseRight
                                                                             style={{paddingTop: 10}}>
                                                                            <Link to={'register'}>Create a Rubix
                                                                                account</Link>
                                                                        </Col>
                                                                        <Col xs={6} collapseLeft collapseRight
                                                                             className='text-right'>
                                                                            <Button outlined lg type='submit'
                                                                                    bsStyle='blue'
                                                                                    onClick={::this.handleLogin}>Login</Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Grid>
                                                            </FormGroup>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </PanelBody>
                                        </Panel>
                                    </PanelContainer>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}
