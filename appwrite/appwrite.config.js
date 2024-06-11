import { Client, Databases } from "appwrite";

import { getStockInfo } from "../api-requests.js";

const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const database_id = import.meta.env.VITE_DATABASE_ID;
const stocksDataCollection_id = import.meta.env.VITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(project_id);

const databases = new Databases(client);

export async function postStock(symbol, amount) {
  try {
    const stocksOverview = await getStockInfo(symbol, parseFloat(amount));

    if (stocksOverview === "Stock is not a dividend stock") {
      return stocksOverview;
    }
    if (stocksOverview === "Unable to fetch Price data to work with") {
      return stocksOverview;
    }

    const data = await databases.createDocument(
      database_id,
      stocksDataCollection_id,
      stocksOverview.symbol,
      stocksOverview
    );

    console.log(data, "XXXXXX");
    return data;
    // .then((data) => {

    // })
    // .catch((err) => {
    //   console.log(err, "HHHHHHHHH");
    //   throw err;
    // });
  } catch (error) {
    console.log(error, "WWWWWWWW");
    if (error.response) {
      throw error.response;
    } else {
      throw error.message;
    }
  }
}

export function getAllStocks() {
  return databases
    .listDocuments(database_id, stocksDataCollection_id)
    .then((response) => {
      return response.documents;
    })
    .catch((error) => {
      return error;
    });
}

export async function deleteStock(symbol) {
  const result = await databases.deleteDocument(
    database_id,
    stocksDataCollection_id,
    symbol
  );
}

export async function getSpecificStock(symbol) {
  const result = await databases.getDocument(
    database_id,
    stocksDataCollection_id,
    symbol
  );

  return result;
}

export async function UpdateStockWithEstimate(symbol, estimate) {
  const result = await databases.updateDocument(
    database_id,
    stocksDataCollection_id,
    symbol,
    { yearlyDividendEstimate: estimate }
  );
}
