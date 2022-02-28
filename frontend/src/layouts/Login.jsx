import React from 'react'
import { Navbar, Container, Button, Nav, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi';
import { GrUserSettings } from 'react-icons/gr';
import AuthenticationService from '../services/AuthenticationService';

export default function Login({ logOut }) {
    return (
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
    )
}
