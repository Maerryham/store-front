import { GetUsers } from '../../models/user';

const store = new GetUsers()

describe("GetUsers Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      firstname: 'mariam',
      lastname: 'lawal',
      password: 'password',
    });
    expect(result).toBeDefined();
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    
    expect(result[0]).toBeDefined();
    expect(result[0].id).toBe(1);
    expect(result[0].firstname).toBe('mariam');
    expect(result[0].lastname).toBe('lawal');
    expect(result[0].password).toContain('$2b$10');
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(1);
    expect(result.id).toBe(1);
    expect(result.firstname).toBe('mariam');
    expect(result.lastname).toBe('lawal');
    expect(result.password).toContain('$2b$10');
  });

  
});