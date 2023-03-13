import { OrderProductMini, Status, GetOrderProduct } from '../../models/order_product';

const store = new GetOrderProduct()

describe("GetOrderProduct Model", () => {
  it('should have an addProductToUserOrder method', () => {
    expect(store.addProductToUserOrder).toBeDefined();
  });

  it('should have a productsInUserOrder method', () => {
    expect(store.productsInUserOrder).toBeDefined();
  });


  it('addProductToUserOrder method should add a product to an order', async () => {
    const result = await store.addProductToUserOrder({
      order_id: 1,
      product_id: 1,
      quantity: 5,
    });
    expect(result).toEqual({
      id: 1,
      quantity : 300,
      order_id: 1,
      product_id: 2
    });
  });

  it('productsInUserOrder should return a list of orders', async () => {
    const result = await store.productsInUserOrder(1);
    expect(result).toEqual([{
      id: 1,
      name: "Good Product 1",
      price: "200",
      order_id: "1",
      quantity: 1,
      user_id: "1",
      product_id: "1",
      status: "active" as Status
    }]);
  });
});