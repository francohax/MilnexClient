import React from 'react';
import { connect } from 'react-redux';

import {
    Sidebar, SidebarNav, SidebarNavItem,
    SidebarControls, SidebarControlBtn,
    LoremIpsum, Grid, Row, Col, FormControl,
    Label, Progress, Icon,
    SidebarDivider, Image
} from '@sketchpixy/rubix';

import {Link, withRouter} from 'react-router';

@withRouter
class ApplicationSidebar extends React.Component {
    handleChange(e) {
        this._nav.search(e.target.value);
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <FormControl type='text' placeholder='Search...' onChange={::this.handleChange}
                                         className='sidebar-search' style={{
                                border: 'none',
                                background: 'none',
                                margin: '10px 0 0 0',
                                borderBottom: '1px solid #666',
                                color: 'white'
                            }}/>
                            <div className='sidebar-nav-container'>
                                <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>

                                    { /** Pages Section */ }
                                    <div className='sidebar-header'>PAGES</div>

                                    <SidebarNavItem glyph='icon-outlined-todolist' name='Home' href='/'/>
                                </SidebarNav>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

class DummySidebar extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <div className='sidebar-header'>DUMMY SIDEBAR</div>
                        <LoremIpsum query='1p'/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

@withRouter
@connect((state) => { return { user: state.user}})
export default class SidebarContainer extends React.Component {
    render() {
        return (
            <div id='sidebar'>
                <div id='avatar'>
                    <Grid>
                        <Row className='fg-white'>
                            <Col xs={4} collapseRight>
                                <Image  src={this.props.user.avatar} width='40' height='40' circle />
                            </Col>
                            <Col xs={8} collapseLeft id='avatar-col'>
                                <div style={{top: 28, fontSize: 16, lineHeight: 1, position: 'relative'}}>{this.props.user.username}
                                </div>
                                <div>
                                    {/*<Progress id='demo-progress' value={30} color='#ffffff'/>*/}
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <SidebarControls>
                    <SidebarControlBtn bundle='fontello' glyph='docs' sidebar={0}/>
                </SidebarControls>
                <div id='sidebar-container'>
                    <Sidebar sidebar={0}>
                        <ApplicationSidebar />
                    </Sidebar>
                </div>
            </div>
        );
    }
}
