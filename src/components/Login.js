import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers, userArray } from '../redux/actions';
import { Row, Col, Form, Label, Button, Jumbotron } from 'reactstrap';
import bg from '../images/signup-bg.jpg';
import Admin from './Admin';
import User from './User';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
            error: '',
            admin: false,
            login: true
        }
    }

    handleSubmit = () => {
        let empID = this.getEmpID.value;
        let checkEmpID = this.props.usersList || [];
        let userArray = checkEmpID.find(id => id.empID === empID)
        console.log(userArray)
        if (userArray === undefined) {
            this.setState({ error: 'Please valid Employee ID' })
        }
        else {
            this.setState({ error: '', userArray: userArray }, () => this.checkPassword())
        }
    }

    checkPassword = () => {
        const { userArray } = this.state;
        this.props.userArray({ userArray: userArray })
        let password = this.getPassword.value;
        if (userArray.password === password) {
            this.setState({ error: '' })
            if (userArray.role === "Admin") {
                this.setState({ admin: true, login: false })
            }
            if (userArray.role === "User") {
                this.setState({ admin: false, login: false })
            }
        } else {
            this.setState({ error: 'Please enter correct password' })
        }
    }

    handleReset = () => {
        this.getEmpID.value = '';
        this.getPassword.value = '';
    }

    render() {
        return (
            <div style={{ minHeight: '100vh', backgroundImage: `url(${bg})` }}>
                {this.state.login ?
                    <Row>
                        <Col></Col>
                        <Col xs='7'>
                            <Jumbotron className='jumb mt-5'>
                                <Col>
                                    <Col></Col>
                                    <Col>
                                        <p style={{ textAlign: 'center', fontSize: '1.8em', color: '#478ee8', cursor: 'pointer' }} onClick={() => this.setState({ openLogin: true })}> LOGIN </p>
                                        <hr />
                                        <Form onSubmit={this.handleSubmit} style={{ color: '#000' }}>
                                            <p style={{ textAlign: 'center', fontSize: '1em', color: 'red' }}> {this.state.error} </p>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <Label style={{textAlign: 'right'}} for='empID' sm={12} > Employee ID: </Label>
                                                    </Col>
                                                    <Col>
                                                        <input required type='text' className='form-control' onChange={this.handleChange} ref={(input) => this.getEmpID = input} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Row style={{ marginTop: '1em' }}>
                                                    <Col>
                                                        <Label style={{textAlign: 'right'}} for='password' sm={12} > Password: </Label>
                                                    </Col>
                                                    <Col>
                                                        <input required type='password' className='form-control' onChange={this.handleChange} ref={(input) => this.getPassword = input} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Row style={{ marginTop: '1em' }}>
                                                    <Col></Col>
                                                    <Col>
                                                        <Button style={{ backgroundColor: '#478ee8', width: '16em' }} onClick={this.handleSubmit}> LOGIN </Button>
                                                    </Col>
                                                    <Col></Col>
                                                </Row>
                                            </Col>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col></Col>
                                            <Col xs='6' style={{ marginTop: '1.5em' }}>

                                                <a style={{ marginTop: '1.5em', fontSize: '1em', textAlign: 'center', color: '#478ee8' }} href='/register'> Not a member yet? Sign up now </a>
                                            </Col>
                                            <Col></Col>
                                        </Row>
                                    </Col>
                                    <Col></Col>
                                </Col>
                            </Jumbotron>
                        </Col>
                        <Col></Col>
                    </Row> :
                    <div>
                        {this.state.admin ? <Admin /> : <User />}
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersList: state.usersList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => {
            dispatch(getUsers())
        },
        userArray: bindActionCreators(userArray, dispatch)
    };
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default Login;