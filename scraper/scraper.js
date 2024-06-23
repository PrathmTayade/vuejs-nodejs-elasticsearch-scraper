import axios from "axios";
import * as cheerio from "cheerio";
import { validateFields } from "./utils.js";

function extractCompanyDetails(companyDiv, baseUrl) {
  // Load the HTML content of the div
  const $ = cheerio.load(companyDiv);

  let companyLink = $("a").attr("href"); // Extract company details URL
  const companyName = $("a").text().trim(); // Extract company name

  companyLink = `${baseUrl}${companyLink}`;

  return { companyLink, companyName };
}

async function crawlLatestCompanies(url) {
  try {
    console.log("Crawling page:", url);
    const pageUrl = `${url}/latest-registered-company-mca`;
    const response = await axios.get(pageUrl);
    const $ = cheerio.load(response.data);

    // Select all divs containing individual company information
    const companyDivs = $(".row.g-3.banklisting .col-md-4"); // Target the specific divs

    const companies = [];

    for (const companyDiv of companyDivs) {
      const companyDetails = extractCompanyDetails(companyDiv, url);
      companies.push(companyDetails);
    }

    // write to json file

    await writeToJsonFile(JSON.stringify(companies), "companies");

    const companies10 = companies.slice(0, 2);

    console.log("List of Latest Registered Companies:");
    console.log(companies10);

    const companiesDetails = [];

    companies10.forEach(async (company) => {
      try {
        const companyDetail = await crawlCompany(company.companyLink);
        companiesDetails.push(companyDetail);
      } catch (error) {
        console.error("Error crawling company:", error);
      }
    });

    console.log(companiesDetails);
  } catch (error) {
    console.error("Error crawling page:", error);
  }
}

// Crawl Company

async function crawlCompany(url) {
  console.log("Crawling page:", url);
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  // Extract company details
  const name = $("h1.text-primary.fs-3").text().trim();

  // Extracting details from rows
  /*
  better appoach is to get key value pairs from the table and then extract the values than
  const cin = $("div#basicdetails")
    .find('div:contains("CIN")')
    .next()
    .text()
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .pop();
  */
  const details = {};
  $("div#basicdetails .row").each((index, element) => {
    const key = $(element)
      .find("div.col-6")
      .first()
      .text()
      .trim()
      .replace(/ +/g, " ")
      .toLowerCase();
    const value = $(element)
      .find("div.col-6")
      .last()
      .text()
      .trim()
      .replace(/ +/g, " ");
    details[key] = value;
  });

  const cin = details["cin"];
  const status = details["company status"];
  const email = details["email"];
  const address = details["address"];

  const pin = address.match(/\b\d{6}\b/) ? address.match(/\b\d{6}\b/)[0] : "";

  const validationError = validateFields(cin, pin);
  if (validationError) {
    return validationError;
  }

  const companyDetails = {
    name,
    cin,
    status,
    address,
    email,
    pin,
    directors: [],
  };

  // Extracting director details
  $("#COMPANY-DIRECTORS tbody tr").each((index, element) => {
    const director = {
      din: $(element).find("td").eq(0).text().trim(),
      name: $(element).find("td").eq(1).text().trim(),
      designation: $(element).find("td").eq(2).text().trim(),
      appointmentDate: $(element).find("td").eq(3).text().trim(),
    };
    companyDetails.directors.push(director);
  });

  console.log(companyDetails);
  return companyDetails;
}
// base url of companies
const baseUrl = "https://www.companydetails.in";

// crawlLatestCompanies(baseUrl);
crawlCompany(
  "https://www.companydetails.in/company/a-s-event-management-services-private-limited"
);
