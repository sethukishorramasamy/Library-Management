# Library-Management

# Admin signup is not available to prevent common users from creating an admin account

- **Admin Credentials**
  - Admin Email: admin@admin.com
  - Admin Password: Admin@123

# Library Management System

Welcome to the Library Management System, a full-stack application built with ReactJS for the frontend, NodeJS for the backend, and MySQL for the database. This system includes user authentication, allowing users to sign up, log in, and access their library page. Admins can manage the library, add new books, and perform CRUD operations.

## Features

- **User Authentication:**
  - Users can sign up, log in, and log out.
  - Admins have a separate login to access the admin panel.

- **Admin Library Management:**
  - Admins can add new books with details such as author name, book name, ISBN and description.
  - Admins can add new patrons with details such as patron name, phone number, email and address.
  - CRUD operations (Create, Read, Update, Delete) are available for books and patrons.
  - Admins can filter books and patrons with search feature.

- **User Library Page:**
  - Authenticated users can view books in their library.
  - Users can filter books with search feature.
  - Users can purchase books.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/sethukishorramasamy/Library-Management.git
    ```

2. Database
    ```bash
      Import a database(File attached in Email) to phpMyAdmin
    ```

3. XAMPP
    ```bash
    Install and start servers using XAMPP
    ```

4. Navigate to the project directory and install dependencies:

- **for frontend:**
    ```bash
    cd frontend
    npm instal
    npm start
    ```

- **for backend:**
    ```bash
    cd ..
    cd backend
    npm start
    ```