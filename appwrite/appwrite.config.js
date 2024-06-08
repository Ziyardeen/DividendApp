import { Client, Databases, ID } from "appwrite";
import axios from "axios";
import { getStockInfo } from "../api-requests";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("666183e1002d3cf3b829");

const databases = new Databases(client);

const database_id = "666184c10039a2c4610f";
const stocksDataCollection_id = "6664442e001e5afe34a2";
const stocksEstimateCllection_id = "";

export async function postStock(symbol, amount) {
  console.log(typeof amount, "<<<<<<<<Amount");
  try {
    const stocksOverview = await getStockInfo(symbol, parseFloat(amount));
    if (stocksOverview === "Stock is not a dividend stock") {
      return stocksOverview;
    }
    if (stocksOverview === "Unable to fetch Price data to work with") {
      return stocksOverview;
    }

    databases
      .createDocument(
        database_id,
        stocksDataCollection_id,
        stocksOverview.symbol,
        stocksOverview
      )
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  } catch (error) {
    if (error.response) {
      console.log("Status:", error.response.status);
    } else {
      console.log("Error:", error.message);
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
      console.log(error);
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

///

// getAllStocks();
// postStock("PG", 100);
