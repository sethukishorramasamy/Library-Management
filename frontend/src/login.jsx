// imports
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Style.module.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Login() {

    const navigate = useNavigate();

    // Function to handle user login
    const handleSubmit = (event) => {
        event.preventDefault();
        // Extract user details from the form
        const userDetails = {
            user_email: event.target.elements.user_email.value,
            user_password: event.target.elements.user_password.value
        };

        // Make a POST request to the server for user login
        axios
            .post('http://localhost:8081/login', userDetails)
            .then((res) => {
                // If user found, navigate to home page
                if (res.data.length > 0) {
                    navigate('/home');
                    localStorage.setItem('userId', res.data[0].id);
                    localStorage.setItem('username', res.data[0].name);
                    localStorage.setItem('email', res.data[0].email);
                } else {
                    // If no users found, reset the form and show an alert
                    event.target.reset();
                    alert('No users found. Please Signup and try again.');
                }
            })
            .catch((err) => alert('Failed to login. Please try again later.'));
    };

    return (
        <div style={{ background: '#f2f2f2', minHeight: '100vh' }}>
            {/* Navbar */}
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>User Login</Navbar.Brand>
                </Container>
            </Navbar>
            {/* Body */}
            <Container className="my-4 p-4" style={{ background: 'white', borderRadius: '10px' }}>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        {/* Image */}
                        <Col md={3} className="mx-auto">
                            <div className="ms-2 me-auto text-center">
                                <img
                                    src="./images/signin.png"
                                    alt="add books"
                                    style={{
                                        height: "400px",
                                        width: "400px",
                                    }}
                                />
                            </div>
                        </Col>
                        {/* Input Fields */}
                        <Col md={5} className="mx-auto">
                            {/* Login Form */}
                            <Form onSubmit={handleSubmit}>

                                {/* Email */}
                                <Form.Group className="mb-3" controlId="user_email">
                                    <Form.Label>Email <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" required />
                                </Form.Group>

                                {/* Password */}

                                <Form.Group className="mb-3" controlId="user_password">
                                    <Form.Label>Password <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password"
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                        title="Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character."
                                        required
                                    />
                                </Form.Group>

                                {/* Submit Button */}
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>

                            {/* Or Divider */}
                            <div className="mt-3 text-center">
                                <div className="d-flex align-items-center">
                                    <hr className="flex-grow-1" style={{ borderTop: "1px solid gray" }} />
                                    <span
                                        className="mx-2"
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            color: "gray",
                                        }}
                                    >or</span>
                                    <hr className="flex-grow-1" style={{ borderTop: "1px solid gray" }} />
                                </div>
                            </div>

                            {/* Signup Button */}
                            <div className="mt-2 text-center">
                                <p className="mb-2"
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        color: "gray"
                                    }}>
                                    Do not have an account?
                                    {' '}
                                    <Button variant="outline-primary" type="submit" href="/signup">
                                        Signup
                                    </Button>
                                </p>
                            </div>
                        </Col>
                        {/* Form Column */}
                    </Row>
                </Tab.Container>
            </Container>
            {/* footer */}
            <Navbar fixed="bottom" expand="lg" bg="light" variant="dark">
                <Container className="text-center">
                    <div style={{ width: '100%' }}>
                        <p className='text-black'>Designed & Developed by Sethu Kishor</p>
                    </div>
                </Container>
            </Navbar>
        </div >
    );
}

export default Login;
