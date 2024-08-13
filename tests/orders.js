const Order1 = {
  id: 1,
  petId: 99,
  quantity: 1,
  shipDate: "2024-05-23T09:13:13.324Z",
  status: "placed",
  complete: true,
};

const Order2 = {
  id: 291,
  petId: 97,
  quantity: 1,
  shipDate: "2024-05-23T09:13:13.324Z",
  status: "placed",
  complete: true,
};

const Order3 = {
  id: 3,
  petId: 98,
  quantity: 2,
  shipDate: "2024-05-23T09:13:13.324Z",
  status: "placed",
  complete: true,
};

async function addNewOrder(APIcontext, data) {
  const OrderPlaced = await APIcontext.post(
    "https://petstore.swagger.io/v2/store/order",
    {
      data: data,
    }
  );
  return OrderPlaced;
}

module.exports = { Order1, Order2, Order3, addNewOrder };
