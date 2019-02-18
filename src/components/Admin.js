import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Jumbotron } from 'reactstrap';
import classnames from 'classnames';
import ViewPost from './ViewPost';
import AddPost from './AddPost';
import ApplyPost from './ApplyPost';
import logout from '../images/logout.png';

class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        };
    }
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col xs='9'></Col>
                    <Col> 
                      <a href='/'> <img src={logout} alt='logout' className='mt-3 ml-5' style={{ cursor: 'pointer' }}/> </a>
                     </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs='8'>
                        <Jumbotron className='jumb '>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                                View Post  
            </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                                        Post Vacancy
            </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
                                        Apply for Job
            </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <ViewPost />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            <AddPost />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="3">
                                    <Row>
                                        <Col sm="12">
                                            <ApplyPost />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Jumbotron>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userArray: state.userArray
    };
}

const Admin = connect(mapStateToProps)(AdminComponent);

export default Admin;