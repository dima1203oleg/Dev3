const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const replacement = `
    if (nbuData.length > 0) {
      realContext += \`\\nREAL DATA FOUND IN NBU (Current Exchange Rates Context):\\n\`;
      nbuData.forEach((item: any) => {
        realContext += \`[\${item.cc}]: \${item.rate} UAH (Date: \${item.exchangedate})\\n\`;
      });
    }

    // Call Gemini API to generate the OSINT dossier
    const prompt = \`Perform a comprehensive mock-realistic OSINT scan and generate a detailed intelligence record for: "\${query}" (Type: \${type || 'detect automatically'}). 
Generate data that looks authentic, including realistic IDs/codes (such as Ukrainian EDRPOU for companies, IPN for persons, standard passport formats, Bitcoin/Ethereum wallet addresses, or vehicle license plates/VINs), legal status, tax standing, court cases, sanctions, network connections, and targeted countermeasure recommendations. 
IMPORTANT: Integrate synthetic findings from "Darknet forums", "Leaked databases (e.g. 2023 leaks)", "MIA (Ministry of Internal Affairs) registries", "Customs declarations", and "Crypto mixers". Explicitly mention these sources in the description or recommendations.
\${realContext ? \`\\nCRITICAL: Incorporate the following REAL data obtained from Live Ukrainian Registries into the entity profile to make it partially true and highly accurate based on real open data:\\n\${realContext}\` : ''}
All text descriptions, names, addresses and recommendations should be in Ukrainian (or bilingual Ukrainian/English) to match the PREDATOR workbench aesthetic.\`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the core OSINT analysis engine of the PREDATOR Security Intelligence Matrix. Your purpose is to scan, synthesize, and generate intelligence-grade dossiers on physical persons, legal entities, vehicles, documents, and wallets by aggregating data from public state registries, closed MIA databases, leaked darknet dumps, and crypto tracing tools. Make sure the returned JSON matches the requested schema precisely. Ensure high-quality realistic data with deep connections.",
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            id: { type: "STRING", description: "Unique string id, e.g., 'person-dyn-1', 'comp-dyn-1', 'auto-dyn-1', etc." },
            type: { type: "STRING", description: "Type of entity: 'company', 'person', 'cryptowallet', or 'auto'" },
            name: { type: "STRING", description: "Official name of the entity, physical person, vehicle description, or wallet name" },
            code: { type: "STRING", description: "Official code or identifier (e.g. EDRPOU for company, IPN/Passport for person, Wallet Address for crypto, License Plate/VIN for auto)" },
            status: { type: "STRING", description: "Status: 'ACTIVE', 'LIQUIDATED', 'SANCTIONED', or 'SUSPICIOUS'" },
            riskScore: { type: "INTEGER", description: "Risk Score from 0 to 100" },
            address: { type: "STRING", description: "Registered or detected physical address / network location" },
            phone: { type: "STRING", description: "Detected phone numbers" },
            email: { type: "STRING", description: "Detected emails" },
            description: { type: "STRING", description: "Detailed summary of the entity's history, business, profile, or purpose" },
            aiRecommendations: { type: "STRING", description: "Actionable strategic and tactical recommendations/countermeasures based on the risk profile" },
            lastActivityDate: { type: "STRING", description: "Date of last detected activity in YYYY-MM-DD format" },
            founders: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  share: { type: "STRING" },
                  role: { type: "STRING" },
                  riskLevel: { type: "STRING", description: "HIGH, MEDIUM, or LOW" }
                },
                required: ["name", "role", "riskLevel"]
              }
            },
            taxes: {
              type: "OBJECT",
              properties: {
                year: { type: "STRING" },
                paid: { type: "STRING" },
                debt: { type: "STRING" },
                status: { type: "STRING" }
              }
            },
            customs: {
              type: "OBJECT",
              properties: {
                importVolume: { type: "STRING" },
                exportVolume: { type: "STRING" },
                mainPartners: {
                  type: "ARRAY",
                  items: { type: "STRING" }
                },
                lastCargo: { type: "STRING" }
              }
            },
            courts: {
              type: "OBJECT",
              properties: {
                totalCases: { type: "INTEGER" },
                criminalCases: { type: "INTEGER" },
                lastCaseTitle: { type: "STRING" },
                lastCaseDate: { type: "STRING" }
              }
            },
            sanctions: {
              type: "OBJECT",
              properties: {
                listName: { type: "STRING" },
                dateAdded: { type: "STRING" },
                reason: { type: "STRING" },
                authority: { type: "STRING" }
              }
            },
            relationships: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  targetId: { type: "STRING" },
                  targetName: { type: "STRING" },
                  type: { type: "STRING" },
                  risk: { type: "STRING", description: "HIGH, MEDIUM, or LOW" }
                },
                required: ["targetId", "targetName", "type", "risk"]
              }
            }
          },
          required: ["id", "type", "name", "code", "status", "riskScore", "address", "description", "aiRecommendations", "relationships"]
        }
      }
    });
`;

content = content.replace(/if \(nbuData\.length > 0\) \{[\s\S]*?\);\s+const entityData = JSON\.parse/g, replacement + '\n    const entityData = JSON.parse');

// I also need to replace the `type: "STRING"` with `type: Type.STRING` etc because @google/genai requires it.
// Oh wait, in the original code, `Type` was imported from `@google/genai`.
content = content.replace(/type: "OBJECT"/g, 'type: Type.OBJECT')
                 .replace(/type: "STRING"/g, 'type: Type.STRING')
                 .replace(/type: "INTEGER"/g, 'type: Type.INTEGER')
                 .replace(/type: "ARRAY"/g, 'type: Type.ARRAY');

fs.writeFileSync('server.ts', content);
console.log("Restored Gemini call block.");
