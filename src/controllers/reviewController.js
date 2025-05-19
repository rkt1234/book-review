const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addReview = async (req, res) => {
  const { id: bookId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.userId;

  try {
    // Check if book exists
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    // Check if user already reviewed
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId
        }
      }
    });
    if (existingReview) return res.status(400).json({ error: 'You already reviewed this book' });

    // Create review
    const review = await prisma.review.create({
      data: { rating, comment, userId, bookId }
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.userId;

  try {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    if (review.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    const updated = await prisma.review.update({
      where: { id },
      data: { rating, comment }
    });

    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    if (review.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.review.delete({ where: { id } });
    res.json({ message: 'Review deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
