const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const nbuFetcher = `
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
`;

content = content.replace('async function fetchDataGovUa', nbuFetcher + '\nasync function fetchDataGovUa');

const newFetch = `
    const wikiData = await fetchWikipedia(query);
    const nbuData = await fetchNBU();
`;

content = content.replace('const wikiData = await fetchWikipedia(query);', newFetch);

const newContext = `
    if (nbuData.length > 0) {
      realContext += \`\\nREAL DATA FOUND IN NBU (Current Exchange Rates Context):\n\`;
      nbuData.forEach((item: any) => {
        realContext += \`[\${item.cc}]: \${item.rate} UAH (Date: \${item.exchangedate})\\n\`;
      });
    }
`;

content = content.replace(
    /if \(wikiData\.length > 0\) {[\s\S]*?}\n    }/,
    `if (wikiData.length > 0) {
      realContext += \`\\nREAL DATA FOUND IN WIKIPEDIA (UK):\n\`;
      wikiData.forEach((item: any, i: number) => {
        const snippet = item.snippet.replace(/<[^>]*>?/gm, '');
        realContext += \`[Wiki \${i+1}]: Title: \${item.title}, Snippet: \${snippet}\\n\`;
      });
    }
${newContext}`
);

fs.writeFileSync('server.ts', content);
console.log('Successfully patched server.ts with NBU');
