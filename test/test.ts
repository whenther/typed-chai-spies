import chai = require('chai');
import spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;

describe('simple test', () => {
  it('should spy on a function', () => {
    const spy = chai.spy();

    spy();

    expect(spy).to.have.been.called.once();
  });
});
