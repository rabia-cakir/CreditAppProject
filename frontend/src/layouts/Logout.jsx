import React from 'react'
import { Navbar, Container, Button, Nav, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi';
import { GrUserSettings } from 'react-icons/gr';
import AuthenticationService from '../services/AuthenticationService';

export default function Logout({ logIn }) {
    return (
        <Nav>
            <Nav.Link as={Link} to='/login'>
                <Button variant="outline-primary" style={{ fontWeight: 'bold' }}>Login</Button>
            </Nav.Link>
        </Nav>
    )
}
