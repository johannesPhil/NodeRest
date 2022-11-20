const should = require('should');
const sinon = require('sinon');
const booksController = require('../controllers/booksController');

describe('Books Controller Test:', () => {
  describe('Post Request', () => {
    it('should not allow empty title', () => {
      class Book {
        constructor(book) {
          this.save = () => {};
        }
      }

      const req = {
        body: {
          author: 'Jon',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = booksController(Book);
      controller.post(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Request: ${res.status.args[0][0]}`);
      res.send.calledWith('Title cannot be empty').should.equal(true);
    });
  });
});
