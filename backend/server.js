// declarations
const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// db creation
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

// user signup
app.post('/signup', async (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [req.body.user_name, req.body.user_email, req.body.user_password];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// add patron
app.post('/add-patron', async (req, res) => {
    const sql = "INSERT INTO patron_list (`name`, `email`, `phone_number`, `address`) VALUES (?)";
    const values = [req.body.patron_name, req.body.email, req.body.phone_number, req.body.address];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// user login
app.post('/login',
    (req, res) => {
        const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
        db.query(sql, [req.body.user_email, req.body.user_password], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data);
        });
    });

// admin login
app.post('/admin-login',
    (req, res) => {
        const sql = "SELECT * FROM admin_login WHERE `email` = ? AND `password` = ?";
        db.query(sql, [req.body.email, req.body.password], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            if (data.length > 0) {
                return res.json("Success");
            } else {
                return res.json("failed");
            }
        });
    });

// add book
app.post('/add-book', async (req, res) => {
    const sql = "INSERT INTO book_list (`book_name`, `author`, `ISBN`, `Description`) VALUES (?)";
    const values = [req.body.book_name, req.body.author, req.body.isbn, req.body.description];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// add patron
app.post('/add-patron', async (req, res) => {
    const sql = "INSERT INTO patron_list (`name`, `email`, `phone_number`, `address`) VALUES (?)";
    const values = [req.body.patron_name, req.body.email, req.body.phone_number, req.body.address];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// delete book from a list
app.delete("/delete-book/:id", (req, res) => {
    let sql = `DELETE FROM book_list WHERE id = ${req.params.id}`;
    db.query(sql, (err, data) => {
        if (err) {
            return console.error(err.message);
        }
        res.status(200).send(data);
    });
});

// delete patron from a list
app.delete("/delete-patron/:id", (req, res) => {
    let sql = `DELETE FROM patron_list WHERE id = ${req.params.id}`;
    db.query(sql, (err, data) => {
        if (err) {
            return console.error(err.message);
        }
        res.status(200).send(data);
    });
});

// update book details
app.put('/update-book/:id', (req, res) => {
    // Implement your database update logic here
    const updateQuery = 'UPDATE book_list SET book_name=?, author=?, ISBN=?, description=? WHERE id=?';
    const values = [req.body.book_name, req.body.author_name, req.body.isbn, req.body.description, req.body.id];

    db.query(updateQuery, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating book details' });
        } else {
            return res.status(200).json({ message: 'Book details updated successfully' });
        }
    });
});

// update patron details
app.put('/update-patron/:id', (req, res) => {
    const updateQuery = 'UPDATE patron_list SET name=?, email=?, phone_number=?, address=? WHERE id=?';
    const values = [req.body.patron_name, req.body.patron_email, req.body.patron_phone, req.body.patron_address, req.body.id];

    console.log('Updated Patron Details:', values);

    db.query(updateQuery, values, (err, data) => {
        if (err) {
            console.error(err); // Log the error
            return res.status(500).json({ error: 'Error updating patron details' });
        } else {
            return res.status(200).json({ message: 'Patron details updated successfully' });
        }
    });
});

//fetch book details
app.get('/admin-home-fetch-books', (req, res) => {
    const sql = "SELECT * FROM book_list";
    db.query(sql, [], (err, data) => {
        if (err) {
            return res.json(err);
        }
        const updatedData = data.map((item, index) => ({
            ...item,
            index: index + 1
        }));
        return res.json(updatedData);
    });
});

//fetch patron details
app.get('/admin-home-fetch-patron', (req, res) => {
    const sql = "SELECT * FROM patron_list";
    db.query(sql, [], (err, data) => {
        if (err) {
            return res.json(err);
        }
        const updatedData = data.map((item, index) => ({
            ...item,
            index: index + 1
        }));
        return res.json(updatedData);
    });
});

// listener
app.listen(8081, () => {
    console.log("listening to library management software..");
});