const User1 = {
  id: 1,
  username: "kate1234",
  firstName: "Katrine",
  lastName: "Jonce",
  email: "kate1234@gmail.com",
  password: "kate12345",
  phone: "0502222222",
  userStatus: 1,
};

const User2 = {
  id: 2,
  username: "sasha1234",
  firstName: "Sasha",
  lastName: "Birkin",
  email: "sasha1234@gmail.com",
  password: "sasha12345",
  phone: "0503333333",
  userStatus: 1,
};

const User3 = {
  id: 3,
  username: "dan1234",
  firstName: "Daniel",
  lastName: "Garsia",
  email: "dan1234@gmail.com",
  password: "dan12345",
  phone: "0504444444",
  userStatus: 1,
};

const User4 = {
  id: 4,
  username: "Jane1234",
  firstName: "Jane",
  lastName: "Ostin",
  email: "jane1234@gmail.com",
  password: "jane12345",
  phone: "0505555555",
  userStatus: 1,
};

const User5 = {
  id: 5,
  username: "Sonya1234",
  firstName: "Sonya",
  lastName: "Techer",
  email: "sonya1234@gmail.com",
  password: "sonya12345",
  phone: "0506666666",
  userStatus: 1,
};

const User6 = {
  id: 6,
  username: "josh1234",
  firstName: "Josh",
  lastName: "Tomson",
  email: "josh1234@gmail.com",
  password: "josh12345",
  phone: "05077777777",
  userStatus: 1,
};

async function CreateUser(APIcontext, data) {
  const CreateUser = await APIcontext.post(
    "https://petstore.swagger.io/v2/user",
    {
      data: data,
    }
  );
  return CreateUser;
}
module.exports = { User1, User2, User3, User4, User5, User6, CreateUser };
