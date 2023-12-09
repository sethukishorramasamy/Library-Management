// Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Button from 'react-bootstrap/Button';

export const LandingPage = () => {
    return (
        // Main container with flexbox for layout
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Navbar */}
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    {/* Navbar title */}
                    <Navbar.Brand href="#">Library Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    {/* Navbar links */}
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {/* Admin login link */}
                            <Nav.Link href="/admin-login">Login as Admin</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Body container */}
            <Container fluid className="text-center flex-grow-1 d-flex flex-column justify-content-center">
                {/* Heading */}
                <h1 style={{ fontSize: "50px", fontWeight: 550 }}>Welcome to the Library Management System</h1>
                {/* Subheading */}
                <p style={{ fontSize: "23px", color: "gray" }} className='mt-1'>Explore our collection of books and manage your library activities with ease.</p>
                {/* Action buttons */}
                <div className='mt-4'>
                    {/* Login and Signup buttons */}
                    <Button variant="primary" style={{ fontSize: "18px" }} href="/login">Login as User</Button>{' '}
                    <Button variant="outline-success" style={{ fontSize: "18px" }} href="/signup">Signup as User</Button>{' '}
                </div>
            </Container>
            {/* footer */}
            <Navbar fixed="bottom" expand="lg" bg="light" variant="dark">
                <Container className="text-center">
                    <div style={{ width: '100%' }}>
                        <p className='text-black'>Designed & Developed by Sethu Kishor</p>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};
