import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Row, Col, Button, Label } from 'reactstrap';
import { ToastContainer, ToastStore } from 'react-toasts';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class AddPostComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    handleSubmit = () => {
        const { startDate, endDate } = this.state;
        const { userArray } = this.props;
        let jobTitle = this.getTitle.value;
        let description = this.getDescription.value;
        let experienceRequired = this.getExperience.value;
        let jobLocation = this.getLocation.value;
        let technologies = this.getTechnology.value;
        let jobID = userArray._id;
        let date = new Date();
        let startingDate = `${startDate._d.getDate()} - ${startDate._d.getMonth() +1} - ${startDate._d.getFullYear()}`
        let endingDate = `${endDate._d.getDate()} - ${endDate._d.getMonth() +1} - ${endDate._d.getFullYear()}`
        this.setState({
            date: `${date.getUTCDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`
        }, () => {
            axios.post('http://localhost:2007/post-jobs', {
                headers: {
                    'Content-Type': 'application/json'
                },
                jobID: jobID,
                jobTitle: jobTitle,
                description: description,
                experienceRequired: experienceRequired,
                jobLocation: jobLocation,
                technologies: technologies,
                PostedOn: this.state.date,
                startingDate: startingDate,
                endingDate: endingDate
            }).then((res) => {
                ToastStore.success('Post has been added :)')
            }).catch((error) => {
                ToastStore.error('there is an error :(')
            })
        })
        this.handleReset();
    }

    handleReset = () => {
        this.getTitle.value = '';
        this.getDescription.value = '';
        this.getExperience.value = '';
        this.getLocation.value = '';
        this.getTechnology.value = '';
    }

    render() {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col xs='11'>
                        <Form onSubmit={this.handleSubmit} style={{ marginTop: '1em', color: '#000' }}>
                            <Col>
                                <Row style={{ marginTop: '1em' }}>
                                    <Col>
                                        <Label style={{ textAlign: 'right' }} for='jobTitle' sm={12} > Job Title: </Label>
                                    </Col>
                                    <Col>
                                        <input required type='text' className='form-control' ref={(input) => this.getTitle = input} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row style={{ marginTop: '1em' }}>
                                    <Col>
                                        <Label style={{ textAlign: 'right' }} for='jobDescription' sm={12} > Job Description: </Label>
                                    </Col>
                                    <Col>
                                        <input required type='textarea' className='form-control' ref={(input) => this.getDescription = input} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row style={{ marginTop: '1em' }}>
                                    <Col>
                                        <Label style={{ textAlign: 'right' }} for='experience' sm={12} > Experience (in Yrs): </Label>
                                    </Col>
                                    <Col>
                                        <input required type='text' className='form-control' ref={(input) => this.getExperience = input} />
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
                                        <Label style={{ textAlign: 'right' }} for='technology' sm={12} > Key Skills: </Label>
                                    </Col>
                                    <Col>
                                        <input required type='text' className='form-control' ref={(input) => this.getTechnology = input} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row style={{ marginTop: '1em' }}>
                                    <Col>
                                        <Label style={{ textAlign: 'right' }} for='technology' sm={12} > Start and End Date: </Label>
                                    </Col>
                                    <Col>
                                        {/* <input required type='text' className='form-control' ref={(input) => this.getTechnology = input} /> */}

                                        <DateRangePicker
                                            startDate={this.state.startDate}
                                            startDateId="your_unique_start_date_id"
                                            endDate={this.state.endDate}
                                            endDateId="your_unique_end_date_id"
                                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                                            focusedInput={this.state.focusedInput}
                                            onFocusChange={focusedInput => this.setState({ focusedInput })}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row style={{ marginTop: '1em' }}>
                                    <Col></Col>
                                    <Col>
                                        <Button style={{ backgroundColor: '#478ee8', marginLeft: '2em', width: '16em' }} onClick={this.handleSubmit}> ADD POST </Button>
                                        <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} lightBackground store={ToastStore} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Col>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userArray: state.userArray,
        jobsList: state.jobsList
    };
}

const AddPost = connect(mapStateToProps)(AddPostComponent);

export default AddPost;