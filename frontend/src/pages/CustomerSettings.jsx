import React, { Component } from 'react'
import { Container, Table, Button, Col } from 'react-bootstrap'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { FaUndo, FaTrash, FaPlusCircle } from 'react-icons/fa';
import ApplicationService from '../services/ApplicationService';
import CustomerService from '../services/CustomerService';

class CustomerSettings extends Component {

    constructor(props) {
        super(props)

        this.state = {
            applications: [],
            customers: []
        }

        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
    }

    deleteCustomer(id){
            CustomerService.deleteCustomer(id).then( res => {
            this.setState({applications: this.state.applications.filter(application => application.customer.id !== id)});
        });
    }
    updateCustomer(id){
        this.props.history.push("/add-customer/" + id);
    }
    addCustomer(){
        this.props.history.push('/add-customer/_add');
    }

    componentDidMount() {
         ApplicationService.getApplications().then((res) => {
            this.setState({ applications: res.data });
        });
    }

    render() {
        return (
            <Container className="p-3">
                <div className="text-center my-3">
                    <h2>APPLICATION LIST</h2>
                </div>
                <Col>
                    <Button variant="primary" onClick={this.addCustomer} value="Submit" className="mx-3"> <FaPlusCircle /> Add Customer </Button>
                </Col>
                <Table striped hover className="my-3">
                    <thead>
                        <tr className="text-center">
                            <th colSpan="5">Customer Details</th>
                            <th colSpan="2">Application Details</th>
                            <th colSpan="2">Transaction</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Identity Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Salary</th>
                            <th>Phone Number</th>
                            <th>Credit Status</th>
                            <th>Credit Limit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.applications.map(
                                application =>
                                    <tr key={application.id}>
                                        <td> {application.customer.identityNumber} </td>
                                        <td> {application.customer.firstName}</td>
                                        <td> {application.customer.lastName}</td>
                                        <td> {application.customer.salary}</td>
                                        <td> {application.customer.phoneNumber}</td>
                                        <td>{application.creditResult === "CONFIRMED" ? <AiFillCheckCircle color="green" /> : <AiFillCloseCircle color="red" />} {application.creditResult} </td>
                                        <td> {application.creditLimit} &#8378;</td>
                                        <td>
                                            <Button type="submit" onClick={ () => this.updateCustomer(application.customer.id)} variant="secondary"> <FaUndo /> Update </Button>
                                            <Button onClick={() => this.deleteCustomer(application.customer.id)} variant="danger" type="submit" value="Submit" className="mx-3"> <FaTrash /> Delete </Button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default CustomerSettings