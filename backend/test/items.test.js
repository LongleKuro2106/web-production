const request = require('supertest');
const app = require('../src/app');

describe('The GET items routes', () => {
  it('should return a list of items', async () => {
    const response = await request(app).get('/api/items');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: 'banana',
        quantity: 1,
      },
      {
        id: 2,
        name: 'apple',
        quantity: 2,
      },
      {
        id: 3,
        name: 'orange',
        quantity: 3,
      },
    ]);
  });

  it('should return 1 item when an valid id param is present', async () => {
    const response = await request(app).get('/api/items/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      {
        id: 1,
        name: 'banana',
        quantity: 1,
      },
    );
  });

  it('should return 404 when no items with the id was found', async () => {
    const response = await request(app).get('/api/users/1000');
    expect(response.statusCode).toBe(404);
  });
});

describe('The POST /api/items endpoint', () => {
  it('should create a new item', async () => {
    const newItem = {
      name: 'berry',
      quantity: 100,
    };

    const response = await request(app)
      .post('/api/items')
      .set('Content', 'application/json')
      .send(newItem);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual(newItem.name);
    expect(response.body.quantity).toEqual(newItem.quantity);
  });
});

describe('The PUT endpoint', () => {
  it('should update an existing item', async () => {
    const testItem = {
      name: 'pineapple',
      quantity: 20,
    };
    const createResponse = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .send(testItem);
    const postId = createResponse.body.id;

    const updateItem = {
      id: postId,
      name: 'peach',
      quantity: 30,
    };
    const response = await request(app)
      .put(`/api/items/${postId}`)
      .set('Content', 'application/json')
      .send(updateItem);
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBe(postId);
    expect(response.body.name).toEqual(updateItem.name);
    expect(response.body.quantity).toEqual(updateItem.quantity);
  });

  it('should return 404 status code for invalid phone id', async () => {
    const invalidItemInfo = {
      id: 130,
      name: 'peach',
      quantity: 30,
    };
    const response = await request(app)
      .put('/api/items')
      .set('Content', 'application/json')
      .send(invalidItemInfo);
    expect(response.statusCode).toBe(404);
  });
});

describe('The DELETE /api/items endpoint', () => {
  test('should delete the item by id', async () => {
    const item = {
      name: 'watermelon',
      quantity: 3,
    };
    const createResponse = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .send(item);
    const postId = createResponse.body.id;
    const response = await request(app)
      .delete(`/api/items/${postId}`)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(204);
  });

  it('should return 404 status code for non-existing phone id', async () => {
    const nonExistingId = 78348473443;
    const deleteResponse = await request(app)
      .delete(`/api/items/${nonExistingId}`)
      .set('Accept', 'application/json');
    expect(deleteResponse.status).toEqual(404);
  });
});
