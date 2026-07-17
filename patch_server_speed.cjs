const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const oldFetch = `    const nacpData = await fetchNACP(query);
    const prozorroData = await fetchProzorro(query); // Fetch recent tenders just for context
    const dataGovUaData = await fetchDataGovUa(query);
    const wikiData = await fetchWikipedia(query);
    const nbuData = await fetchNBU();`;

const newFetch = `    const [nacpData, prozorroData, dataGovUaData, wikiData, nbuData] = await Promise.all([
      fetchNACP(query),
      fetchProzorro(query),
      fetchDataGovUa(query),
      fetchWikipedia(query),
      fetchNBU()
    ]);`;

content = content.replace(oldFetch, newFetch);
fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with Promise.all");
