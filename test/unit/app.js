'use strict';

const app  = require(`${PACKAGE_ROOT}/src/app`).handler;
const chai = require('chai');
const fs   = require('fs');

const LambdaTester = require('lambda-tester');

const expect = chai.expect;

describe('Event handler', function() {
  describe('detect face (human)', function() {
    const eventData = {};

    before(async function() {
      const base64Img = fs.readFileSync(`${PACKAGE_ROOT}/test/images/human.jpg`, {encoding: 'base64'});

      eventData.body = JSON.stringify({file: base64Img});
    });

    it('found', async function() {
      await LambdaTester(app)
        .event(eventData)
        .expectResult(result => {

          // Asertions.
          expect(result.headers).to.have.property('Cache-Control');
          expect(result.headers['Cache-Control']).to.equal('max-age=0');

          expect(result.headers).to.have.property('Content-Type');
          expect(result.headers['Content-Type']).to.equal('application/json');

          expect(result.statusCode).to.be.an('number');
          expect(result.statusCode).to.equal(200);

          const data = JSON.parse(result.body);

          expect(data).to.be.an('object');
          expect(data.faces).to.be.an('array').that.is.not.empty;
        });
    });
  });

  describe('detect face (robot)', function() {
    const eventData = {};

    before(async function() {
      const base64Img = fs.readFileSync(`${PACKAGE_ROOT}/test/images/robot.jpg`, {encoding: 'base64'});

      eventData.body = JSON.stringify({file: base64Img});
    });

    it('not found', async function() {
      await LambdaTester(app)
        .event(eventData)
        .expectResult(result => {

          // Asertions.
          expect(result.headers).to.have.property('Cache-Control');
          expect(result.headers['Cache-Control']).to.equal('max-age=0');

          expect(result.headers).to.have.property('Content-Type');
          expect(result.headers['Content-Type']).to.equal('application/json');

          expect(result.statusCode).to.be.an('number');
          expect(result.statusCode).to.equal(200);

          const data = JSON.parse(result.body);

          expect(data).to.be.an('object');
          expect(data.faces).to.be.an('array').that.is.empty;
        });
    });
  });
});
