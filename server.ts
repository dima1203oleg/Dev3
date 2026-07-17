import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
}) : null;

// OSINT search API endpoint
async function fetchNACP(query: string) {
  try {
    const res = await fetch(`https://public-api.nazk.gov.ua/v2/documents/list?query=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      return data.data ? data.data.slice(0, 5) : [];
    }
  } catch (err) {
    console.error("NACP Fetch Error:", err);
  }
  return [];
}

async function fetchProzorro(query: string) {
  try {
    const res = await fetch(`https://public-api.prozorro.gov.ua/api/2.5/tenders?opt_schema=ocds&descending=1&limit=3`);
    if (res.ok) {
      const data = await res.json();
      return data.data ? data.data : [];
    }
  } catch (err) {
    console.error("Prozorro Fetch Error:", err);
  }
  return [];
}



async function fetchNBU() {
  try {
    const res = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    if (res.ok) {
      const data = await res.json();
      return data.filter((item: any) => ['USD', 'EUR'].includes(item.cc));
    }
  } catch (err) {
    console.error("NBU Fetch Error:", err);
  }
  return [];
}

async function fetchDataGovUa(query: string) {
  try {
    const res = await fetch(`https://data.gov.ua/api/3/action/package_search?q=${encodeURIComponent(query)}&rows=3`);
    if (res.ok) {
      const data = await res.json();
      return data.result?.results ? data.result.results : [];
    }
  } catch (err) {
    console.error("Data.gov.ua Fetch Error:", err);
  }
  return [];
}

async function fetchWikipedia(query: string) {
  try {
    const res = await fetch(`https://uk.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`);
    if (res.ok) {
      const data = await res.json();
      return data.query?.search ? data.query.search.slice(0, 3) : [];
    }
  } catch (err) {
    console.error("Wikipedia Fetch Error:", err);
  }
  return [];
}

app.post("/api/osint/search", async (req, res) => {
  const { query, type } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  if (!ai) {
    return res.status(500).json({ error: "Gemini API key is not configured" });
  }

  try {
    // 1. Gather Real Data from Public APIs
    
    const nacpData = await fetchNACP(query);
    const prozorroData = await fetchProzorro(query); // Fetch recent tenders just for context
    const dataGovUaData = await fetchDataGovUa(query);
    
    const wikiData = await fetchWikipedia(query);
    const nbuData = await fetchNBU();


    
    // 2. Format gathered data into a string for Gemini
    let realContext = "";
    if (nacpData.length > 0) {
      realContext += `\nREAL DATA FOUND IN UKRAINIAN REGISTRIES (NACP/НАЗК Declarations):\n`;
      nacpData.forEach((item: any, i: number) => {
        realContext += `[Declaration ${i+1}]: ID: ${item.id}, Name: ${item.first_name} ${item.last_name}, Position: ${item.post_type || item.work_post}, Workplace: ${item.work_place}, Year: ${item.declaration_year}\n`;
      });
    }
    if (prozorroData.length > 0) {
      realContext += `\nREAL DATA FOUND IN PROZORRO (Recent Tenders Context):
`;
      prozorroData.forEach((item: any, i: number) => {
        const tender = item.releases?.[0]?.tender;
        if (tender) {
          realContext += `[Tender ${i+1}]: ID: ${tender.id}, Title: ${tender.title}, Status: ${tender.status}\n`;
        }
      });
    }

    if (dataGovUaData.length > 0) {
      realContext += `\nREAL DATA FOUND IN DATA.GOV.UA (Open Data datasets):
`;
      dataGovUaData.forEach((item: any, i: number) => {
        realContext += `[Dataset ${i+1}]: Title: ${item.title}, Organization: ${item.organization?.title}\n`;
      });
    }
    if (wikiData.length > 0) {
      realContext += `\nREAL DATA FOUND IN WIKIPEDIA (UK):
`;
      wikiData.forEach((item: any, i: number) => {
        const snippet = item.snippet.replace(/<[^>]*>?/gm, '');
        realContext += `[Wiki ${i+1}]: Title: ${item.title}, Snippet: ${snippet}\n`;
      });
    }

    
    if (nbuData.length > 0) {
      realContext += `\nREAL DATA FOUND IN NBU (Current Exchange Rates Context):\n`;
      nbuData.forEach((item: any) => {
        realContext += `[${item.cc}]: ${item.rate} UAH (Date: ${item.exchangedate})\n`;
      });
    }

    // Call Gemini API to generate the OSINT dossier
    const prompt = `Perform a comprehensive mock-realistic OSINT scan and generate a detailed intelligence record for: "${query}" (Type: ${type || 'detect automatically'}). 
Generate data that looks authentic, including realistic IDs/codes (such as Ukrainian EDRPOU for companies, IPN for persons, standard passport formats, Bitcoin/Ethereum wallet addresses, or vehicle license plates/VINs), legal status, tax standing, court cases, sanctions, network connections, and targeted countermeasure recommendations. 
IMPORTANT: Integrate synthetic findings from "Darknet forums", "Leaked databases (e.g. 2023 leaks)", "MIA (Ministry of Internal Affairs) registries", "Customs declarations", and "Crypto mixers". Explicitly mention these sources in the description or recommendations.
${realContext ? `\nCRITICAL: Incorporate the following REAL data obtained from Live Ukrainian Registries into the entity profile to make it partially true and highly accurate based on real open data:\n${realContext}` : ''}
All text descriptions, names, addresses and recommendations should be in Ukrainian (or bilingual Ukrainian/English) to match the PREDATOR workbench aesthetic.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the core OSINT analysis engine of the PREDATOR Security Intelligence Matrix. Your purpose is to scan, synthesize, and generate intelligence-grade dossiers on physical persons, legal entities, vehicles, documents, and wallets by aggregating data from public state registries, closed MIA databases, leaked darknet dumps, and crypto tracing tools. Make sure the returned JSON matches the requested schema precisely. Ensure high-quality realistic data with deep connections.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "Unique string id, e.g., 'person-dyn-1', 'comp-dyn-1', 'auto-dyn-1', etc." },
            type: { type: Type.STRING, description: "Type of entity: 'company', 'person', 'cryptowallet', or 'auto'" },
            name: { type: Type.STRING, description: "Official name of the entity, physical person, vehicle description, or wallet name" },
            code: { type: Type.STRING, description: "Official code or identifier (e.g. EDRPOU for company, IPN/Passport for person, Wallet Address for crypto, License Plate/VIN for auto)" },
            status: { type: Type.STRING, description: "Status: 'ACTIVE', 'LIQUIDATED', 'SANCTIONED', or 'SUSPICIOUS'" },
            riskScore: { type: Type.INTEGER, description: "Risk Score from 0 to 100" },
            address: { type: Type.STRING, description: "Registered or detected physical address / network location" },
            phone: { type: Type.STRING, description: "Detected phone numbers" },
            email: { type: Type.STRING, description: "Detected emails" },
            description: { type: Type.STRING, description: "Detailed summary of the entity's history, business, profile, or purpose" },
            aiRecommendations: { type: Type.STRING, description: "Actionable strategic and tactical recommendations/countermeasures based on the risk profile" },
            lastActivityDate: { type: Type.STRING, description: "Date of last detected activity in YYYY-MM-DD format" },
            founders: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  share: { type: Type.STRING },
                  role: { type: Type.STRING },
                  riskLevel: { type: Type.STRING, description: "HIGH, MEDIUM, or LOW" }
                },
                required: ["name", "role", "riskLevel"]
              }
            },
            taxes: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.STRING },
                paid: { type: Type.STRING },
                debt: { type: Type.STRING },
                status: { type: Type.STRING }
              }
            },
            customs: {
              type: Type.OBJECT,
              properties: {
                importVolume: { type: Type.STRING },
                exportVolume: { type: Type.STRING },
                mainPartners: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                lastCargo: { type: Type.STRING }
              }
            },
            courts: {
              type: Type.OBJECT,
              properties: {
                totalCases: { type: Type.INTEGER },
                criminalCases: { type: Type.INTEGER },
                lastCaseTitle: { type: Type.STRING },
                lastCaseDate: { type: Type.STRING }
              }
            },
            sanctions: {
              type: Type.OBJECT,
              properties: {
                listName: { type: Type.STRING },
                dateAdded: { type: Type.STRING },
                reason: { type: Type.STRING },
                authority: { type: Type.STRING }
              }
            },
            relationships: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  targetId: { type: Type.STRING },
                  targetName: { type: Type.STRING },
                  type: { type: Type.STRING },
                  risk: { type: Type.STRING, description: "HIGH, MEDIUM, or LOW" }
                },
                required: ["targetId", "targetName", "type", "risk"]
              }
            }
          },
          required: ["id", "type", "name", "code", "status", "riskScore", "address", "description", "aiRecommendations", "relationships"]
        }
      }
    });

    
    const entityData = JSON.parse(response.text || "{}");
    
    // Attach raw fetched data
    entityData.rawContext = {
      nacp: nacpData,
      prozorro: prozorroData,
      dataGovUa: dataGovUaData,
      wikipedia: wikiData,
      nbu: nbuData,
    };
    
    res.json(entityData);

  } catch (error: any) {
    console.error("Gemini search failed:", error);
    res.status(500).json({ error: error.message || "Failed to fetch OSINT intelligence" });
  }
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
