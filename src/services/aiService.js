// src/services/aiService.js
require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateLeadScores(contacts) {
  const contactsText = contacts
    .map((c) => {
      return `
      {
        "id": "${c.id}",
        "email": "${c.email}",
        "test_email_opens": ${c.test_email_opens},
        "test_email_clicks": ${c.test_email_clicks},
        "test_pageviews": ${c.test_pageviews},
        "test_job_title": "${c.test_job_title}",
      }
      `;
    })
    .join(",");

  // Instruções para o modelo
  const prompt = `
    Você é um modelo de IA que recebe dados de contato (campos "test_email_opens", "test_email_clicks", "test_pageviews", "test_job_title", "test_lead_status") e deve gerar um "lead score" de 0 a 100.

    Regras de exemplo:
    - Se test_job_title contiver "CEO", "CTO" ou "Executive", tende a ter um score mais alto (>= 70).
    - Quanto maiores test_email_opens/test_email_clicks/pageviews, maior o score. Ex: >=10 => +20 pontos.
    - Se test_lead_status for "In Progress", considere um score moderado, ~50-70, caso os outros parâmetros não sejam muito altos.
    - Se tudo for zero, score baixo (0 a 20).

    Retorne SOMENTE em formato JSON, ex.:
    [
      { "id": "...", "score": 80 }
    ]

    Contatos:
    [${contactsText}]
  `;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.2,
    });

    const textResult = response.choices[0].text.trim();
    console.log("IA response:\n", textResult);

    let scores;
    try {
      scores = JSON.parse(textResult);
    } catch (parseErr) {
      console.error("Erro ao fazer parse do JSON:", parseErr);
      scores = contacts.map((c) => ({
        id: c.id,
        score: Math.floor(Math.random() * 101),
      }));
    }

    return scores;
  } catch (err) {
    console.error("Erro ao chamar OpenAI:", err);
    return contacts.map((c) => ({
      id: c.id,
      score: Math.floor(Math.random() * 101),
    }));
  }
}

module.exports = {
  generateLeadScores,
};
