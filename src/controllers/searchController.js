const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.searchBooks = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query parameter "q" is required' });
  }

  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { author: { contains: q, mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search books' });
  }
};
