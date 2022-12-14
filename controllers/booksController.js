function booksController(Book) {
  const post = (req, res) => {
    const book = new Book(req.body);

    if (!book.title) {
      res.status(400);
      return res.send('Title cannot be empty');
    }

    book.save((err) => {
      if (err) {
        return res.send(err);
      }
      res.status(201);
      return res.json(book);
    });
  };

  const get = (req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    });
  };

  return { post, get };
}

module.exports = booksController;
