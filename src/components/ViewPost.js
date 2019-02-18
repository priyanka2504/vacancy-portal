import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class ViewPostComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: [],
        }
    }

    fetchJobs = () => {
        const { userArray } = this.props;
        fetch(`http://localhost:2007/view-posted-job`, {
            method: 'POST',
            body: JSON.stringify({ jobID: userArray._id }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.componentWillMount()
                this.setState({ response: response })
            });
    }

    componentWillMount = () => {
       this.fetchJobs();
    }

    userDetails = (userDetails) => {
        fetch(`http://localhost:2007/get-user-details`, {
            method: 'POST',
            body: JSON.stringify({ empID: userDetails }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert('Employee Name: ' + response[0].name + '\n' + 'Phone No: ' + response[0].phoneNo)
            });
    }

    render() {
        const { response } = this.state;
        return (
            <div className='mt-3'>
                <Row>
                    <Col></Col>
                    <Col xs='10'>
                        {response.map((jobs) => (
                            <div key={jobs.description}>
                                <Card className='ml-2 mt-2'>
                                    <CardBody>
                                        <CardTitle> <b>{jobs.jobTitle} </b></CardTitle>
                                        <CardSubtitle className='text-muted mt-1'> <Row> <Col> Job Location: </Col> <Col>{jobs.jobLocation} </Col> <Col></Col></Row></CardSubtitle>
                                        <CardSubtitle className='text-muted mt-1'> <Row> <Col> Experience (in Yrs): </Col> <Col>{jobs.experienceRequired} </Col> <Col></Col></Row></CardSubtitle>
                                        <CardSubtitle className='mt-1'> <Row> <Col>Description: </Col> <Col>{jobs.description}</Col> <Col></Col></Row></CardSubtitle>
                                        <CardSubtitle className='mt-1'> <Row> <Col>Key Skills: </Col> <Col>{jobs.technologies}</Col> <Col></Col></Row></CardSubtitle>
                                        <CardSubtitle className='mt-1'> <Row> <Col>Start Date: </Col> <Col>{jobs.startingDate}</Col> <Col></Col></Row></CardSubtitle>
                                        <CardSubtitle className='mt-1'> <Row> <Col>End date: </Col> <Col>{jobs.endingDate}</Col> <Col></Col></Row></CardSubtitle>
                                        <CardSubtitle className='mt-1'> <Row> <Col>Applicants: </Col> <Col>
                                            {jobs.userApplied.map((user) => (
                                                <div key={user.user} style={{ cursor: 'pointer', color: '#478ee8' }} onClick={() => this.userDetails(user.user)}>
                                                  {user.user} 
                                                </div>
                                            ))}
                                        </Col> <Col></Col></Row></CardSubtitle>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
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

const ViewPost = connect(mapStateToProps)(ViewPostComponent);

export default ViewPost;