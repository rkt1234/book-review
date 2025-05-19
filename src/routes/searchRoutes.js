const express = require('express');
const router = express.Router();
const { searchBooks } = require('../controllers/searchController');

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search books by title or author

 * /search:
 *   get:
 *     summary: Search books (partial and case-insensitive)
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword for title or author
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Missing search query
 */

router.get('/search', searchBooks);

module.exports = router;
