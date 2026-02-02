/*Add Test Coverage
 `tests/sync-transform.test.js`
*/
const { transformAToB, transformBToA } = require("../src/sync-transform");
const Ajv = require("ajv");
const ajv = new Ajv();

const systemASchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    status: { type: "string", enum: ["active", "inactive"] }
  },
  required: ["id", "name", "email"],
  additionalProperties: false
};

const systemBSchema = {
  type: "object",
  properties: {
    externalId: { type: "string" },
    fullName: { type: "string" },
    contact: { type: "string" },
    isActive: { type: "boolean" }
  },
  required: ["externalId", "fullName", "contact"],
  additionalProperties: false
};

const validateSystemA = ajv.compile(systemASchema);
const validateSystemB = ajv.compile(systemBSchema);

describe("Record Synchronization Transformations", () => {
  test("System A → System B transformation is valid", () => {
    const recordA = {
      id: "123",
      name: "Alice",
      email: "alice@example.com",
      status: "active"
    };

    const recordB = transformAToB(recordA);
    expect(validateSystemB(recordB)).toBe(true);
    expect(recordB).toEqual({
      externalId: "123",
      fullName: "Alice",
      contact: "alice@example.com",
      isActive: true
    });
  });

  test("System B → System A transformation is valid", () => {
    const recordB = {
      externalId: "456",
      fullName: "Bob",
      contact: "bob@example.com",
      isActive: false
    };

    const recordA = transformBToA(recordB);
    expect(validateSystemA(recordA)).toBe(true);
    expect(recordA).toEqual({
      id: "456",
      name: "Bob",
      email: "bob@example.com",
      status: "inactive"
    });
  });
});