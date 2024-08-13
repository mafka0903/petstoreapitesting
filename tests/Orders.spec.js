const { test, expect, request } = require("@playwright/test");

const { Order1, Order2, Order3, addNewOrder } = require("./orders");

test.describe.configure({ timeout: 120000 }); // встановлюємо загальний таймаут для всього describe блоку

let APIcontext;

test.beforeAll(async () => {
  APIcontext = await request.newContext();
});

test.afterAll(async () => {
  await APIcontext.dispose();
});

test("Return Pet Inventuries By Status", async () => {
  const petInventuries = await APIcontext.get(
    "https://petstore.swagger.io/v2/store/inventory"
  );
  const jsonResponse = await petInventuries.json();
  //await console.log(jsonResponse);
  expect(petInventuries.status()).toBe(200);

  expect(jsonResponse.avalible).not.toBeNull();
});

test("Order Placed", async () => {
  const OrderPlaced = await addNewOrder(APIcontext, Order1);
  const jsonResponse = await OrderPlaced.json();
  console.log(jsonResponse);
  expect(OrderPlaced.status()).toBe(200);
  expect(jsonResponse.id).toBe(1);
});

test("Find Order By ID", async () => {
  const OrderPlaced = await addNewOrder(APIcontext, Order2);
  const FindOrder = await APIcontext.get(
    "https://petstore.swagger.io/v2/store/order/2"
  );
  const jsonResponse = await FindOrder.json();
  console.log(jsonResponse);
  expect(jsonResponse.id).toBe(291);
  expect(jsonResponse.petId).toBe(97);
});

test("Delete Order", async () => {
  await addNewOrder(APIcontext, Order3);
  await APIcontext.delete("https://petstore.swagger.io/v2/store/order/3");
  const findOrderDeleted = await APIcontext.get(
    "https://petstore.swagger.io/v2/store/order/3"
  );
  const jsonResponse = await findOrderDeleted.json();
  console.log(jsonResponse);

  expect(jsonResponse.type).toBe("error");
  expect(jsonResponse.message).toBe("Order not found");
});
