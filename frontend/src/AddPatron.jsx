import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import styles from './Style.module.css';

function AddPatron() {
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Extracting form input values
        const patronDetails = {
            patron_name: event.target.elements.patron_name.value,
            email: event.target.elements.email.value,
            phone_number: event.target.elements.phone_number.value,
            address: event.target.elements.address.value,
        };
        // Making a POST request to add a new patron
        axios
            .post('http://localhost:8081/add-patron', patronDetails)
            .then((res) => {
                // Display success alert and reset the form
                alert('Patron Added Successfully');
                event.target.reset();
            })
            .catch((err) => alert('Failed to add Patron. Please try again later.'));
    };

    return (
        <div style={{ background: '#f2f2f2', minHeight: '100vh' }}>
            {/* Navbar for the Add Patron page */}
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Add Patron</Navbar.Brand>
                </Container>
            </Navbar>
            {/* Main container for the Add Patron page */}
            <Container className="my-4 p-4" style={{ background: 'white', borderRadius: '10px' }}>
                {/* Tab container for layout */}
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        {/* Column for displaying an image */}
                        <Col md={3} className="mx-auto">
                            <div className="ms-2 me-auto text-center">
                                <img
                                    src="./images/add-patron.png"
                                    alt="add books"
                                    style={{
                                        height: "400px",
                                        width: "400px",
                                    }}
                                />
                            </div>
                        </Col>
                        {/* Column for the form to add a new patron */}
                        <Col md={5} className="mx-auto">
                            {/* Form for adding a new patron */}
                            <Form onSubmit={handleSubmit}>
                                {/* Form input for Patron Name */}
                                <Form.Group className="mb-3" controlId="patron_name">
                                    <Form.Label>Patron Name <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Patron Name" required />
                                </Form.Group>
                                {/* Form input for Email */}
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" required />
                                </Form.Group>
                                {/* Form input for Phone Number */}
                                <Form.Group className="mb-3" controlId="phone_number">
                                    <Form.Label>Phone Number <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="number" placeholder="Enter Phone Number" required />
                                </Form.Group>
                                {/* Form input for Address */}
                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Label>Address <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter Address" required />
                                </Form.Group>
                                {/* Submit button for the form */}
                                <Button variant="primary" type="submit">
                                    Submit
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

export default AddPatron;
