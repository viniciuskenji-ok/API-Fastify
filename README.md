# Book API

A RESTful API for managing a collection of books built with Fastify, Prisma, and PostgreSQL.

## Overview

This API allows you to create, read, update, and delete books in your personal library. You can track which books you're currently reading, mark favorites, and indicate completed books.

## Technologies

- **Fastify**: A high-performance, low overhead web framework for Node.js
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **PostgreSQL**: Relational database for data storage
- **TypeScript**: Type-safe JavaScript
- **Zod**: Schema validation library

## Prerequisites

- Node.js (18.x or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd booking-api
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory and add your database URL:
```
DATABASE_URL="postgresql://username:password@localhost:5432/bookdb?schema=public"
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

The server will start on port 3000.

## Database Schema

The Book model has the following fields:

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier (primary key) |
| title | String | Book title |
| author | String | Book author |
| description | String | Book description (optional) |
| isFavorite | Boolean | Whether the book is marked as favorite (default: false) |
| isReading | Boolean | Whether you're currently reading the book (default: false) |
| isFinished | Boolean | Whether you've finished reading the book (default: false) |

## API Endpoints

### Create a book
- **URL**: `/book`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "description": "Book description"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "bookId": "uuid-of-created-book"
  }
  ```

### Get all books
- **URL**: `/book`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "books": [
      {
        "id": "uuid",
        "title": "Book Title",
        "author": "Author Name",
        "description": "Book description",
        "isFavorite": false,
        "isReading": false,
        "isFinished": false
      },
      // ...more books
    ]
  }
  ```

### Get a specific book
- **URL**: `/book/:bookId`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "book": {
      "id": "uuid",
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book description",
      "isFavorite": false,
      "isReading": false,
      "isFinished": false
    }
  }
  ```

### Update a book status
- **URL**: `/book/:bookId`
- **Method**: `PATCH`
- **Request Body**:
  ```json
  {
    "isFavorite": true,
    "isReading": true,
    "isFinished": false
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "message": "Book updated"
  }
  ```

### Delete a book
- **URL**: `/book/:bookId`
- **Method**: `DELETE`
- **Response**: `204 No Content`

## Error Handling

The API returns appropriate HTTP status codes:

- `400`: Bad Request - When the client sends an invalid request
- `404`: Not Found - When a requested book doesn't exist
- `500`: Internal Server Error - When an unexpected error occurs

## Development

### Project Structure

```
booking-api/
├── prisma/
│   ├── migrations/         # Database migrations
│   └── schema.prisma       # Prisma schema
├── src/
│   └── http/
│       ├── lib/
│       │   └── prisma.ts   # Prisma client
│       ├── routes/
│       │   ├── createBook.ts
│       │   ├── getBook.ts
│       │   ├── updateBook.ts
│       │   └── deleteBook.ts
│       └── server.ts       # Main server file
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── tsconfig.json
```

### Running Migrations

After making changes to the `schema.prisma` file, run:

```bash
npx prisma migrate dev --name your-migration-name
```

### Generating Prisma Client

After changing your database schema, update the Prisma client:

```bash
npx prisma generate
```

## Future Improvements

Some potential enhancements for this API:

1. Authentication and authorization
2. Additional book metadata (genre, publication date, etc.)
3. User ratings and reviews
4. Book categories/collections
5. Search and filtering capabilities
6. Pagination for book listings

## License

ISC
