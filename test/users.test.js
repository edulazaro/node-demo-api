const chai = require('chai');
const { describe, it } = require('mocha');
const app = require('../app');
const chaiHttp = require('chai-http');
const db = require("../models");

const expect = chai.expect;

chai.use(chaiHttp);

const thisDb = db;
beforeEach(async () => {
  await thisDb.sequelize.sync({ force: true });
  await thisDb.sequelize.getQueryInterface().bulkInsert('users',
    [
      {
        id: 0,
        email: "test1@test.dev",
        given_name: "Edu",
        family_name: "Lazaro",
        created: new Date().toDateString(),
      },
      {
        id: 1,
        email: "test2@test.dev",
        given_name: "Daniel",
        family_name: "LaRusso",
        created: new Date().toDateString(),
      },
      {
        id: 2,
        email: "test3@test.dev",
        given_name: "Hideo",
        family_name: "Miyagi",
        created: new Date().toDateString(),
      },
    ], {});
});

describe('/GET users', () => {
  it('It should return all users', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array').to.have.lengthOf(3);
        done();
      });
  });
});

describe('/GET users/:user', () => {
  it('It should fail returning an unexistent user', (done) => {
    chai.request(app)
      .get('/api/users/3')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
  it('It should return the requested user', (done) => {
    chai.request(app)
      .get('/api/users/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('givenName');
        expect(res.body.data).to.have.property('familyName');
        expect(res.body.data.id).to.equal(1);
        expect(res.body.data.email).to.equal('test2@test.dev');
        expect(res.body.data.givenName).to.equal('Daniel');
        expect(res.body.data.familyName).to.equal('LaRusso');
        done();
      });
  });
});

describe('/POST users', () => {

  it('It should not create a user with an invalid email', (done) => {
    const data = {
      email: "wrongemailtest.dev",
      givenName: "Fake",
      familyName: "User",
    };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('It should not create a user with an invalid givenName', (done) => {
    const data = {
      email: "wrongemailtest.dev",
      givenName: "",
      familyName: "User",
    };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('It should not create a user with an invalid familyName', (done) => {
    const data = {
      email: "wrongemailtest.dev",
      givenName: "Fake",
      familyName: "",
    };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('It should create a user', (done) => {
    const data = {
      email: "valid@email.com",
      givenName: "Fake",
      familyName: "User",
    };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('givenName');
        expect(res.body.data).to.have.property('familyName');
        expect(res.body.data.email).to.equal('valid@email.com');
        expect(res.body.data.givenName).to.equal('Fake');
        expect(res.body.data.familyName).to.equal('User');
        done();
      });
  });
});


describe('/UPDATE users', () => {


  it('It should not patch a unexistent user', (done) => {
    const data = {
      email: "anothervalid@email.com",
    };
    chai.request(app)
      .patch('/api/users/5')
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('It should not patch a user with an invalid email', (done) => {
    const data = {
      email: "wrongemailtest.dev",
    };
    chai.request(app)
      .patch('/api/users/1')
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('It should not patch a  a user with an invalid givenName', (done) => {
    const data = {
      givenName: "",
    };
    chai.request(app)
      .patch('/api/users/1')
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('It should not patch a user with an invalid familyName', (done) => {
    const data = {
      familyName: "",
    };
    chai.request(app)
      .patch('/api/users/1')
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('It should patch a user', (done) => {
    const data = {
      email: "anothervalid@email.com",
      givenName: "NewFakeName",
      familyName: "NewFakeSurname",
    };
    chai.request(app)
      .patch('/api/users/1')
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('givenName');
        expect(res.body.data).to.have.property('familyName');
        expect(res.body.data.email).to.equal('anothervalid@email.com');
        expect(res.body.data.givenName).to.equal('NewFakeName');
        expect(res.body.data.familyName).to.equal('NewFakeSurname');
        done();
      });
  });
});