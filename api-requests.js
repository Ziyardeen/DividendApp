import axios from "axios";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSpecificStock } from "./appwrite/appwrite.config.js";

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
const polygonKey = import.meta.env.VITE_POLYGON_API_KEY;

// Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(geminiKey);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getStockInfo = async (ticker, amount) => {
  const apiKey = polygonKey;

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

      return message;
    }
    if (!latestDailySma) {
      const message = "Unable to fetch Price data to work with";

      return message;
    }

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

    return extractedInfo;
  } catch (error) {
    throw error;
  }
};

export const generateAIreport = async (symbol) => {
  const dataStructure = await getSpecificStock(symbol)
    .then((data) => {
      const dataExtraction = {
        symbol: data.symbol,
        name: data.name,
        description: data.description,
        website: data.website,
        industry: data.industry,
        sector: data.sector,
        logo: data.logo,
        country: data.country,
        dividendYield: data.dividendYield,
        dividendPaymentDate: data.dividendPaymentDate,
        exdividendDate: data.exdividendDate,
        dailyAverageStockPrice: data.dailyAverageStockPrice,
        amountOwned: data.amountOwned,
        yearlyDividendEstimate: data.yearlyDividendEstimate,
      };
      return dataExtraction;
    })
    .catch((err) => {
      return err;
    });

  async function run() {
    const prompt = `You are a financial analyst tasked with writing a comprehensive report on a selection of stocks. The data provided includes key financial metrics, company information, and dividend details. Using the structured data provided, write a detailed report covering the following sections:
        Data Structure:
        ${JSON.stringify(dataStructure)}

        Instructions:
        Using the provided data, write the report ensuring each section is thoroughly covered. Provide detailed analysis, visual aids where necessary, and clear explanations for all data points and metrics used. Your report should be structured professionally and be easy to follow for readers with varying levels of financial expertise. provide the data provided below. Place your findings in appropriate HTML tags for rendering as this will be presented on a website.eg h1,p, img, a, etc.
    
        1. Executive Summary
           - Provide a brief overview of the report's purpose and main findings.
           - Summarize key metrics and insights about the stocks.
        
        2. Introduction
           - Explain the goal of the report and what it intends to cover.
           - Define the scope of the analysis, including the data sources and the stocks covered.
        
        3. Company Profiles
           For each company, include:
           - Symbol and Name
           - Description of the company’s business activities
           - Official website
           - Industry and Sector
           - Country of operation
           - Company logo (if available)
        
        4. Stock Ownership and Dividends
           For each stock, detail the following:
           - Amount of shares owned
           - Yearly estimated dividends based on ownership
           - Current dividend yield
           - Next dividend payment date
           - Ex-dividend date
        
        5. Financial Metrics
           - Present the daily average stock price
           - Include other important financial metrics and ratios if available (e.g., P/E ratio, market cap)
        
        6. Qualitative Analysis
           - Discuss recent performance highlights or issues
           - Analyze current trends and outlook for the industry each company operates in
           - Evaluate the company’s competitive positioning and strategic initiatives
        
        7. Dividend Analysis
           - Discuss the stability and history of dividend payments
           - Compare dividend yields and policies across the different stocks
           - Analyze how dividends impact the overall return on investment
        
        8. Risk Analysis
           - Identify market risks that could affect stock performance
           - Highlight any specific risks related to the individual companies
        
        9. Conclusion
           - Recap the key findings from the report
           - Provide your investment outlook and any recommendations based on the analysis
        
        10. Appendices
            - Include detailed tables with the data used for the analysis

        11. Add a disclaimer  
        `;

    // const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  }

  const reportText = await run();

  return reportText;
};
