# ToDo-List App 📋

A full-stack ToDo List app I built with Node.js, Express, PostgreSQL, and EJS. It lets you add, edit, and delete tasks with data stored in a PostgreSQL database. Focused on learning backend routing, database queries, and server-side templating.

## Table of Contents

- [Features](#features)
- [Visual Demo](#visual-demo)
- [Folder Structure](#folder-structure)
- [How It Works](#how-it-works)
- [Dependencies](#dependencies)
- [Installation & Usage](#installation--usage)
- [Customization & Extensions](#customization--extensions)
- [Contributing](#contributing)

---

## Features

- **Add tasks:** Create new todo items with a form.  
- **Edit tasks:** Update existing task titles.  
- **Delete tasks:** Remove tasks you no longer need.  
- **PostgreSQL storage:** All tasks are saved in a PostgreSQL database.  
- **EJS UI:** Server-rendered UI with EJS templates.  
- **Connection pooling:** Uses a database pool for better performance.  
- **Parameterized queries:** Protects against SQL injection.  
- **Graceful shutdown:** Closes database connections on exit.  
- **Env-based config:** Uses environment variables via dotenv.


---
## Visual Demo

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

| Method | Endpoint | What it does | Details |
|--------|----------|--------------|---------|
| **GET** | `/` | Show all todos | Queries the database for all items ordered by ID and renders the main view with the todo list data. |
| **POST** | `/add` | Create a new todo | Accepts form data, inserts a new item into the database using parameterized queries, then redirects back to the homepage. |
| **POST** | `/edit` | Update a todo | Receives the item ID and new title from the edit form, updates the specific record in the database, and keeps data consistent. |
| **POST** | `/delete` | Delete a todo | Accepts the item ID, removes the record from the database, and the updated list is shown on the homepage. |


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

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_HOST` | Database host address | `localhost` |
| `DB_NAME` | Database name | `todolist` |
| `DB_PASSWORD` | Database password | `yourpassword` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `PORT` | Application port | `3000` |

So we create a `.env` file in the root directory:
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

## Customization & Extensions

- Tweak the layout and styles in `views/` and `public/` to match your own design.
- Add fields like due dates, priority, or tags by updating the schema and EJS templates.
- Implement search, filters (completed/pending), or sorting in your routes and views.
- Add basic auth so each user has their own todo list.
- Expose JSON endpoints so you can later plug in a React or Next.js frontend.

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Enjoy the ToDo-List App!**  