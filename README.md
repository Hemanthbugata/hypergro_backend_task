# Hypergro Backend Task

A Node.js backend project for managing and querying real estate property data, using Express, MongoDB, Redis, and CSV data import.

## Features

- RESTful API for property listings
- CSV data ingestion and conversion
- User authentication (JWT)
- Caching with Redis
- Data storage with MongoDB
- TypeScript support

## Tech Stack

- **Node.js** & **Express**: Server and API
- **TypeScript**: Type safety
- **MongoDB**: Database for property and user data
- **Redis**: Caching layer
- **csvtojson**: CSV parsing
- **bcryptjs**: Password hashing
- **jsonwebtoken**: Authentication

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance
- Redis instance

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd Hypergro-backend-task
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add:
   ```
   MONGODB_URI=mongodb://localhost:27017/hypergro
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **Build the project:**
   ```sh
   npm run build
   ```

5. **Start the server:**
   ```sh
   npm start
   ```
   Or for development with hot-reload:
   ```sh
   npm run dev
   ```

## Project Structure

```
.
├── src/
│   ├── server.ts
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── utils/
├── properties.csv
├── package.json
├── tsconfig.json
└── README.md
```

## Scripts

- `npm run dev` – Start server with hot-reload (development)
- `npm run build` – Compile TypeScript to JavaScript
- `npm start` – Start server from compiled code

## Data

- **properties.csv**: Contains property listings with fields like ID, description, type, location, features, price, etc.
- Data is loaded and converted to JSON using `csvtojson`.

## API Endpoints

> _Update this section with your actual endpoints and their usage._

- `GET /properties` – List all properties
- `GET /properties/:id` – Get property by ID
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive JWT
- `GET /search` – Search/filter properties

## Environment Variables

| Variable      | Description                  |
|---------------|-----------------------------|
| MONGODB_URI   | MongoDB connection string   |
| REDIS_URL     | Redis connection string     |
| JWT_SECRET    | Secret for JWT tokens       |
| PORT          | Port to run the server      |

## License

[ISC](LICENSE)

---

