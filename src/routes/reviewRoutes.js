const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Book review management

 * /books/{id}/reviews:
 *   post:
 *     summary: Submit a review for a book
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating]
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added
 *       400:
 *         description: Already reviewed
 *       404:
 *         description: Book not found

 * /reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Review not found

 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */

router.post('/books/:id/reviews', auth, addReview);
router.put('/reviews/:id', auth, updateReview);
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;
