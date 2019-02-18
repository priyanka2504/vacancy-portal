import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Row, Col, CardBody, CardTitle, CardSubtitle, Button, Input } from 'reactstrap';
import { ToastContainer, ToastStore } from 'react-toasts';

function searchUser(search) {
    return function (user) {
        return user.technologies.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

class ApplyPostComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            date: new Date()
        }
    }

    searchHandler = (e) => {
        this.setState({ search: e.target.value })
    }

    handleApply = (title, location, technology) => {
        const { userArray, jobsList } = this.props;
        let date = new Date()
        this.setState({
            date: `${date.getUTCDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`,
        }, () => {
            axios.post('http://localhost:2007/apply-job', {
                headers: {
                    'Content-Type': 'application/json'
                },
                ApppliedJobTitle: title,
                AppliedJobLocation: location,
                AppliedJobTechnology: technology,
                userID: userArray._id,
                AppliedOn: this.state.date,
                jobID: jobsList._id
            }).then((res) => {
                ToastStore.success('You have successfully Applied for this job :)')
            }).catch((error) => {
                ToastStore.error('there is an error :(')
            })
        })
        axios.post('http://localhost:2007/update-applied-user', {
            headers: {
                'Content-Type': 'application/json'
            },
            userApplied: [{ user: userArray.empID }],
            jobTitle: title
        }).then((res) => { }).catch((error) => { })
    }

    render() {
        const { search } = this.state;
        let allJobs = this.props.jobsList || [];
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col xs='6'>
                        <Input type="text" className='mt-4' onChange={this.searchHandler} value={search} placeholder='Search by Key Skills' />
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs='10'>
                        {allJobs.filter(searchUser(search)).map((posts) => (
                            <Card className='ml-2 mt-2' key={posts.description}>
                                <CardBody>
                                    <CardTitle> <b>{posts.jobTitle} </b></CardTitle>
                                    <CardSubtitle className='text-muted mt-1'> <Row> <Col> Posted On: </Col> <Col>{posts.PostedOn} </Col> <Col></Col></Row></CardSubtitle>
                                    <CardSubtitle className='text-muted mt-1'> <Row> <Col> Job Location: </Col> <Col>{posts.jobLocation} </Col> <Col></Col></Row></CardSubtitle>
                                    <CardSubtitle className='text-muted mt-1'><Row> <Col> Experience (in Yrs): </Col> <Col>{posts.experienceRequired}</Col> <Col></Col></Row></CardSubtitle>
                                    <CardSubtitle className='mt-1'><Row> <Col>Job Description: </Col> <Col>{posts.description}</Col> <Col></Col></Row></CardSubtitle>
                                    <CardSubtitle className='mt-1'> <Row> <Col>Key Skills: </Col> <Col>{posts.technologies}</Col> <Col></Col></Row></CardSubtitle>
                                    <CardSubtitle className='mt-1'> <Row> <Col>Start Date: </Col> <Col>{posts.startingDate}</Col> <Col></Col></Row></CardSubtitle>
                                    <CardSubtitle className='mt-1'> <Row> <Col>End Date: </Col> <Col>{posts.endingDate}</Col> <Col></Col></Row></CardSubtitle>
                                    <Button onClick={() => this.handleApply(posts.jobTitle, posts.jobLocation, posts.technologies)} style={{ backgroundColor: '#478ee8', marginTop: '1em', width: '10em' }}>APPLY</Button>
                                </CardBody>
                            </Card>
                        ))}
                    </Col>
                    <Col></Col>
                </Row>
                <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} lightBackground store={ToastStore} />
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

const ApplyPost = connect(mapStateToProps)(ApplyPostComponent);

export default ApplyPost;