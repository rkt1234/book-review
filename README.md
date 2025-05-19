# 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, **Prisma**, and **JWT Authentication** for managing books, user reviews, and search capabilities. Designed to demonstrate backend development fundamentals.

---

## 🛠️ Project Setup Instructions

### 1. **Clone the repository**

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Setup environment variables**

Create a `.env` file with the following:

```env
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
PORT=3000
SERVER_URL=http://localhost:3000
CLIENT_URL=http://localhost:3001
```

### 4. **Prisma setup**

```bash
npx prisma migrate dev --name init
npx prisma db seed    # seeds 20 users, 15 books, and reviews
```

### 5. **Start the development server**

```bash
npm run dev
```

---

## 🎓 How to Run Locally

Ensure your database is up (e.g. PostgreSQL or SQLite). Then:

```bash
npm install
npx prisma migrate dev
npm run dev
```

Visit `http://localhost:3000/api-docs` for Swagger API documentation.

---

## 🔍 API Endpoints (Example curl requests)

### ✉️ Authentication

```bash
# Signup
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```

### 📚 Books

```bash
# Create book (auth required)
curl -X POST http://localhost:3000/api/books \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Clean Code","author":"Martin","genre":"Programming"}'

# Get all books (with filters)
curl -G http://localhost:3000/api/books \
  --data-urlencode 'filters={"author":"Martin"}' \
  --data-urlencode "page=1" \
  --data-urlencode "limit=10"

# Get book details by ID
curl -X GET http://localhost:3000/api/books/<BOOK_ID>
```

### 🖋️ Reviews

```bash
# Add a review
curl -X POST http://localhost:3000/api/books/<BOOK_ID>/reviews \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"comment":"Great read!"}'

# Update a review
curl -X PUT http://localhost:3000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"rating":4,"comment":"Still good, but lengthy."}'

# Delete a review
curl -X DELETE http://localhost:3000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

### 🔍 Search

```bash
# Search by title or author
curl -X GET "http://localhost:3000/api/search?q=clean"
```

---

## 🧐 Design Decisions & Assumptions

* Prisma ORM used for clean, type-safe database access
* JWT for stateless auth, stored in `Authorization` headers
* Users can leave only one review per book
* Pagination defaults: `page=1`, `limit=10` (books), `limit=5` (reviews)
* Search is partial and case-insensitive on `title` and `author`
* Swagger UI hosted at `/api-docs`
* Flexible CORS using env-based `CLIENT_URL`

---

## 🔹 Database Schema Overview

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  reviews   Review[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Book {
  id          String   @id @default(uuid())
  title       String
  author      String
  genre       String
  description String?
  reviews     Review[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Review {
  id        String   @id @default(uuid())
  rating    Int
  comment   String?
  userId    String
  bookId    String
  user      User     @relation(fields: [userId], references: [id])
  book      Book     @relation(fields: [bookId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, bookId])
}
```

---

## 🌐 API Docs

Access via Swagger UI at:

```
http://localhost:3000/api-docs
```

---

## 📄 Submission

Push your repo to GitHub and share the public link as instructed.
