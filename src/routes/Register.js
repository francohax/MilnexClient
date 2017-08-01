import React from 'react';
import classNames from 'classnames';
import actions from '../redux/actions';
import {Link, withRouter} from 'react-router';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {
    Row,
    Col,
    Icon,
    Grid,
    Form,
    Badge,
    Alert,
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
    return {registerErrorMessage: state.registerErrorMessage, registerSuccessMessage: state.registerSuccessMessage}
})
export default class Register extends React.Component {
    register(e) {
        e.preventDefault();
        e.stopPropagation();
        let username = ReactDOM.findDOMNode(this.username).value;
        let email = ReactDOM.findDOMNode(this.email).value;
        let password = ReactDOM.findDOMNode(this.password).value;
        this.props.dispatch(actions.register(username, email, password));
    }

    componentDidMount() {
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    render() {
        let message = null;
        if (this.props.registerErrorMessage) {
            message = (
                <Alert danger>
                    <div>{this.props.registerErrorMessage}</div>
                </Alert>
            )
        } else if (this.props.registerSuccessMessage) {
            message = (
                <Alert success>
                    <div>{this.props.registerSuccessMessage}</div>
                </Alert>
            )
        }

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
                                                    <h3 style={{margin: 0, padding: 25}}>Create Your Account</h3>
                                                </div>
                                                <div>
                                                    <div style={{
                                                        padding: 25,
                                                        paddingTop: 0,
                                                        paddingBottom: 0,
                                                        margin: 'auto',
                                                        marginBottom: 25,
                                                        marginTop: 25
                                                    }}>
                                                        <Form onSubmit={::this.register}>
                                                            <FormGroup controlId='username'>
                                                                <InputGroup bsSize='large'>
                                                                    <InputGroup.Addon>
                                                                        <Icon glyph='icon-fontello-user'/>
                                                                    </InputGroup.Addon>
                                                                    <FormControl autoFocus type='text'
                                                                                 className='border-focus-blue'
                                                                                 placeholder='Username'
                                                                                 ref={(username) => this.username = username}
                                                                    />
                                                                </InputGroup>
                                                            </FormGroup>
                                                            <FormGroup controlId='emailaddress'>
                                                                <InputGroup bsSize='large'>
                                                                    <InputGroup.Addon>
                                                                        <Icon glyph='icon-fontello-mail'/>
                                                                    </InputGroup.Addon>
                                                                    <FormControl type='email'
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
                                                                                 ref={(password) => this.password = password}
                                                                    />
                                                                </InputGroup>
                                                            </FormGroup>
                                                            {message}
                                                            <FormGroup>
                                                                <Grid>
                                                                    <Row>
                                                                        <Col xs={12} collapseLeft collapseRight>
                                                                            <Button type='submit' outlined lg
                                                                                    bsStyle='blue' block
                                                                                    onClick={::this.register}>Create
                                                                                account</Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Grid>
                                                            </FormGroup>
                                                        </Form>
                                                    </div>
                                                    <div className='bg-grayishcyan fg-white text-center'
                                                         style={{padding: 25, paddingTop: 12.5}}>
                                                        {/*<div style={{marginBottom: 12.5}}>SIGN UP WITH</div>*/}
                                                        {/*<Grid>*/}
                                                        {/*<Row>*/}
                                                        {/*<Col xs={12} sm={6} smCollapseRight>*/}
                                                        {/*<Button block type='submit' id='facebook-btn' lg bsStyle='darkblue' onClick={::this.back}>*/}
                                                        {/*<Icon glyph='icon-fontello-facebook' />*/}
                                                        {/*<span>Facebook</span>*/}
                                                        {/*</Button>*/}
                                                        {/*<br className='visible-xs' />*/}
                                                        {/*</Col>*/}
                                                        {/*<Col xs={12} sm={6}>*/}
                                                        {/*<Button block type='submit' id='twitter-btn' lg bsStyle='darkblue' onClick={::this.back}>*/}
                                                        {/*<Icon glyph='icon-fontello-twitter' />*/}
                                                        {/*<span>Twitter</span>*/}
                                                        {/*</Button>*/}
                                                        {/*</Col>*/}
                                                        {/*</Row>*/}
                                                        {/*</Grid>*/}
                                                        <div style={{marginTop: 25}}>
                                                            Already have an account? <Link to={'login'}>Login</Link>
                                                        </div>
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
