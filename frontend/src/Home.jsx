// imports
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminHome() {
    // State for storing book data
    const [bookItems, setBookItems] = useState([]);
    const [filteredBookItems, setFilteredBookItems] = useState([]);
    const [bookSearchString, setBookSearchString] = useState('');
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

    // Fetch book data from the server on component mount
    useEffect(() => {
        fetch('http://localhost:8081/admin-home-fetch-books')
            .then(response => response.json())
            .then(data => {
                setBookItems(data);
                setFilteredBookItems(data);
            })
            .catch(error => console.error('Error fetching data:', error));

        // fetch logged user details
        setUserName(localStorage.getItem('username'));
        setUserEmail(localStorage.getItem('email'));
        setUserId(localStorage.getItem('userId'));
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

    // logout and clear keys
    function logout() {
        navigate('/');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
    }

    // Function to handle add to purchase list
    const addToPurchaseList = (bookDetail) => {
        // Extract user details from the form
        const bookDetails = {
            book_name: bookDetail.book_name,
            author: bookDetail.author,
            isbn: bookDetail.ISBN,
            description: bookDetail.Description,
            user_id: userId
        };
        axios
            .post('http://localhost:8081/add-to-purchase-list', bookDetails)
            .then((res) => {
                alert('Added to Purchase List');
            })
            .catch((err) => alert('Failed to add book into Purchase list. Please try again later.'));
    };

    return (
        <div>
            {/* Admin home navbar */}
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#">Library</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/purchase-list">Purchase List</Nav.Link>
                            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Admin home navbar */}

            {/* List item */}
            <Container className="pt-4">
                {/* logged in user details */}
                <ListGroup className='mt-3 mb-3'>
                    <ListGroup.Item variant="success" action className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div>Logged in @ {userName} | {userEmail}</div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>

                {/* tabs */}
                <Tabs defaultActiveKey="books_tab" transition={false} id="noanim-tab-example" className="mb-3">
                    <Tab eventKey="books_tab" title="Books">
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#bookslink1">
                            <Row>
                                {/* Item list */}
                                <Col sm={6}>
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
                                                    href={`#bookslink${item.index}`}
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
                                {/* Item details */}
                                <Col sm={6}>
                                    <Tab.Content>
                                        {filteredBookItems.map((item) => (
                                            <Tab.Pane eventKey={`#bookslink${item.index}`} key={item.index}>
                                                <Card style={{ width: 'auto' }}>
                                                    <Card.Body>
                                                        <Card.Title>{item.book_name}</Card.Title>
                                                        <hr />
                                                        <Card.Text className="mb-2">
                                                            <span className='text-muted'>Author Name:</span> {item.author}
                                                        </Card.Text>
                                                        <Card.Text className="mb-2">
                                                            <span className='text-muted'>ISBN Number:</span> {item.ISBN}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            <span className='text-muted'>Description:</span> {item.Description}
                                                        </Card.Text>
                                                        <Button variant="outline-warning" onClick={() => addToPurchaseList(item)}>Add to Purchase List</Button>{' '}
                                                    </Card.Body>
                                                </Card>
                                            </Tab.Pane>
                                        ))}
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Tab>
                </Tabs>
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

export default AdminHome;
