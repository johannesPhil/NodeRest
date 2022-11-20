const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';
const app = require('../server');

const Book = mongoose.model('Book');
const agent = request.agent(app);
describe('Book Crud Test', () => {
  describe('Book Creation Test', () => {
    it(`should return the 'read' value and '_id' of book`, (done) => {
      const bookPost = { title: 'Sample Book', author: 'Me', genre: 'Fiction' };
      agent
        .post('/api/books')
        .send(bookPost)
        .expect(200)
        .end((err, results) => {
          results.body.read.should.equal(false);
          results.body.should.have.property('_id');
          Object.keys(results.body).length.should.equal(6);
          done();
        });
    });
  });
  // describe('Books  Put Test', () => {
  //   it('should return the same values as the body', (done) => {
  //       agent.put('/api/books/:id')
  //   });
  // });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
