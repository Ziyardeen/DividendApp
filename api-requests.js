import axios from "axios";

import { getSpecificStock } from "./appwrite/appwrite.config.js";

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
const polygonKey = import.meta.env.VITE_POLYGON_API_KEY;
// Note: the Google Generative AI SDK is not imported at module-level to avoid
// bundler/runtime issues in the browser. If a Gemini API key is available and
// the environment supports it, the SDK will be dynamically imported at runtime.

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

  function buildLocalReport(d) {
    if (!d || d instanceof Error)
      return `<p>No data available for ${symbol}</p>`;

    const safe = (v) => (v === undefined || v === null ? "N/A" : v);

    return `
      <div class="ai-report">
        <h1>Report: ${safe(d.name)} (${safe(d.symbol)})</h1>
        ${d.logo ? `<img src="${d.logo}" alt="${safe(d.name)} logo" style="max-width:200px;"/>` : ""}
        <p><strong>Website:</strong> <a href="${safe(d.website)}" target="_blank" rel="noreferrer">${safe(d.website)}</a></p>
        <h2>Executive Summary</h2>
        <p>${safe(d.description)}</p>

        <h2>Ownership & Dividends</h2>
        <ul>
          <li><strong>Amount Owned:</strong> ${safe(d.amountOwned)}</li>
          <li><strong>Estimated Yearly Dividends:</strong> ${safe(d.yearlyDividendEstimate)}</li>
          <li><strong>Dividend Yield:</strong> ${safe(d.dividendYield)}</li>
          <li><strong>Next Payment Date:</strong> ${safe(d.dividendPaymentDate)}</li>
          <li><strong>Ex-dividend Date:</strong> ${safe(d.exdividendDate)}</li>
        </ul>

        <h2>Financial Metrics</h2>
        <p><strong>Daily Average Price:</strong> $${safe(d.dailyAverageStockPrice)}</p>

        <h2>Company Profile</h2>
        <p><strong>Industry:</strong> ${safe(d.industry)} — <strong>Sector:</strong> ${safe(d.sector)}</p>
        <p><strong>Country:</strong> ${safe(d.country)}</p>

        <h2>Qualitative Notes</h2>
        <p>The AI-generated analysis is temporarily unavailable, so this is a basic summary of your stored data. Refresh this page in a few minutes to try again.</p>

        <h2>Disclaimer</h2>
        <p>This report is for informational purposes only and not financial advice.</p>
      </div>
    `;
  }

  // Try to use Gemini SDK if an API key is available. Fall back to local HTML when
  // the SDK isn't available or an error occurs (this avoids bundler/runtime failures).
  async function run() {
    if (geminiKey) {
      try {
        const ga = await import("@google/generative-ai");
        const { GoogleGenerativeAI } = ga;
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `You are a financial analyst writing a stock report. Data: ${JSON.stringify(dataStructure)}

Write the report as a single HTML fragment (no <html>, <head>, <body>, <style>, or <script> tags, and no inline "style" attributes) wrapped in one <div class="ai-report">. Use only these tags for structure and formatting: h1, h2, h3, p, ul, ol, li, table, thead, tbody, tr, th, td, a, strong, em, img. Do not add class attributes to any tag other than the outer wrapper. Cover: company overview, ownership & dividends, financial metrics, qualitative analysis, and a brief disclaimer. Output only the HTML fragment, nothing else.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        // Gemini sometimes wraps HTML output in a markdown code fence; strip it
        // so the raw fence markers don't render as literal text.
        return text.replace(/^```(?:html)?\s*/i, "").replace(/```\s*$/, "");
      } catch (err) {
        console.warn(
          "Gemini SDK generation failed, falling back to local report:",
          err,
        );
      }
    }

    // Fallback local report
    return buildLocalReport(dataStructure);
  }

  return await run();
};
