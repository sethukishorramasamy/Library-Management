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
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

function AdminHome() {

    const [bookItems, setBookItems] = useState([]);
    const [filteredBookItems, setFilteredBookItems] = useState([]);
    const [patronItems, setPatronItems] = useState([]);
    const [filteredPatronItems, setFilteredPatronItems] = useState([]);
    const [bookSearchString, setBookSearchString] = useState('');
    const [patronSearchString, setPatronSearchString] = useState('');
    const [bookDeleted, setBookDeleted] = useState(true);
    const [patronDeleted, setPatronDeleted] = useState(true);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editedBookName, setEditedBookName] = useState('');
    const [editedAuthor, setEditedAuthor] = useState('');
    const [editedISBN, setEditedISBN] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedBookID, setEditedBookID] = useState('');

    const [showPatronEditModal, setShowPatronEditModal] = useState(false);
    const [editedPatronName, setEditedPatronName] = useState('');
    const [editedPatronPhoneNumber, setEditedPatronPhoneNumber] = useState('');
    const [editedPatronEmail, setEditedPatronEmail] = useState('');
    const [editedPatronAddress, setEditedPatronAddress] = useState('');
    const [editedPatronID, setEditedPatronID] = useState('');

    useEffect(() => {
        if (bookDeleted) {
            setBookDeleted(false);
            fetch('http://localhost:8081/admin-home-fetch-books').then(response => response.json())
                .then(data => {
                    setBookItems(data);
                    setFilteredBookItems(data);
                }).catch(error => console.error('Error fetching data:', error));
        }
        if (patronDeleted) {
            setPatronDeleted(false);
            fetch('http://localhost:8081/admin-home-fetch-patron').then(response => response.json())
                .then(data => {
                    setPatronItems(data);
                    setFilteredPatronItems(data);
                }).catch(error => console.error('Error fetching data:', error));
        }
    }, [bookDeleted, patronDeleted]);

    function deleteBook(id) {
        const isConfirmed = window.confirm('Are you sure you want to delete this book?');
        if (isConfirmed) {
            axios.delete(`http://localhost:8081/delete-book/${id}`).then(res => {
                setBookDeleted(true);
                alert('Book deleted successfully');
            }).catch(err => {
                alert('Error while deleting book. Please try again later.');
                console.error(err);
            });
        }
    }

    function deletePatron(id) {
        const isConfirmed = window.confirm('Are you sure you want to delete this patron?');
        if (isConfirmed) {
            axios.delete(`http://localhost:8081/delete-patron/${id}`).then(res => {
                setPatronDeleted(true);
                alert('Patron deleted successfully');
            }).catch(err => {
                alert('Error while deleting patron. Please try again later.');
                console.error(err);
            });
        }
    }

    const handleBookChange = (event) => {
        event.preventDefault();
        const inputSearchString = event.target.value;
        setBookSearchString(inputSearchString);
        const filteredBooks = bookItems.filter((book) => {
            const bookName = book.book_name || '';
            const authorName = book.author || '';
            const ISBNid = book.ISBN || '';
            return bookName.toLowerCase().includes(inputSearchString.toLowerCase()) || authorName.toLowerCase().includes(inputSearchString.toLowerCase()) || ISBNid.toLowerCase().includes(inputSearchString.toLowerCase());
        });
        setFilteredBookItems(filteredBooks);
    };

    const handlePatronChange = (event) => {
        event.preventDefault();
        const inputSearchString = event.target.value;
        setPatronSearchString(inputSearchString);
        const filteredPatrons = patronItems.filter((patron) => {
            const patronName = patron.name || '';
            const phoneNumber = patron.phone_number !== null ? patron.phone_number.toString() : ''; // Convert to string if not null
            return patronName.toLowerCase().includes(inputSearchString.toLowerCase()) || phoneNumber.includes(inputSearchString);
        });
        setFilteredPatronItems(filteredPatrons);
    };

    const handleShowEditModal = (book) => {
        setEditedBookName(book.book_name);
        setEditedAuthor(book.author);
        setEditedISBN(book.ISBN);
        setEditedDescription(book.Description);
        setEditedBookID(book.id);
        setShowEditModal(true);
    };

    const handleShowPatronEditModal = (patron) => {
        setEditedPatronName(patron.name);
        setEditedPatronPhoneNumber(patron.phone_number);
        setEditedPatronEmail(patron.email);
        setEditedPatronAddress(patron.address);
        setEditedPatronID(patron.id);
        setShowPatronEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setShowPatronEditModal(false);
    };

    const handleSaveEditedBook = () => {
        const updatedBookDetails = {
            id: editedBookID,
            book_name: editedBookName,
            author_name: editedAuthor,
            isbn: editedISBN,
            description: editedDescription
        };
        setShowEditModal(false);
        axios.put(`http://localhost:8081/update-book/${editedBookID}`, updatedBookDetails)
            .then((res) => {
                alert('Book details updated successfully');
                setBookDeleted(true);
            })
            .catch((err) => {
                alert('Error updating book details. Please try again later.');
                console.error(err);
            });
    };

    const handleSaveEditedPatron = () => {
        const updatedPatronDetails = {
            id: editedPatronID,
            patron_name: editedPatronName,
            patron_email: editedPatronEmail,
            patron_phone: editedPatronPhoneNumber,
            patron_address: editedPatronAddress
        };
        setShowPatronEditModal(false);
        axios.put(`http://localhost:8081/update-patron/${editedPatronID}`, updatedPatronDetails)
            .then((res) => {
                alert('Patron details updated successfully');
                setPatronDeleted(true);
                console.log(res);
            })
            .catch((err) => {
                alert('Error updating patron details. Please try again later.');
                console.error(err);
            });
    };


    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#">Library Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/add-book">Add Book</Nav.Link>
                            <Nav.Link href="/add-patron">Add Patron</Nav.Link>
                            <Nav.Link href="/">Logout</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="pt-4">

                <Tabs defaultActiveKey="books_tab" transition={false} id="noanim-tab-example" className="mb-3">
                    <Tab eventKey="books_tab" title="Books">
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#bookslink1">
                            <Row>
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
                                                <ListGroup.Item action href={`#bookslink${item.index}`} className="d-flex justify-content-between align-items-start">
                                                    <div className="ms-2 me-auto">
                                                        <div>{item.book_name}</div>
                                                        {item.author}
                                                    </div>
                                                    <Badge bg="light" pill>
                                                        <span className='text-black-50'>{item.ISBN}</span>
                                                    </Badge>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>) :
                                        <ListGroup className='mt-5'>
                                            <div className="ms-2 me-auto" style={{
                                                width: "100%",
                                            }}>
                                                <div className="ms-2 me-auto text-center">
                                                    <img
                                                        src="./images/books.png"
                                                        alt="no books"
                                                        style={{
                                                            height: "220px",
                                                            width: "220px",
                                                        }}
                                                    />
                                                    <p style={{
                                                        fontSize: "20px",
                                                    }}>No books found</p>
                                                </div>
                                            </div>
                                        </ListGroup>
                                    }
                                </Col>
                                <Col sm={6}>
                                    <Tab.Content>
                                        {filteredBookItems.map((item) => (
                                            <Tab.Pane eventKey={`#bookslink${item.index}`}>
                                                <Card style={{ width: 'auto' }}>
                                                    <Card.Body>
                                                        <Card.Title>{item.book_name}</Card.Title>
                                                        <hr />
                                                        <Card.Text className="mb-2"><span className='text-muted'>Author Name:</span> {item.author}</Card.Text>
                                                        <Card.Text className="mb-2"><span className='text-muted'>ISBN Number:</span> {item.ISBN}</Card.Text>
                                                        <Card.Text><span className='text-muted'>Description:</span> {item.Description}</Card.Text>
                                                        <Button variant="outline-primary" onClick={() => handleShowEditModal(item)}>Edit Book Details</Button>{' '}
                                                        <Button variant="outline-danger" onClick={() => deleteBook(item.id)}>Delete Book</Button>{' '}
                                                    </Card.Body>
                                                </Card>
                                            </Tab.Pane>
                                        ))}
                                    </Tab.Content>
                                </Col>
                            </Row>

                            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Book Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="editedBookName">
                                            <Form.Label>Book Name</Form.Label>
                                            <Form.Control className="mb-3"
                                                type="text"
                                                value={editedBookName}
                                                onChange={(e) => setEditedBookName(e.target.value)}
                                            />
                                            <Form.Control className="mb-3"
                                                type="text"
                                                value={editedAuthor}
                                                onChange={(e) => setEditedAuthor(e.target.value)}
                                            />
                                            <Form.Control className="mb-3"
                                                type="text"
                                                value={editedISBN}
                                                onChange={(e) => setEditedISBN(e.target.value)}
                                            />
                                            <Form.Control className="mb-3"
                                                type="text"
                                                value={editedDescription}
                                                onChange={(e) => setEditedDescription(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEditModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSaveEditedBook}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Tab.Container>
                    </Tab>

                    <Tab eventKey="patrons_tab" title="Patrons">
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#patronlink1">
                            <Row>
                                <Col sm={6}>
                                    <Form className="d-flex mt-2">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search by Patron Name or Phone Number.."
                                            className="me-2"
                                            aria-label="Searchpatron"
                                            value={patronSearchString}
                                            onChange={handlePatronChange}
                                        />
                                    </Form>
                                    {filteredPatronItems.length > 0 ? (
                                        <ListGroup className='mt-3'>
                                            {filteredPatronItems.map((item) => (
                                                <ListGroup.Item action href={`#patronlink${item.index}`} className="d-flex justify-content-between align-items-start">
                                                    <div className="ms-2 me-auto">
                                                        <div>{item.name}</div>
                                                        {item.phone_number}
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>) :
                                        <ListGroup className='mt-5'>
                                            <div className="ms-2 me-auto" style={{
                                                width: "100%",
                                            }}>
                                                <div className="ms-2 me-auto text-center">
                                                    <img
                                                        src="./images/users.png"
                                                        alt="no books"
                                                        style={{
                                                            height: "170px",
                                                            width: "340px",
                                                        }}
                                                    />
                                                    <p style={{
                                                        fontSize: "20px",
                                                    }}>No Patron found</p>
                                                </div>
                                            </div>
                                        </ListGroup>
                                    }

                                </Col>
                                <Col sm={6}>
                                    <Tab.Content>
                                        {filteredPatronItems.map((item) => (
                                            <Tab.Pane eventKey={`#patronlink${item.index}`}>
                                                <Card style={{ width: 'auto' }}>
                                                    <Card.Body>
                                                        <Card.Title>{item.name}</Card.Title>
                                                        <hr />
                                                        <Card.Text className="mb-2"><span className='text-muted'>Phone Number: </span> {item.phone_number}</Card.Text>
                                                        <Card.Text><span className='text-muted'>Email:</span> {item.email}</Card.Text>
                                                        <Card.Text><span className='text-muted'>Address:</span> {item.address}</Card.Text>
                                                        <Button variant="outline-primary" onClick={() => handleShowPatronEditModal(item)}>Edit Patron Details</Button>{' '}
                                                        <Button variant="outline-danger" onClick={() => deletePatron(item.id)}>Delete Patron</Button>{' '}
                                                    </Card.Body>
                                                </Card>
                                            </Tab.Pane>
                                        ))}
                                    </Tab.Content>

                                </Col>
                            </Row>

                            <Modal show={showPatronEditModal} onHide={handleCloseEditModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Patron Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>

                                        <Form.Group controlId="editedPatronName">
                                            <Form.Label>Patron Name</Form.Label>
                                            <Form.Control className="mb-3"
                                                type="text"
                                                value={editedPatronName}
                                                onChange={(e) => setEditedPatronName(e.target.value)}
                                            />
                                            <Form.Control className="mb-3"
                                                type="text"
                                                value={editedPatronPhoneNumber}
                                                onChange={(e) => setEditedPatronPhoneNumber(e.target.value)}
                                            />
                                            <Form.Control className="mb-3"
                                                type="text"
                                                value={editedPatronEmail}
                                                onChange={(e) => setEditedPatronEmail(e.target.value)}
                                            />
                                            <Form.Control className="mb-3"
                                                type="text"
                                                value={editedPatronAddress}
                                                onChange={(e) => setEditedPatronAddress(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEditModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSaveEditedPatron}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>


                        </Tab.Container>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    )
}
export default AdminHome