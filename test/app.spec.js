const app = require('../src/app');

describe('App', () => {

  it('GET / responds with 403 when no authentication is provided', () => {
    return (
      supertest(app)
        .get('/')
        .expect(403, {
          error: 'Unauthorized request' 
        })
    );
  });

});