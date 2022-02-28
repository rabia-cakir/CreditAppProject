import React, { Component } from 'react'
import { Card, Button, Container, Form } from 'react-bootstrap'
import AuthenticationService from '../services/AuthenticationService';


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'admin',
            password: 'password',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .login(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.successfulLogin(this.state.username, this.state.password)
                this.props.history.push('/')
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }
    render() {
        return (
            <Container className="p-3">

                <div className="text-center my-3">
                    <h2>APPLICATION SYSTEM LOGIN</h2>
                </div>

                <Card style={{ marginTop: '50px' }}>
                    <Card.Header className="text-center" style={{ backgroundColor: '' }}>System User Login</Card.Header>
                    <Card.Body>
                        <Form read>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username" value={this.state.username} readOnly/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password} readOnly/>
                            </Form.Group>
                            <Button variant="primary" onClick={this.loginClicked}>
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default Login