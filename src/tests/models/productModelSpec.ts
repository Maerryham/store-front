import { Product, GetProducts } from '../../models/product';

const store = new GetProducts()

describe("GetProducts Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'Good Product',
      price: 250
    });
    expect(result).toEqual({
      id: 1,
      name: 'Good Product',
      price: '250'
    });
  });

  it('show method should return a list of product', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      name: 'Good Product',
      price: '250'
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      name: 'Good Product',
      price: '250'
    });
  });
});