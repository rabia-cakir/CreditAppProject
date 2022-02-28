import React, { Component } from 'react'
import Confirmed from '../assets/confirmed.jpg'
import Unconfirmed from '../assets/unconfirmed.jpg'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import ApplicationService from '../services/ApplicationService'
import { Link } from 'react-router-dom'

export default class ApplicationResult extends Component {

    constructor(props) {
        super(props)

        this.state = {
            identityNumber: this.props.match.params.identityNumber,
            creditResult: '',
            creditLimit: ''

        }
        console.log(this.props.match.params.identityNumber);
    }

    componentDidMount() {
        ApplicationService.getApplication(this.state.identityNumber).then((res) => {
            let application = res.data;
            this.setState({
                creditResult: application.creditResult,
                creditLimit: application.creditLimit,
            });
        });
    }

    render() {
        return (
            <Container className="text-center my-3">
                <Row>
                    <Col>
                        
                        {this.state.creditResult === "CONFIRMED" ? 
                        <Image className="my-3" width={200} height={200} src={Confirmed} fluid /> : 
                        <Image className="my-3" width={200} height={200} src={Unconfirmed} fluid />}
                        <h2 className="my-3">CREDIT RESULT = {this.state.creditResult}</h2>

                        {this.state.creditResult === "CONFIRMED" ? <p>CREDIT LIMIT = {this.state.creditLimit}</p> : " " }


                        <Button variant="primary" type="submit" as={Link} to='/'>
                            Back Home
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

