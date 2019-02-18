import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Form, Label, Button, Jumbotron } from 'reactstrap';
import { ToastContainer, ToastStore } from 'react-toasts';
import bg from '../images/signup-bg.jpg';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Role: '', experience: '..'
        };
    }

    handleChange = (event) => {
        this.setState({ experience: event.target.value })
    }

    handleSubmit = () => {
        console.log(this.getExperience.value)
        const name = this.getName.value;
        const empID = this.getEmpID.value;
        const password = this.getPassword.value;
        const experience = this.getExperience.value;
        const location = this.getLocation.value;
        const technology = this.getTechnology.value;
        const phoneNo = this.getPhoneNo.value;
        const role = this.state.Role;

        axios.post('http://localhost:2007/registered-users', {
            headers: {
                'Content-Type': 'application/json'
            },
            name: name,
            empID: empID,
            password: password,
            experience: experience,
            location: location,
            technology: technology,
            phoneNo: phoneNo,
            role: role
        }).then((res) => {
            ToastStore.success('Thanks for registering :)')
        }).catch((error) => {
            ToastStore.error('there is an error :(')
        })
        this.handleReset();
    }

    handleOptionChange = (event) => {
        this.setState({ Role: event.target.value });
    }

    handleReset = () => {
        this.getName.value = '';
        this.getEmpID.value = '';
        this.getPassword.value = '';
        this.getExperience.value = '';
        this.getLocation.value = '';
        this.getTechnology.value = '';
        this.getPhoneNo.value = '';
        this.setState({ Role: '', experience: '..' })
    }

    render() {
        return (
            <div style={{ minHeight: '100vh', backgroundImage: `url(${bg})` }}>
                <Row>
                    <Col></Col>
                    <Col xs='6'>
                        <Jumbotron className='jumb mt-5'>
                            <Col>
                                <Col></Col>
                                <Col>
                                    <p style={{ textAlign: 'center', fontSize: '1.8em', color: '#478ee8', cursor: 'pointer' }} onClick={() => this.setState({ openLogin: true })}> REGISTER </p>
                                    <hr />
                                    <Form onSubmit={this.handleSubmit} style={{ marginTop: '1em', color: '#000' }}>
                                        <Col>
                                            <Row style={{ marginTop: '1em' }}>
                                                <Col>
                                                    <Label style={{ textAlign: 'right' }} for='name' sm={12} > Name: </Label>
                                                </Col>
                                                <Col>
                                                    <input required type='text' className='form-control' ref={(input) => this.getName = input} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row style={{ marginTop: '1em' }}>
                                                <Col>
                                                    <Label style={{ textAlign: 'right' }} for='empID' sm={12} > Employee ID: </Label>
                                                </Col>
                                                <Col>
                                                    <input required type='text' className='form-control' ref={(input) => this.getEmpID = input} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row style={{ marginTop: '1em' }}>
                                                <Col>
                                                    <Label style={{ textAlign: 'right' }} for='password' sm={12} > Password: </Label>
                                                </Col>
                                                <Col>
                                                    <input required type='password' className='form-control' ref={(input) => this.getPassword = input} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row style={{ marginTop: '1em' }}>
                                                <Col>
                                                    <Label style={{ textAlign: 'right' }} for='phoneNo' sm={12} > Phone No: </Label>
                                                </Col>
                                                <Col>
                                                    <input required type='text' className='form-control' ref={(input) => this.getPhoneNo = input} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row style={{ marginTop: '1em' }}>
                                                <Col>
                                                    <Label style={{ textAlign: 'right' }} for='experience' sm={12} > Experience (in Yrs): </Label>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col xs='10'> <input required type="range" size="5" min="0" max="40" className='form-control' onChange={this.handleChange} ref={(input) => this.getExperience = input} /></Col>
                                                        {this.state.experience}
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row style={{ marginTop: '1em' }}>
                                                <Col>
                                                    <Label style={{ textAlign: 'right' }} for='location' sm={12} > Location: </Label>
                                                </Col>
                                                <Col>
                                                    <input required type='text' className='form-control' ref={(input) => this.getLocation = input} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row style={{ marginTop: '1em' }}>
                                                <Col>
                                                    <Label style={{ textAlign: 'right' }} for='technology' sm={12} > Key Skills worked on: </Label>
                                                </Col>
                                                <Col>
                                                    <input required type='text' className='form-control' ref={(input) => this.getTechnology = input} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row style={{ marginTop: '1em' }}>
                                                <Col>
                                                    <Label style={{ textAlign: 'right' }} for='role' sm={12} > Role: </Label>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col>
                                                            <input type='radio' name='role' value='Admin' checked={this.state.Role === 'Admin'} onChange={this.handleOptionChange} />Admin
                                                    </Col>
                                                        <Col>
                                                            <input type='radio' name='role' value='User' checked={this.state.Role === 'User'} onChange={this.handleOptionChange} /> User
                                                    </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row style={{ marginTop: '1em' }}>
                                                <Col></Col>
                                                <Col>
                                                    <Button style={{ backgroundColor: '#478ee8', marginLeft: '2em', width: '16em' }} onClick={this.handleSubmit}> SIGN UP </Button>
                                                </Col>
                                                <Col></Col>
                                            </Row>
                                        </Col>
                                    </Form>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col></Col>
                                        <Col style={{ marginTop: '1.5em' }} >
                                            <a style={{ textAlign: 'center', fontSize: '1em', color: '#478ee8' }} href='/'> Go back to Login </a>
                                            <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} lightBackground store={ToastStore} />
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                </Col>
                                <Col></Col>
                            </Col>
                        </Jumbotron>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }
}

export default Register;