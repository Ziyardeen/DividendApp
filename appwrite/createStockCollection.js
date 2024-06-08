import { Client, Databases, Permission, Role, ID } from "node-appwrite";

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("666183e1002d3cf3b829")
  .setKey(
    "07aa466394d21b888b3dba1a7326d3f025653f02440f1897b8e1c0397dc70ec42d2e85302703ccb94d656d8d351fca0ea5d21c7ff2ddea7735982cec8c7e7cbfc3d17841f9bba683c29f59c4059019474bf6dbd012a20d6636fb33824ea6786c5db5c625b54e374bf522dc0b74579678c9d4f61b0c25cf8f1b1974274bf4d95a"
  );

const databases = new Databases(client);
const databaseId = "666184c10039a2c4610f";
const collectionId = "6664442e001e5afe34a2";

const attributes = [
  { key: "symbol", type: "string" },
  { key: "name", type: "string" },
  { key: "description", type: "string" },
  { key: "website", type: "string" },
  { key: "industry", type: "string" },
  { key: "sector", type: "string" },
  { key: "logo", type: "string" },
  { key: "country", type: "string" },
  { key: "dividendYield", type: "float" },
  { key: "dividendPaymentDate", type: "string" },
  { key: "exdividendDate", type: "string" },
  { key: "dailyAverageStockPrice", type: "float" },
  { key: "amountOwned", type: "float" },
];

async function createCollection() {
  try {
    // Add attributes to the collection
    for (const attribute of attributes) {
      switch (attribute.type) {
        case "string":
          await databases.createStringAttribute(
            databaseId,
            collectionId,
            attribute.key,
            1000,
            true
          );
          break;
        case "integer":
          await databases.createIntegerAttribute(
            databaseId,
            collectionId,
            attribute.key,
            true
          );
          break;
        case "float":
          await databases.createFloatAttribute(
            databaseId,
            collectionId,
            attribute.key,
            true
          );
          break;
        default:
          console.log(`Unknown type for attribute ${attribute.key}`);
      }
    }

    console.log("Attributes added to collection");
  } catch (error) {
    console.error("Error creating collection or adding attributes:", error);
  }
}

createCollection();
