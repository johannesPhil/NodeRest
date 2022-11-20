/* eslint-disable no-param-reassign */

const express = require('express');

const booksController = require('../controllers/booksController');

const routes = (Book) => {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter.route('/books').post(controller.post).get(controller.get);

  // Middleware for retrieving books based on ID
  bookRouter.use('/books/:id', (req, res, next) => {
    const { id } = req.params;

    Book.findById(id, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  bookRouter
    .route('/books/:id')
    .get((req, res) => {
      const returnBook = req.book.toJSON();
      returnBook.link = {};
      const genre = req.book.genre.replace(' ', '%20');
      returnBook.link.genre = `http://${req.headers.host}/api/books?genre=${genre}`;
      res.json(returnBook);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.genre = req.body.genre;
      book.author = req.body.author;
      book.read = req.body.read;

      book.save();
      return res.json(book);
    })
    .patch((req, res) => {
      const { book } = req;
      /* eslint-disable no-underscore-dangle */
      if (req.body._id) {
        /* eslint-disable no-underscore-dangle */
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];

        book[key] = value;
      });
      book.save((err) => {
        if (err) {
          return res.send(err);
        }

        return res.json(book);
      });
    })
    .delete((req, res) => {
      const { book } = req;

      book.remove((err) => {
        if (err) {
          return res.send(err);
        }

        return res.sendStatus(204);
      });
    });

  return bookRouter;
};

module.exports = routes;
