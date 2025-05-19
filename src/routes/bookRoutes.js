const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createBook,
  getAllBooks,
  getBookById
} = require('../controllers/bookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management

 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author, genre]
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       500:
 *         description: Internal server error

 *   get:
 *     summary: Get all books with optional filters
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *         description: JSON string of filter object (e.g. {"author":"John"})
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of books
 *       400:
 *         description: Invalid filters
 *       500:
 *         description: Internal server error

 * /books/{id}:
 *   get:
 *     summary: Get book details by ID with average rating and reviews
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book details with reviews
 *       404:
 *         description: Book not found
 */

router.post('/books', auth, createBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);

module.exports = router;
