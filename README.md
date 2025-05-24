# URL Shortener Microservice

A simple URL shortener service built with Node.js, Express, and MongoDB.

## Features

- Create short URLs from long URLs
- Redirect to original URLs using short URL
- URL validation and DNS lookup
- Click tracking for URLs
- API documentation with Swagger

## Project Architecture

The project follows a clean, modular architecture with clear separation of concerns:

```
url-shortener/
├── src/
│   ├── config/        # Configuration files
│   │   ├── database.js    # MongoDB configuration
│   │   ├── environment.js # Environment variables
│   │   └── swagger.js     # Swagger documentation setup
│   ├── controllers/   # Request handlers
│   │   └── url.controller.js
│   ├── models/       # Database models
│   │   └── url.model.js
│   ├── routes/       # API routes
│   │   └── url.routes.js
│   ├── services/     # Business logic
│   │   └── url.service.js
│   ├── middleware/   # Express middleware
│   │   └── error.middleware.js
│   └── utils/        # Utility functions
│       └── url.validator.js
├── tests/           # Test files
└── public/          # Static files
```

### Separation of Responsibilities

- **Config Layer**: Manages application configuration and environment variables
  - Database connection settings
  - Environment variables
  - Swagger documentation configuration

- **Controller Layer**: Handles HTTP requests and responses
  - Request validation
  - Response formatting
  - Error handling

- **Service Layer**: Contains business logic
  - URL validation and processing
  - Database operations
  - Domain-specific logic

- **Model Layer**: Defines database schemas and models
  - MongoDB schemas
  - Data validation
  - Database interactions

- **Middleware Layer**: Handles cross-cutting concerns
  - Error handling
  - Request processing
  - Authentication (future)

- **Utils Layer**: Contains reusable helper functions
  - URL validation
  - Common utilities

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Url-Shortener-Microservice---FCC-Project.git
cd Url-Shortener-Microservice---FCC-Project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string.

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start at http://localhost:3000

## API Documentation

Once the server is running, you can access the API documentation at:
http://localhost:3000/api-docs

## API Endpoints

- `POST /api/shorturl` - Create a short URL
  - Body: `url` (the original URL to shorten)
  - Returns: `{ original_url, short_url }`

- `GET /api/shorturl/:shorturl` - Redirect to original URL
  - Params: `shorturl` (the short URL identifier)
  - Redirects to the original URL or returns error

## License

MIT