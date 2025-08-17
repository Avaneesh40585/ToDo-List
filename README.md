# ToDo-List App 📋

A modern, full-stack ToDo List application built with Node.js, Express, PostgreSQL, and EJS. This project demonstrates clean server-side architecture, database management, and dynamic web templating with a focus on simplicity and maintainability.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Folder Structure](#folder-structure)
- [How It Works](#how-it-works)
- [Dependencies](#dependencies)
- [Installation & Usage](#installation--usage)
- [Database Setup](#database-setup)
- [Environment Configuration](#environment-configuration)
- [API Endpoints](#api-endpoints)
- [Best Practices Implemented](#best-practices-implemented)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Add Tasks:** Create new todo items with a simple form interface
- **Edit Tasks:** Update existing task titles inline
- **Delete Tasks:** Remove completed or unwanted tasks instantly
- **Persistent Storage:** All data stored securely in PostgreSQL database
- **Clean UI:** Responsive design with EJS templating
- **Database Connection Pooling:** Efficient connection management for optimal performance
- **Parameterized Queries:** SQL injection protection with prepared statements
- **Graceful Shutdown:** Proper cleanup of database connections on app termination
- **Environment Variables:** Secure configuration management with dotenv

---
## Demo

You can test and use the application live here:
**[Launch The App!](https://todo-list-app-gllq.onrender.com/)** — Deployed and hosted on Render.

![ToDo-List Demo](https://github.com/user-attachments/assets/42575df0-be7a-4e50-857b-a42390ce6e30)

---

## Folder Structure
```
ToDo-List/
├── index.js              # Main server file with Express routes
├── package.json          # Dependencies and scripts
├── queries.sql           # Database schema and setup queries
├── .env                  # Environment variables (not tracked in git)
├── views/
│   ├── index.ejs         # Main todo list template
│   └── partials/
│       ├── header.ejs    # Common header component
│       └── footer.ejs    # Common footer component
└── public/
    ├── styles/
    │   └── main.css      # Application styling
    └── assets/
        └── icons/        # SVG icons for UI elements
```
---

## How It Works

### **1. Application Initialization**
The app starts by loading environment variables and establishing a PostgreSQL connection pool with optimized settings for concurrent connections.

### **2. Database Connection Management**
- Uses **pg.Pool** for efficient connection pooling
- Configured with min/max connections, idle timeout, and connection limits
- Implements graceful shutdown to properly close database connections

### **3. Route Handling**
The application provides four main routes:

**GET /** - Homepage that displays all todos
- Queries database for all items ordered by ID
- Renders the main view with todo list data

**POST /add** - Creates new todo items
- Accepts form data from the client
- Inserts new items into the database using parameterized queries
- Redirects back to homepage

**POST /edit** - Updates existing todo items
- Receives item ID and new title from edit form
- Updates specific record in database
- Maintains data integrity with transaction safety

**POST /delete** - Removes todo items
- Accepts item ID for deletion
- Removes record from database
- Automatically updates the displayed list

### **4. Template Rendering**
- **EJS templating engine** renders dynamic HTML
- Partials system for reusable components (header/footer)
- Server-side rendering for SEO optimization

### **5. Error Handling**
- Comprehensive try-catch blocks for database operations
- Proper error logging for debugging
- Graceful error recovery without app crashes

---

## Dependencies

Essential packages for this full-stack application:

- [`express`](https://expressjs.com/) - Fast, unopinionated web framework for Node.js
- [`pg`](https://node-postgres.com/) - PostgreSQL client for Node.js with connection pooling
- [`ejs`](https://ejs.co/) - Embedded JavaScript templating engine
- [`dotenv`](https://github.com/motdotla/dotenv) - Loads environment variables from .env file

Development dependencies:
- [`nodemon`](https://nodemon.io/) - Automatic server restart during development

---

## Installation & Usage

### **Prerequisites**
- Node.js (v16 or newer recommended)
- PostgreSQL (v12 or newer)
- npm (v8+) or yarn

### **Installation Steps**

1. **Clone the repository:**
```
git clone https://github.com/Avaneesh40585/ToDo-List.git
cd ToDo-List
```

2. **Install dependencies:**
```
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory:
```
DB_USER=your_database_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
PORT=3000
```

4. **Set up the database:**
```
# Connect to PostgreSQL and run the queries.sql file
psql -U your_username -d your_database -f queries.sql
```

5. **Start the application:**
```
nodemon index.js
```
6.	Open your browser and visit: 
```
http://localhost:3000
```

---

## Database Setup

The application uses PostgreSQL with the following schema:
```
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);
```

**Key Features:**
- **SERIAL ID:** Auto-incrementing primary key
- **VARCHAR title:** Task description with reasonable length limit
- **Proper indexing:** Optimized for common queries

---

## Environment Configuration

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_HOST` | Database host address | `localhost` |
| `DB_NAME` | Database name | `todolist` |
| `DB_PASSWORD` | Database password | `yourpassword` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `PORT` | Application port | `3000` |

---

## API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/` | Display all todos | None |
| `POST` | `/add` | Create new todo | `{ newItem: "Task description" }` |
| `POST` | `/edit` | Update existing todo | `{ updatedItemId: "1", updatedItemTitle: "New title" }` |
| `POST` | `/delete` | Delete todo | `{ deleteItemId: "1" }` |

---

## Best Practices Implemented

### **Security**
- **Parameterized queries** prevent SQL injection attacks
- **Environment variables** protect sensitive database credentials
- **Input validation** ready for implementation

### **Performance**
- **Connection pooling** for efficient database resource management
- **Minimal dependencies** for faster startup and reduced attack surface
- **Proper connection cleanup** prevents memory leaks

### **Code Quality**
- **Modern ES6+ syntax** with import/export statements
- **Separation of concerns** with organized route handling
- **Error handling** with comprehensive try-catch blocks
- **Consistent naming conventions** throughout the codebase

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

**Happy task managing! 🚀**




