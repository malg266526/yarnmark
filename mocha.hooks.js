export const mochaHooks = {
  afterEach(done) {
    // do something before every test
    console.log('afterEach');
    done();
  }
};
