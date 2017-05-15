const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const ContactService = require('../../app/api/contact/services/contact');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('contact service ', () => {
  let sinonSandbox;
  let mockServices;

  beforeEach(() => {
    mockServices = { logger: { info: () => {} } };
    sinonSandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sinonSandbox.restore();
    mockServices = null;
  });

  describe('constructor()', () => {
    it('should throw error when Logger object is missing', () => {
      mockServices = { };
      expect(() => new ContactService(mockServices)).to.throw(Error, /Missing parameter: logger/);
    });
  });

  it('should resolve promise after successfully getting contacts', (done) => {
    expect(new ContactService(mockServices).getAll()).to.be.fulfilled.and.notify(done);
  });
});
