// imports
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import React, { useState, useEffect } from 'react';

function PurchaseList() {
    // State for storing book data
    const [bookItems, setBookItems] = useState([]);
    const [filteredBookItems, setFilteredBookItems] = useState([]);
    const [bookSearchString, setBookSearchString] = useState('');

    useEffect(() => {
        // fetch user id for identifying purchase list for this specific user
        const userId = localStorage.getItem('userId');

        // fetch purchase list
        fetch(`http://localhost:8081/fetch-purchase-list?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setBookItems(data);
                setFilteredBookItems(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    // Function to handle book search
    const handleBookChange = (event) => {
        event.preventDefault();
        const inputSearchString = event.target.value;

        // Update the state with the current input value
        setBookSearchString(inputSearchString);

        // Filter books based on the search string
        const filteredBooks = bookItems.filter((book) => {
            const bookName = book.book_name || '';
            const authorName = book.author || '';
            const ISBNid = book.ISBN || '';

            return (
                bookName.toLowerCase().includes(inputSearchString.toLowerCase()) ||
                authorName.toLowerCase().includes(inputSearchString.toLowerCase()) ||
                ISBNid.toLowerCase().includes(inputSearchString.toLowerCase())
            );
        });

        // Update the state with the filtered books
        setFilteredBookItems(filteredBooks);
    };

    return (

        <div>
            {/* Admin home navbar */}
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#">Purchase List</Navbar.Brand>
                </Container>
            </Navbar>
            {/* Admin home navbar */}

            {/* List item */}
            <Container className="pt-4">
                {/* logged in user details */}
                <ListGroup className='mt-3 mb-3'>
                    <ListGroup.Item variant="success" action className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div>You can collect books by showing showing purchase list to library staff</div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>

                {/* body */}
                <Row>
                    {/* Item list */}
                    <Col sm={12}>
                        <Form className="d-flex mt-2">
                            <Form.Control
                                type="search"
                                placeholder="Search by Book Name, Author or ISBN.."
                                className="me-2"
                                aria-label="Searchbooks"
                                value={bookSearchString}
                                onChange={handleBookChange}
                            />
                        </Form>

                        {filteredBookItems.length > 0 ? (
                            <ListGroup className='mt-3'>
                                {filteredBookItems.map((item) => (
                                    <ListGroup.Item
                                        action
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div>{item.book_name}</div>
                                            {item.author}
                                        </div>
                                        <Badge bg="light" pill>
                                            <span className='text-black-50'>{item.ISBN}</span>
                                        </Badge>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <ListGroup className='mt-5'>
                                <div className="ms-2 me-auto" style={{ width: "100%" }}>
                                    <div className="ms-2 me-auto text-center">
                                        <img
                                            src="./images/books.png"
                                            alt="no books"
                                            style={{ height: "220px", width: "220px" }}
                                        />
                                        <p style={{ fontSize: "20px" }}>No books found</p>
                                    </div>
                                </div>
                            </ListGroup>
                        )}
                    </Col>
                    {/* Item list */}
                </Row>
            </Container>
            {/* List item */}
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

export default PurchaseList;
