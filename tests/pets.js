const MashaCat = {
  id: 99,
  category: {
    id: 99,
    name: "MashaCat",
  },
  name: "MashaCat",
  photoUrls: ["string"],
  tags: [
    {
      id: 99,
      name: "MashaCat",
    },
  ],
  status: "available",
};

const MashaParrot = {
  id: 98,
  category: {
    id: 98,
    name: "MashaParrot",
  },
  name: "MashaParrot",
  photoUrls: ["string"],
  tags: [
    {
      id: 98,
      name: "MashaParrot",
    },
  ],
  status: "available",
};

const MashaDog = {
  id: 97,
  category: {
    id: 97,
    name: "MashaDog",
  },
  name: "MashaDog",
  photoUrls: ["string"],
  tags: [
    {
      id: 97,
      name: "MashaDog",
    },
  ],
  status: "available",
};

const MashaMouse = {
  id: 96,
  category: {
    id: 96,
    name: "MashaMouse",
  },
  name: "MashaMouse",
  photoUrls: ["string"],
  tags: [
    {
      id: 96,
      name: "MashaMouse",
    },
  ],
  status: "available",
};

async function addNewPet(APIcontext, Data) {
  const testResponse = await APIcontext.post(
    "https://petstore.swagger.io/v2/pet",
    {
      data: Data,
    }
  );
  return testResponse;
}

module.exports = { MashaCat, MashaParrot, MashaDog, MashaMouse, addNewPet };
