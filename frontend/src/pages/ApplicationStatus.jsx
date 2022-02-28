import React, { Component } from 'react'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap'
import ApplicationService from '../services/ApplicationService'

export default class ApplicationStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            identityNumber: '',
            identityNumberErr: '',
            uniqueErr: ''
        }

        this.changeIdentityNumberHandler = this.changeIdentityNumberHandler.bind(this);
    }

    getApp = (e) => {
        e.preventDefault();
        if (this.validate()) {

             ApplicationService.getApplication(this.state.identityNumber).then(res => {
                this.props.history.push('/application-result/' + this.state.identityNumber);
            }).catch(error => {
                if (error.response.data.status === 404) {
                    this.setState({ uniqueErr: error.response.data.message });
                }
            });
        }

    }

    changeIdentityNumberHandler = (event) => {
        this.setState({ identityNumber: event.target.value });
    }

    validate() {
        let errors = {};
        let isValid = true;

        var identityNumberPattern1 = new RegExp('^[0-9]{11}$');
        var identityNumberPattern2 = new RegExp('^[0-9]{10}[02468]$');
        if (!identityNumberPattern1.test(this.state.identityNumber)) {
            isValid = false;
            this.setState({ identityNumberErr: "Identity Number must be of digits 11 characters" });
        } else if (!identityNumberPattern2.test(this.state.identityNumber)) {
            isValid = false;
            this.setState({ identityNumberErr: "Identity Number must be of digits and the last character must be an even number" });
        } else {
            this.setState({ identityNumberErr: "" });
            isValid = true;
        }
        return isValid;
    }

    render() {
        return (
            <Container className="p-3">
                <div className="text-center my-3">
                    <h2>APPLICATION STATUS</h2>
                </div>
                <Row>
                    <Col>
                        <Form onSubmit={this.getApp} style={{ marginTop: '150px' }}>
                            <Form.Text style={{ color: 'red' }}>
                                {this.state.uniqueErr}
                            </Form.Text>
                            <Form.Group className="mb-3" controlId="formGridIdentityNumber">
                                <Form.Label>Identity Number</Form.Label>
                                <Form.Control placeholder="Identity Number" name="identityNumber" value={this.state.identityNumber} onChange={this.changeIdentityNumberHandler} />
                                <Form.Text style={{ color: 'red' }}>
                                    {this.state.identityNumberErr}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Search
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

