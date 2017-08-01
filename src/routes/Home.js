import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

import {
    Row,
    Col,
    Grid,
    Panel,
    Alert,
    PanelBody,
    PanelContainer,
} from '@sketchpixy/rubix';

@connect((state) => { return { todos: state.todos}})
export default class Home extends React.Component {
    componentWillMount() {

    }

    render() {
        return (
            <PanelContainer className='fadeIn animated'>
                <Panel>
                    <PanelBody style={{padding: 0, paddingBottom: 25}}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                
                                </Col>
                            </Row>
                        </Grid>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}