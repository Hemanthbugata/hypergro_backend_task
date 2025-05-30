# Hypergro Backend Task

A Node.js backend project for managing and querying real estate property data, using Express, MongoDB, Redis, and CSV data import.

---

## Features

- RESTful API for property listings
- CSV data ingestion and conversion
- User authentication (JWT)
- Caching with Redis
- Data storage with MongoDB
- TypeScript support

---

## Tech Stack

- **Node.js** & **Express**: Server and API
- **TypeScript**: Type safety
- **MongoDB**: Database for property and user data
- **Redis**: Caching layer
- **csvtojson**: CSV parsing
- **bcryptjs**: Password hashing
- **jsonwebtoken**: Authentication

---

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
   PORT=5000
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

### Redis Installation

#### On Ubuntu/Debian:
```sh
sudo apt update
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

#### On Mac (Homebrew):
```sh
brew install redis
brew services start redis
```

#### On Windows:
- Download from [https://github.com/microsoftarchive/redis/releases](https://github.com/microsoftarchive/redis/releases)
- Extract and run `redis-server.exe`

---

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

---

## API Endpoints

### User Authentication

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | `/user/signup`   | Register a new user    |
| POST   | `/user/login`    | Login and receive JWT  |

---

### Property

| Method | Endpoint                    | Description                    |
|--------|-----------------------------|--------------------------------|
| POST   | `/property/create`          | Create a new property (auth)   |
| GET    | `/property/`                | List all properties            |
| GET    | `/property/search`          | Advanced property search       |
| GET    | `/property/:id`             | Get property by MongoDB ID     |
| PUT    | `/property/:id`             | Update property (auth, owner)  |
| DELETE | `/property/:id`             | Delete property (auth, owner)  |

---

### Favorites

| Method | Endpoint                      | Description                          |
|--------|-------------------------------|--------------------------------------|
| POST   | `/favorites/:propertyId`      | Add property to favorites (auth)     |
| GET    | `/favorites/`                 | Get user's favorite properties (auth)|
| DELETE | `/favorites/:propertyId`      | Remove property from favorites (auth)|

---

### Recommendations

| Method | Endpoint                  | Description                                 |
|--------|---------------------------|---------------------------------------------|
| POST   | `/recommendations/recommend` | Recommend a property to another user (auth)|
| GET    | `/recommendations/received`  | Get properties recommended to user (auth)  |

---

## Example Advanced Search Queries

Use these with:  
`GET http://localhost:5000/property/search?...`

1. **Search by City**
   ```
   /property/search?city=Coimbatore
   ```

2. **Search by State and Type**
   ```
   /property/search?state=Karnataka&type=Villa
   ```

3. **Search by Price Range**
   ```
   /property/search?minPrice=20000000&maxPrice=30000000
   ```

4. **Search by Bedrooms and Bathrooms**
   ```
   /property/search?bedrooms=5&bathrooms=2
   ```

5. **Search by Amenities (multiple)**
   ```
   /property/search?amenities=lift,clubhouse,security
   ```

6. **Search by Furnished Status**
   ```
   /property/search?furnished=Furnished
   ```

7. **Search by Available From Date**
   ```
   /property/search?availableFrom=2025-10-14
   ```

8. **Search by Tags (multiple)**
   ```
   /property/search?tags=gated-community,corner-plot
   ```

9. **Search by Verified Properties**
   ```
   /property/search?isVerified=true
   ```

10. **Search by Listing Type (rent/sale)**
    ```
    /property/search?listingType=rent
    ```

---

## Environment Variables

| Variable      | Description                  |
|---------------|-----------------------------|
| MONGODB_URI   | MongoDB connection string   |
| REDIS_URL     | Redis connection string     |
| JWT_SECRET    | Secret for JWT tokens       |
| PORT          | Port to run the server      |

---

## License

[ISC](LICENSE)
