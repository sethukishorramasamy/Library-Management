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
import styles from './Style.module.css'; // Assuming this is a custom CSS module
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const userDetails = {
            user_email: event.target.elements.user_email.value,
            user_password: event.target.elements.user_password.value
        };

        // Sending a POST request to the server for admin login
        axios.post('http://localhost:8081/admin-login', userDetails)
            .then((res) => {
                // Checking if any users are found
                console.log(res)
                if (res.data.length > 0) {
                    // If users are found, navigate to the admin home page
                    navigate('/admin-home');
                } else {
                    // If no users are found, reset the form and show an alert
                    event.target.reset();
                    alert('No users found. Please Signup and try again.');
                }
            })
            .catch((err) => alert('Failed to login. Please try again later.'));
    };

    return (
        <div style={{ background: '#f2f2f2', minHeight: '100vh' }}>
            {/* Navbar for Admin Login */}
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Admin Login</Navbar.Brand>
                </Container>
            </Navbar>

            {/* Container for the login form */}
            <Container className="my-4 p-4" style={{ background: 'white', borderRadius: '10px' }}>
                {/* Tab Container for layout */}
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        {/* Left Column - Image */}
                        <Col md={3} className="mx-auto">
                            <div className="ms-2 me-auto text-center">
                                <img
                                    src="./images/add-books.png"
                                    alt="add books"
                                    style={{
                                        height: "400px",
                                        width: "400px",
                                    }}
                                />
                            </div>
                        </Col>

                        {/* Right Column - Login Form */}
                        <Col md={5} className="mx-auto">
                            {/* Form for admin login */}
                            <Form onSubmit={handleSubmit}>
                                {/* Email Input */}
                                <Form.Group className="mb-3" controlId="user_email">
                                    <Form.Label>Email <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" required />
                                </Form.Group>

                                {/* Password Input */}
                                {/* <Form.Group className="mb-3" controlId="user_password">
                                    <Form.Label>Password <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" required />
                                </Form.Group> */}
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
                        </Col>
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
        </div>
    );
}

export default AdminLogin;
