// src/services/hubspotService.js
require("dotenv").config();
const axios = require("axios");

const HUBSPOT_BASE_URL = "https://api.hubapi.com";
const hubspotClient = axios.create({
  baseURL: HUBSPOT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
  },
});

async function getContacts(limit = 10) {
  try {
    const response = await hubspotClient.get("/crm/v3/objects/contacts", {
      params: {
        limit,

        properties: [
          "email",
          "firstname",
          "lastname",
          "test_email_opens",
          "test_email_clicks",
          "test_pageviews",
          "test_job_title",
        ],
      },
    });
    return response.data.results;
  } catch (err) {
    console.error("Erro ao obter contatos do HubSpot:", err);
    throw err;
  }
}

async function getEngagementsByContact(contactId) {
  try {
    const response = await hubspotClient.get(
      `/engagements/v1/engagements/associated/${contactId}/paged`
    );
    return response.data;
  } catch (err) {
    console.error("Erro ao obter engajamento do contato:", err);
    return null;
  }
}

module.exports = {
  getContacts,
  getEngagementsByContact,
};
