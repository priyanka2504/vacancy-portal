import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class AppliedPostsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: []
        }
    }

    fetchPosts = () => {
        const { userArray } = this.props;
        fetch(`http://localhost:2007/view-applied-job`, {
            method: 'POST',
            body: JSON.stringify({ userID: userArray._id }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => { 
                this.componentWillMount()
                this.setState({ response: response })});
    }

      componentWillMount = () => {
          this.fetchPosts()
    }

    render() {
        const { response } = this.state;
        return (
            <div className='mt-3'>
                <Row>
                    <Col></Col>
                    <Col xs='10'>
                        {response.map((jobs) => (
                            <div>
                                <Card className='ml-2 mt-2'>
                                    <CardBody>
                                        <CardTitle> <b>{jobs.ApppliedJobTitle} </b></CardTitle>
                                        <CardSubtitle className='text-muted mt-1'> <Row> <Col> Job Location: </Col> <Col>{jobs.AppliedJobLocation} </Col> <Col></Col></Row></CardSubtitle>
                                        <CardSubtitle className='mt-1'> <Row> <Col>Key Skills: </Col> <Col>{jobs.AppliedJobTechnology}</Col> <Col></Col></Row></CardSubtitle>
                                        <CardSubtitle className='text-muted mt-1'> <Row> <Col> Applied On: </Col> <Col>{jobs.AppliedOn} </Col> <Col></Col></Row></CardSubtitle>
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

const AppliedPosts = connect(mapStateToProps)(AppliedPostsComponent);

export default AppliedPosts;