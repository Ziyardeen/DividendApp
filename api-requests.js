import fs from "fs";

import request from "request";

export async function fetchData(symbol, amount) {
  const apiKey = "KBSBILSE0WX749GS";

  var url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;

  request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, res, data) => {
      if (err) {
        console.log("Error:", err);
      } else if (res.statusCode !== 200) {
        console.log("Status:", res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        console.log(data);
        const stockOverview = data;
        console.log(stockOverview, "<<<<<<<<<");
        if (Object.keys(stockOverview).length === 0) {
          const response = "Stock does not exist";
          console.log(response);
          return response;
        }
        fs.readFile("./data.json", "utf8", (err, data) => {
          const dataJson = JSON.parse(data);
          dataJson.push({ ...stockOverview, amount: amount });
          console.log(dataJson, "<<<<<<<<<");
          const dataWrite = JSON.stringify(dataJson);
          fs.writeFile("./data.json", dataWrite, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          });
        });
      }
    }
  );
}

// await fetchData("PG", 102.24);
// await fetchData("MAIN", 119.15);
// await fetchData("UU", 117.02);
await fetchData("ICG", 144.86);
// await fetchData("RAT", 127.47);
