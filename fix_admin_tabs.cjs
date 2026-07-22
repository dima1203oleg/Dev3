const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// For mobile menu
content = content.replace(
  /\{\s*id: "roadmap",\s*label: "Дорожня карта",\s*icon: Calendar,\s*\}/g,
  `{ id: "roadmap", label: "Дорожня карта", icon: Calendar },
                          { id: "catalog", label: "Каталог рішень", icon: Layers },
                          { id: "license", label: "Сумісність ліцензій", icon: ShieldAlert },
                          { id: "volumes", label: "Томи ТЗ", icon: Database },
                          { id: "advisor", label: "ШІ-Архітектор", icon: Cpu }`
);

// For desktop sidebar
content = content.replace(
  /\{\s*id: "gap", label: "Аналіз прогалин", icon: Wrench\s*\},[\s\S]*?\{\s*id: "roadmap", label: "Дорожня карта", icon: Calendar\s*\}/g,
  `{ id: "gap", label: "Аналіз прогалин", icon: Wrench },
                      { id: "roadmap", label: "Дорожня карта", icon: Calendar },
                      { id: "catalog", label: "Каталог рішень", icon: Layers },
                      { id: "license", label: "Сумісність ліцензій", icon: ShieldAlert },
                      { id: "volumes", label: "Томи ТЗ", icon: Database },
                      { id: "advisor", label: "ШІ-Архітектор", icon: Cpu }`
);

// Verify ShieldAlert is imported
const lucideMatch = content.match(/import \{([^}]+)\} from "lucide-react";/);
if (lucideMatch && !lucideMatch[1].includes('ShieldAlert')) {
  const newImports = lucideMatch[1] + ', ShieldAlert';
  content = content.replace(lucideMatch[0], `import {${newImports}} from "lucide-react";`);
}

fs.writeFileSync('src/App.tsx', content);
