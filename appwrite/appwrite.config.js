import { Client, Databases, ID } from "appwrite";
import axios from "axios";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("666183e1002d3cf3b829");

const databases = new Databases(client);

const database_id = "666184c10039a2c4610f";
const stocksOverviewCollection_id = "666199ed000906ab07d5";
const stocksEstimateCllection_id = "";

export async function postStock(symbol, amount) {
  console.log(typeof amount, "<<<<<<<<Amount");
  try {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=KBSBILSE0WX749GS`;
    const response = await axios.get(url, {
      headers: { "User-Agent": "axios" },
    });

    const stockOverview = response.data;
    console.log(stockOverview, "<<<<<<<<<");

    if (Object.keys(stockOverview).length === 0) {
      const message = "Stock does not exist";
      console.log(message);
      return message;
    }

    if (stockOverview.DividendPerShare === "None") {
      const message = "Stock Is Not A Dividend Stock";
      console.log(message);
      return message;
    }

    const stockData = { ...stockOverview, amount: parseFloat(amount) };
    console.log(stockData, "<<<<<<<<<");

    databases
      .createDocument(
        database_id,
        stocksOverviewCollection_id,
        stockData.Symbol,
        stockData
      )
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return stockData;
  } catch (error) {
    if (error.response) {
      console.log("Status:", error.response.status);
    } else {
      console.log("Error:", error.message);
    }
  }
}

export function removeTravelDocument(symbol) {
  return databases.deleteDocument(
    database_id,
    stocksOverviewCollection_id,
    symbol
  );
}

export function getAllStocks() {
  return databases
    .listDocuments(database_id, stocksOverviewCollection_id)
    .then((response) => {
      console.log(response.documents, "<<<<<");
      return response.documents;
    })
    .catch((error) => {
      return error;
    });
}

export function getOneStock(symbol) {
  return databases
    .getDocument(database_id, stocksOverviewCollection_id, symbol)
    .then((response) => {
      return response;
    });
}
export function getAllStocksEstimates() {
  return databases
    .listDocuments(database_id, stocksOverviewCollection_id)
    .then((response) => {
      console.log(response.documents, "<<<<<");
      return response.documents;
    })
    .catch((error) => {
      return error;
    });
}
///

// getAllStocks();
// postStock("PG", 100);
