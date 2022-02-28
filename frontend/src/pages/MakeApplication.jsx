import React, { Component } from 'react'
import Make_Application from '../assets/make-application.jpg'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap'
import CustomerService from '../services/CustomerService';

export default class MakeApplication extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            identityNumber: '',
            salary: '',
            phoneNumber: '',

            firstNameErr: '',
            lastNameErr: '',
            identityNumberErr: '',
            salaryErr: '',
            phoneNumberErr: '',
            uniqueErr: ''


        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeIdentityNumberHandler = this.changeIdentityNumberHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.saveCustomer = this.saveCustomer.bind(this);
    }

    saveCustomer = (e) => {
        e.preventDefault();
        if (this.validate()) {
            let customer = { firstName: this.state.firstName, lastName: this.state.lastName, identityNumber: this.state.identityNumber, salary: this.state.salary, phoneNumber: this.state.phoneNumber };

             CustomerService.createCustomer(customer).then(res => {
                this.props.history.push('/application-status');
            }).catch(error => {
                if (error.response.data.status === 409) {
                    this.setState({ uniqueErr: error.response.data.message });
                }
            });
        }

    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeIdentityNumberHandler = (event) => {
        this.setState({ identityNumber: event.target.value });
    }

    changeSalaryHandler = (event) => {
        this.setState({ salary: event.target.value });
    }

    changePhoneNumberHandler = (event) => {
        this.setState({ phoneNumber: event.target.value });
    }

    validate() {
        let errors = {};
        let isValid = true;

        var firstNamePattern = new RegExp('^[a-zA-Z]{2,50}$');
        if (!(this.state.firstName.length >= 2 && this.state.firstName.length <= 50)) {
            isValid = false;
            this.setState({ firstNameErr: "First Name must be between 2 and 50 characters" });
        } else if (!firstNamePattern.test(this.state.firstName)) {
            isValid = false;
            this.setState({ firstNameErr: "First Name must be of characters" });
        } else {
            this.setState({ firstNameErr: "" });
            isValid = true;
        }

        var lastNamePattern = new RegExp('^[a-zA-Z]{2,50}$');
        if (!(this.state.lastName.length >= 2 && this.state.lastName.length <= 50)) {
            isValid = false;
            this.setState({ lastNameErr: "Last Name must be between 2 and 50 characters" });
        } else if (!lastNamePattern.test(this.state.lastName)) {
            isValid = false;
            this.setState({ lastNameErr: "Last Name must be of characters" });
        } else {
            this.setState({ lastNameErr: "" });
            isValid = true;
        }

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

        var salaryPattern = new RegExp('^[0-9]{1,6}$');
        if (!(this.state.salary >= 3000 && this.state.salary <= 999999 && salaryPattern.test(this.state.salary))) {
            isValid = false;
            this.setState({ salaryErr: "Salary must be between 3000 and 999999" });
        } else {
            this.setState({ salaryErr: "" });
            isValid = true;
        }

        var phoneNumberPattern1 = new RegExp('^[0-9]{10}$');
        if (!phoneNumberPattern1.test(this.state.phoneNumber)) {
            isValid = false;
            this.setState({ phoneNumberErr: "Phone Number must be of digits and 10 characters" });
        } else {
            this.setState({ phoneNumberErr: "" });
            isValid = true;
        }


        return isValid;
    }

    render() {
        return (
            <Container className="p-3">
                <div className="text-center my-3">
                    <h2>MAKE APPLICATION</h2>
                </div>
                <Row>
                    <Col>
                        <Form onSubmit={this.saveCustomer} style={{ marginTop: '100px' }} >
                            <Form.Text style={{ color: 'red' }}>
                                {this.state.uniqueErr}
                            </Form.Text>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control placeholder="First Name" name="firstName" value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    <Form.Text style={{ color: 'red' }}>
                                        {this.state.firstNameErr}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    <Form.Text style={{ color: 'red' }}>
                                        {this.state.lastNameErr}
                                    </Form.Text>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridIdentityNumber">
                                <Form.Label>Identity Number</Form.Label>
                                <Form.Control placeholder="Identity Number" name="identityNumber" value={this.state.identityNumber} onChange={this.changeIdentityNumberHandler} />
                                <Form.Text style={{ color: 'red' }}>
                                    {this.state.identityNumberErr}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridSalary">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control placeholder="Salary" name="salary" value={this.state.salary} onChange={this.changeSalaryHandler} />
                                <Form.Text style={{ color: 'red' }}>
                                    {this.state.salaryErr}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control placeholder="Phone Number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler} />
                                <Form.Text style={{ color: 'red' }}>
                                    {this.state.phoneNumberErr}
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" >
                                Apply
                            </Button>
                        </Form>
                    </Col>
                    
                </Row>
            </Container>
        )
    }
}