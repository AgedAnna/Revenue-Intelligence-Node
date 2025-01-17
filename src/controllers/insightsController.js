// src/controllers/insightsController.js
const {
  getContacts,
  getEngagementsByContact,
} = require("../services/hubspotService");
const { generateLeadScores } = require("../services/aiService");

async function getInsights(req, res) {
  try {
    const contacts = await getContacts(10);

    const contactsForAI = contacts.map((contact) => ({
      id: contact.id,
      email: contact.properties.email || "",
      firstname: contact.properties.firstname || "",
      lastname: contact.properties.lastname || "",
      test_email_opens: Number(contact.properties.test_email_opens || 0),
      test_email_clicks: Number(contact.properties.test_email_clicks || 0),
      test_pageviews: Number(contact.properties.test_pageviews || 0),
      test_job_title: contact.properties.test_job_title || "",
      test_lead_status: contact.properties.test_lead_status || "",
    }));

    const leadScores = await generateLeadScores(contactsForAI);

    const results = contactsForAI.map((c) => {
      const foundScore = leadScores.find((s) => s.id === c.id);

      return {
        id: c.id,
        email: c.email,
        name: `${c.firstname} ${c.lastname}`.trim(),
        score: foundScore?.score || 0,

        ...foundScore,
      };
    });

    return res.status(200).json({
      insights: results,
    });
  } catch (err) {
    console.error("Erro em getInsights:", err);
    return res.status(500).json({ error: "Erro ao processar insights." });
  }
}

module.exports = {
  getInsights,
};
