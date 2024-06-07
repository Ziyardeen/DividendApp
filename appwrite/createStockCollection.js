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
const collectionId = "666199ed000906ab07d5";

const attributes = [
  { key: "Symbol", type: "string" },
  { key: "AssetType", type: "string" },
  { key: "Name", type: "string" },
  { key: "Description", type: "string" },
  { key: "CIK", type: "string" },
  { key: "Exchange", type: "string" },
  { key: "Currency", type: "string" },
  { key: "Country", type: "string" },
  { key: "Sector", type: "string" },
  { key: "Industry", type: "string" },
  { key: "Address", type: "string" },
  { key: "FiscalYearEnd", type: "string" },
  { key: "LatestQuarter", type: "string" },
  { key: "MarketCapitalization", type: "string" },
  { key: "EBITDA", type: "string" },
  { key: "PERatio", type: "string" },
  { key: "PEGRatio", type: "string" },
  { key: "BookValue", type: "string" },
  { key: "DividendPerShare", type: "string" },
  { key: "DividendYield", type: "string" },
  { key: "EPS", type: "string" },
  { key: "RevenuePerShareTTM", type: "string" },
  { key: "ProfitMargin", type: "string" },
  { key: "OperatingMarginTTM", type: "string" },
  { key: "ReturnOnAssetsTTM", type: "string" },
  { key: "ReturnOnEquityTTM", type: "string" },
  { key: "RevenueTTM", type: "string" },
  { key: "GrossProfitTTM", type: "string" },
  { key: "DilutedEPSTTM", type: "string" },
  { key: "QuarterlyEarningsGrowthYOY", type: "string" },
  { key: "QuarterlyRevenueGrowthYOY", type: "string" },
  { key: "AnalystTargetPrice", type: "string" },
  { key: "AnalystRatingStrongBuy", type: "string" },
  { key: "AnalystRatingBuy", type: "string" },
  { key: "AnalystRatingHold", type: "string" },
  { key: "AnalystRatingSell", type: "string" },
  { key: "AnalystRatingStrongSell", type: "string" },
  { key: "TrailingPE", type: "string" },
  { key: "ForwardPE", type: "string" },
  { key: "PriceToSalesRatioTTM", type: "string" },
  { key: "PriceToBookRatio", type: "string" },
  { key: "EVToRevenue", type: "string" },
  { key: "EVToEBITDA", type: "string" },
  { key: "Beta", type: "string" },
  { key: "52WeekHigh", type: "string" },
  { key: "52WeekLow", type: "string" },
  { key: "50DayMovingAverage", type: "string" },
  { key: "200DayMovingAverage", type: "string" },
  { key: "SharesOutstanding", type: "string" },
  { key: "DividendDate", type: "string" },
  { key: "ExDividendDate", type: "string" },
  { key: "amount", type: "float" },
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
