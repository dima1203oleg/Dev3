const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const replacement = `
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
`;

content = content.replace(/const entityData = JSON\.parse.*?res\.json\(entityData\);/s, replacement);

fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with rawContext");
