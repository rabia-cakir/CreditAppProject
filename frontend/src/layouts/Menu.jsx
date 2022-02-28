import React, { Component } from 'react'
import { Navbar, Container, Button, Nav, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi';
import { GrUserSettings } from 'react-icons/gr';
import AuthenticationService from '../services/AuthenticationService';

class Menu extends Component {


    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <Navbar collapseOnSelect className="p-3" bg="light" expand="lg" style={{ fontWeight: 'bold' }}>
                <Container>
                    <Navbar.Brand as={Link} to='/' className="text-primary" style={{ fontSize: '24px' }}>Credit Application System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/'>Make Application</Nav.Link>
                            <Nav.Link as={Link} to='/application-status'>Application Status</Nav.Link>
                        </Nav>
                        {isUserLoggedIn === false ?
                            <Nav>
                                <Nav.Link as={Link} to='/login'>
                                    <Button variant="outline-primary" style={{ fontWeight: 'bold' }}>Login</Button>
                                </Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" style={{ fontWeight: 'bold' }}>
                                        System User
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="1" as={Link} to='/customer-settings' ><GrUserSettings /> Customer Settings </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="2" as={Link} to='/login' onClick={AuthenticationService.logout}><FiLogOut /> Logout </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        )
    }
}

export default Menu