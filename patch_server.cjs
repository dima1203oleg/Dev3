const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const fetchers = `
async function fetchDataGovUa(query: string) {
  try {
    const res = await fetch(\`https://data.gov.ua/api/3/action/package_search?q=\${encodeURIComponent(query)}&rows=3\`);
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
    const res = await fetch(\`https://uk.wikipedia.org/w/api.php?action=query&list=search&srsearch=\${encodeURIComponent(query)}&utf8=&format=json\`);
    if (res.ok) {
      const data = await res.json();
      return data.query?.search ? data.query.search.slice(0, 3) : [];
    }
  } catch (err) {
    console.error("Wikipedia Fetch Error:", err);
  }
  return [];
}
`;

content = content.replace('app.post("/api/osint/search"', fetchers + '\napp.post("/api/osint/search"');

const newFetches = `
    const nacpData = await fetchNACP(query);
    const prozorroData = await fetchProzorro(query); // Fetch recent tenders just for context
    const dataGovUaData = await fetchDataGovUa(query);
    const wikiData = await fetchWikipedia(query);
`;

content = content.replace(
    /const nacpData = await fetchNACP\(query\);\s*const prozorroData = await fetchProzorro\(query\);.*\n/,
    newFetches + '\n'
);

const newContext = `
    if (dataGovUaData.length > 0) {
      realContext += \`\\nREAL DATA FOUND IN DATA.GOV.UA (Open Data datasets):\n\`;
      dataGovUaData.forEach((item: any, i: number) => {
        realContext += \`[Dataset \${i+1}]: Title: \${item.title}, Organization: \${item.organization?.title}\\n\`;
      });
    }
    if (wikiData.length > 0) {
      realContext += \`\\nREAL DATA FOUND IN WIKIPEDIA (UK):\n\`;
      wikiData.forEach((item: any, i: number) => {
        // Remove HTML tags from snippet
        const snippet = item.snippet.replace(/<[^>]*>?/gm, '');
        realContext += \`[Wiki \${i+1}]: Title: \${item.title}, Snippet: \${snippet}\\n\`;
      });
    }
`;

content = content.replace(
    /if \(prozorroData\.length > 0\) {[\s\S]*?}\n/,
    `if (prozorroData.length > 0) {
      realContext += \`\\nREAL DATA FOUND IN PROZORRO (Recent Tenders Context):\n\`;
      prozorroData.forEach((item: any, i: number) => {
        const tender = item.releases?.[0]?.tender;
        if (tender) {
          realContext += \`[Tender \${i+1}]: ID: \${tender.id}, Title: \${tender.title}, Status: \${tender.status}\\n\`;
        }
      });
    }
${newContext}`
);

fs.writeFileSync('server.ts', content);
console.log('Successfully patched server.ts');
