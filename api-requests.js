import axios from "axios";

export const getStockInfo = async (ticker, amount) => {
  const apiKey = "K1tIz7EqCXmVN6I1KKRERcl_tgsHm4U0";

  try {
    const companyOverviewUrl = `https://api.polygon.io/v1/meta/symbols/${ticker}/company?apiKey=${apiKey}`;

    const dividendsUrl = `https://api.polygon.io/v3/reference/dividends?ticker=${ticker}&limit=1&apiKey=${apiKey}`;

    const dailySmaUrl = `https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=1&series_type=close&order=desc&apiKey=${apiKey}`;

    const companyOverviewResponse = await axios.get(companyOverviewUrl);
    const dividendsResponse = await axios.get(dividendsUrl);
    const dailySmaResponse = await axios.get(dailySmaUrl);

    const companyOverview = companyOverviewResponse.data;
    const dividends = dividendsResponse.data.results;
    const latestDailySma = dailySmaResponse.data.results.values;

    if (dividends.length === 0) {
      const message = "Stock is not a dividend stock";
      console.log(message);
      return message;
    }
    if (!latestDailySma) {
      const message = "Unable to fetch Price data to work with";
      console.log(message);
      return message;
    }

    console.log(latestDailySma, "333333333333");

    const extractedInfo = {
      symbol: companyOverview.symbol,
      name: companyOverview.name,
      description: companyOverview.description,
      website: companyOverview.url,
      industry: companyOverview.industry,
      sector: companyOverview.sector,
      logo: companyOverview.logo,
      country: companyOverview.country,
      dividendYield: dividends[0].cash_amount,
      dividendPaymentDate: dividends[0].pay_date,
      exdividendDate: dividends[0].ex_dividend_date,
      dailyAverageStockPrice: parseFloat(latestDailySma[0].value.toFixed(2)),
      amountOwned: amount,
    };

    // console.log(extractedInfo, "111111111");
    // console.log(companyOverview, "111111111");
    // console.log(dividendsResponse, dividends, "2222222222222");
    // console.log(latestDailySma, "333333333333");
    // console.log(sma200day, "444444444444");

    return extractedInfo;
  } catch (error) {
    console.error("Error:", error.response, "<<<<<");
    return error.response;
    // return error.response;
  }
};

// getStockInfo("GLEN", 100);
// getStockInfo("AAPL", 100);
