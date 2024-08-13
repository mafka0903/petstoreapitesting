const { test, expect, request } = require("@playwright/test");

const {
  MashaCat,
  MashaParrot,
  MashaDog,
  MashaMouse,
  addNewPet,
} = require("./pets");

//test.describe.configure({ timeout: 120000 }); // встановлюємо загальний таймаут для всього describe блоку

test.describe(`Pets test cases`, async () => {
  test.describe.configure({ mode: "serial" });

  let APIcontext;

  test.beforeAll(async () => {
    APIcontext = await request.newContext();
  });

  test.afterAll(async () => {
    await APIcontext.dispose();
  });

  test("Metod Add", async () => {
    //ДОДАТИ НОВУ ТВАРИНУ
    //const APIcontext = await request.newContext();
    const testResponse = await addNewPet(APIcontext, MashaCat);
    const jsonResponse = await testResponse.json();
    //await console.log(jsonResponse);
    expect(testResponse.status()).toBe(200);
    expect(jsonResponse.id).toBe(99);
    expect(jsonResponse.name).toBe("MashaCat");
  });

  test("Metod Get", async () => {
    //ЗНАЙТИ ТВАРИНУ ПО ID
    // const APIcontext = await request.newContext();
    const testResponse = await addNewPet(APIcontext, MashaCat);
    const testResponseGet = await APIcontext.get(
      "https://petstore.swagger.io/v2/pet/99"
    );
    const jsonResponse = await testResponseGet.json();
    //await console.log(jsonResponse);
    expect(testResponse.status()).toBe(200);
    expect(jsonResponse.id).toBe(99);
    expect(jsonResponse.name).toBe("MashaCat");
  });

  test("Metod Get Bed Request ID Wrong", async () => {
    //знайти неіснуючий ID
    //const APIcontext = await request.newContext();
    const testResponse = await APIcontext.get(
      "https://petstore.swagger.io/v2/pet/11555"
    );
    const jsonResponse = await testResponse.json();
    //await console.log(jsonResponse);
    expect(testResponse.status()).toBe(404);
  });

  test("Metod Get Bed Request ID Letters", async () => {
    //знайти з ID з буквами
    // const APIcontext = await request.newContext();
    const testResponse = await APIcontext.get(
      "https://petstore.swagger.io/v2/pet/1aaa"
    );
    const jsonResponse = await testResponse.json();
    //await console.log(jsonResponse);
    expect(testResponse.status()).toBe(404);
  });

  test("Metod Post Update Pet", async () => {
    //ЗМІНИТИ ДАНІ ПРО ТВАРИНУ
    //const APIcontext = await request.newContext();
    const testResponse = await addNewPet(APIcontext, MashaParrot);
    expect(testResponse.status()).toBe(200);
    const testResponseUpdate = await APIcontext.post(
      "https://petstore.swagger.io/v2/pet/98",
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        form: {
          name: "NewParrotName",
          status: "NewParrotStatus",
        },
      }
    );
    const jsonResponse = await testResponseUpdate.json();
    console.log(jsonResponse);
    expect(testResponseUpdate.status()).toBe(200);
  });

  test("Metod Get After Update", async () => {
    //ЗНАЙТИ ТВАРИНУ ПО ID ПІСЛЯ ВНЕСЕННЯ ЗМІН
    //const APIcontext = await request.newContext();
    const testResponseAfterUpdate = await addNewPet(APIcontext, MashaParrot);
    await expect(testResponseAfterUpdate.status()).toBe(200);
    const UpdateResponce = await APIcontext.post(
      "https://petstore.swagger.io/v2/pet/98",
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        form: {
          name: "NewParrotName",
          status: "NewParrotStatus",
        },
      }
    );
    console.log(UpdateResponce);
    expect(UpdateResponce.status()).toBe(200);
    const testResponse = await APIcontext.get(
      "https://petstore.swagger.io/v2/pet/98"
    );
    const jsonResponse = await testResponse.json();
    //await console.log(jsonResponse);

    expect(testResponse.status()).toBe(200);
    expect(jsonResponse.name).toBe("NewParrotName");
    expect(jsonResponse.id).toBe(98);
    expect(jsonResponse.status).toBe("NewParrotStatus");
  });

  test("Metod Delete", async () => {
    //ВИДАЛИТИ ТВАРИНУ
    //const APIcontext = await request.newContext();
    const addPetForDelete = await addNewPet(APIcontext, MashaDog);
    expect(await addPetForDelete.status()).toBe(200);

    const testDeleteResponse = await APIcontext.delete(
      "https://petstore.swagger.io/v2/pet/97"
    );

    expect(testDeleteResponse.status()).toBe(200);

    const testResponse = await APIcontext.get(
      "https://petstore.swagger.io/v2/pet/97"
    );
    const jsonResponse = await testResponse.json();
    //console.log(jsonResponse);
    expect(await testResponse.status()).toBe(404);
  });

  test("Metod Get By Status", async () => {
    //ЗНАЙТИ ТВАРИНУ ПО СТАТУСУ
    //const APIcontext = await request.newContext();
    const testResponseGet = await APIcontext.get(
      "https://petstore.swagger.io/v2/pet/findByStatus?status=available"
    );
    const jsonResponse = await testResponseGet.json();
    console.log(jsonResponse);
    expect(testResponseGet.status()).toBe(200);

    // get the count of available pets
    const countAvailable = jsonResponse.length;
    console.log(`Count of available pets: ${countAvailable}`);

    // check that all pets have the status "available"
    jsonResponse.forEach((pet) => {
      expect(pet.status).toBe("available");
      expect(countAvailable).toBeGreaterThan(0);
    });
  });

  test("Metod Put Existing Pet", async () => {
    //ЗМІНИТИ ДАНІ ПРО ІСНУЮЧУ ТВАРИНУ
    //const APIcontext = await request.newContext();
    const testResponseAfterUpdate = await addNewPet(APIcontext, MashaMouse);

    const testResponseUpdate = await APIcontext.put(
      "https://petstore.swagger.io/v2/pet",
      {
        data: {
          id: 96,
          category: {
            id: 96,
            name: "MashaMouseNew",
          },
          name: "MashaMouseNew",
          photoUrls: ["string"],
          tags: [
            {
              id: 0,
              name: "string",
            },
          ],
          status: "available",
        },
      }
    );
    const testResponse = await APIcontext.get(
      "https://petstore.swagger.io/v2/pet/96"
    );
    const jsonResponse = await testResponse.json();
    console.log(jsonResponse);
  });
});
