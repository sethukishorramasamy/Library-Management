// imports
import React from 'react';
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

function Signup() {
    const navigate = useNavigate();

    // Function to handle user signup
    const handleSubmit = (event) => {
        event.preventDefault();
        // Extract user details from the form
        const userDetails = {
            user_name: event.target.elements.user_name.value,
            user_email: event.target.elements.user_email.value,
            user_password: event.target.elements.user_password.value
        };

        // Check if password and confirm password match
        if (event.target.elements.user_password.value !== event.target.elements.user_confirm_password.value) {
            alert('Password and confirm password do not match');
        } else {
            // Make a POST request to the server for user signup
            axios
                .post('http://localhost:8081/signup', userDetails)
                .then((res) => {
                    // If signup is successful, navigate to the login page
                    navigate('/login');
                    alert('User registered Successfully. Please Login.');
                    event.target.reset();
                })
                .catch((err) => alert('Failed to signup. Please try again later.'));
        }
    };

    return (
        <div style={{ background: '#f2f2f2', minHeight: '100vh' }}>
            {/* Navbar */}
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>User Signup</Navbar.Brand>
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
                                    src="./images/signup.png"
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
                            {/* Signup Form */}
                            <Form onSubmit={handleSubmit}>

                                {/* Name */}
                                <Form.Group className="mb-3" controlId="user_name">
                                    <Form.Label>Name <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" required />
                                </Form.Group>

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

                                {/* Confirm Password */}
                                <Form.Group className="mb-3" controlId="user_confirm_password">
                                    <Form.Label>Confirm Password <span className={styles.requiredfield}> *</span></Form.Label>
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
                                    Signup
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

                            {/* Login Button */}
                            <div className="mt-2 text-center">
                                <p className="mb-2"
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        color: "gray"
                                    }}>
                                    Already have an account?
                                    {' '}
                                    <Button variant="outline-primary" type="submit" href="/login">
                                        Login
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

export default Signup;
