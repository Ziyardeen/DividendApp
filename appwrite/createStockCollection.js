import { Client, Databases, Permission, Role, ID } from "node-appwrite";

// Initialize the Appwrite client
const client = new Client();

const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const appriteApiKey = import.meta.env.VITE_APPWRITE_API_KEY;
const database_id = import.meta.env.VITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_COLLECTION_ID;

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(project_id)
  .setKey(appriteApiKey);

const databases = new Databases(client);
const databaseId = database_id;
const collectionId = collection_id;

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
