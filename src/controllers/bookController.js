const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  try {
    const book = await prisma.book.create({
      data: { title, author, genre, description }
    });
    res.status(201).json(book);
  } catch {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

exports.getAllBooks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let filters = {};
  const allowedFields = ['title', 'author', 'genre'];

  if (req.query.filters) {
    try {
      const parsedFilters = JSON.parse(req.query.filters);
      filters = Object.entries(parsedFilters).reduce((acc, [key, value]) => {
        if (allowedFields.includes(key)) {
          acc[key] = { contains: value, mode: 'insensitive' };
        }
        return acc;
      }, {});
    } catch (err) {
      return res.status(400).json({ error: 'Invalid filters format (must be valid JSON)' });
    }
  }

  try {
    const books = await prisma.book.findMany({
      where: filters,
      skip: +skip,
      take: +limit,
      orderBy: { createdAt: 'desc' }
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};


exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const reviews = await prisma.review.findMany({
      where: { bookId: id },
      skip: +skip,
      take: +limit,
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });

    const averageRating = await prisma.review.aggregate({
      where: { bookId: id },
      _avg: { rating: true }
    });

    res.json({ ...book, averageRating: averageRating._avg.rating || 0, reviews });
  } catch {
    res.status(500).json({ error: 'Failed to get book' });
  }
};
