// imports
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

function AddBook() {
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Extracting form input values
        const bookDetails = {
            book_name: event.target.elements.book_name.value,
            author: event.target.elements.author.value,
            isbn: event.target.elements.isbn.value,
            description: event.target.elements.description.value,
        };
        // Making a POST request to add a new book
        axios
            .post('http://localhost:8081/add-book', bookDetails)
            .then((res) => {
                // Display success alert and reset the form
                alert('Book Added Successfully');
                event.target.reset();
            })
            .catch((err) => alert('Failed to add Book. Please try again later.'));
    };

    return (
        <div style={{ background: '#f2f2f2', minHeight: '100vh' }}>
            {/* Navbar for the Add Book page */}
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Add Book</Navbar.Brand>
                </Container>
            </Navbar>
            {/* Main container for the Add Book page */}
            <Container className="my-4 p-4" style={{ background: 'white', borderRadius: '10px' }}>
                {/* Tab container for layout */}
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        {/* Column for displaying an image */}
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
                        {/* Column for the form to add a new book */}
                        <Col md={5} className="mx-auto">
                            {/* Form for adding a new book */}
                            <Form onSubmit={handleSubmit}>
                                {/* Form input for Book Name */}
                                <Form.Group className="mb-3" controlId="book_name">
                                    <Form.Label>Book Name <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Book Name" required />
                                </Form.Group>
                                {/* Form input for Author */}
                                <Form.Group className="mb-3" controlId="author">
                                    <Form.Label>Author <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Author" required />
                                </Form.Group>
                                {/* Form input for ISBN */}
                                <Form.Group className="mb-3" controlId="isbn">
                                    <Form.Label>ISBN <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter ISBN" required />
                                </Form.Group>
                                {/* Form input for Description */}
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Description <span className={styles.requiredfield}> *</span></Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter Description" required />
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

export default AddBook;
