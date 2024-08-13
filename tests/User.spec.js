const { test, expect, request } = require("@playwright/test");

const {
  User1,
  User2,
  User3,
  User4,
  User5,
  User6,
  CreateUser,
} = require("./user");

test.describe.configure({ timeout: 120000 }); // встановлюємо загальний таймаут для всього describe блоку

let APIcontext;

test.beforeAll(async () => {
  APIcontext = await request.newContext();
});

test.afterAll(async () => {
  await APIcontext.dispose();
});

test("Create Users List", async () => {
  const usersArray = await APIcontext.post(
    "https://petstore.swagger.io/v2/user/createWithList",
    {
      data: [User1, User2, User3],
    }
  );
  const jsonResponse = await usersArray.json();
  console.log(jsonResponse);
  expect(usersArray.status()).toBe(200);
  expect(jsonResponse.message).toBeDefined();
  const getUserByName = await APIcontext.get(
    "https://petstore.swagger.io/v2/user/kate1234"
  );
  const responseBody = await getUserByName.text();
  console.log(responseBody);
  expect(getUserByName.status()).toBe(200);
  expect(responseBody).toContain("kate1234");
});

test("Update User", async () => {
  const createNewUser = await CreateUser(APIcontext, User4);
  expect(createNewUser.status()).toBe(200);

  const updateUser = await APIcontext.put(
    "https://petstore.swagger.io/v2/user/Jane1234",
    {
      data: {
        id: 4,
        username: "Jane1234",
        firstName: "Jane",
        lastName: "Scott",
        email: "jane1234@gmail.com",
        password: "jane12345",
        phone: "0505555555",
        userStatus: 1,
      },
    }
  );
  expect(updateUser.status()).toBe(200);

  const getUserByName = await APIcontext.get(
    "https://petstore.swagger.io/v2/user/Jane1234"
  );
  const getResponseBody = await getUserByName.json();
  console.log(getResponseBody);
  expect(getUserByName.status()).toBe(200);

  expect(getResponseBody.lastName).toBe("Scott");
});

test("Delete User", async () => {
  const createNewUser = await CreateUser(APIcontext, User5);
  expect(createNewUser.status()).toBe(200);

  const deleteUser = await APIcontext.delete(
    "https://petstore.swagger.io/v2/user/Sonya1234"
  );
  expect(deleteUser.status()).toBe(200);

  const getUserByName = await APIcontext.get(
    "https://petstore.swagger.io/v2/user/Sonya1234"
  );
  const jsonResponse = await getUserByName.json();
  console.log(jsonResponse);
  expect(jsonResponse.message).toBe("User not found");
});

test("Login And Logout", async () => {
  const createNewUser = await CreateUser(APIcontext, User6);
  expect(createNewUser.status()).toBe(200);

  const logIn = await APIcontext.get(
    "https://petstore.swagger.io/v2/user/login?username=josh1234&password=josh12345"
  );
  const jsonResponse = await logIn.json();
  console.log(jsonResponse);
  expect(jsonResponse.message).toContain("logged in user session");

  const logOut = await APIcontext.get(
    "https://petstore.swagger.io/v2/user/logout"
  );
  const jsonResponseLogout = await logOut.json();
  console.log(jsonResponseLogout);
  expect(logOut.status()).toBe(200);
});
