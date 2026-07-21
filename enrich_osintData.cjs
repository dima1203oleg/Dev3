const fs = require('fs');
let code = fs.readFileSync('src/osintData.ts', 'utf8');

const targetInterface = `  lastActivityDate?: string; // YYYY-MM-DD
  rawContext?: any;
}`;

const replacementInterface = `  lastActivityDate?: string; // YYYY-MM-DD
  rawContext?: any;
  cryptoData?: {
    balance: string;
    totalReceived: string;
    totalSent: string;
    firstSeen: string;
    lastSeen: string;
    exposureIndex: string;
    knownClusters: string[];
    riskIndicators: string[];
    recentTransactions: { txHash: string; date: string; amount: string; type: 'IN' | 'OUT'; relatedAddress: string }[];
  };
  leakData?: {
    totalBreaches: number;
    breaches: { source: string; date: string; compromisedData: string[]; severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' }[];
    darknetMentions: number;
    lastDarknetMention: string;
  };
}`;

code = code.replace(targetInterface, replacementInterface);

const targetWallet1 = `    description: "Криптовалютний гаманець, зафіксований у транзакціях із транзитними крипто-міксерами (Tornado Cash аналогами) та пов'язаний із виведенням коштів з рахунків ТОВ 'СпецТехПостач' без сплати податків.",
    relationships: [`;

const replaceWallet1 = `    description: "Криптовалютний гаманець, зафіксований у транзакціях із транзитними крипто-міксерами (Tornado Cash аналогами) та пов'язаний із виведенням коштів з рахунків ТОВ 'СпецТехПостач' без сплати податків.",
    cryptoData: {
      balance: "14.285 BTC",
      totalReceived: "89.412 BTC",
      totalSent: "75.127 BTC",
      firstSeen: "2023-04-12",
      lastSeen: "2024-11-28",
      exposureIndex: "Darknet 64%, Mixer 31%, Exchange 5%",
      knownClusters: ["Garantex (RU)", "Lazarus Group (heuristic)"],
      riskIndicators: ["Використання міксера", "Прямий зв'язок з підсанкційними суб'єктами", "Darknet-маркетплейс депозити"],
      recentTransactions: [
        { txHash: "4a5e1e4baab...3819", date: "2024-11-28", amount: "2.500 BTC", type: 'OUT', relatedAddress: "bc1qxy...8x2" },
        { txHash: "9812cc121a9...a291", date: "2024-11-15", amount: "5.100 BTC", type: 'IN', relatedAddress: "1A1zP1...q29" }
      ]
    },
    relationships: [`;
code = code.replace(targetWallet1, replaceWallet1);

const targetPerson1 = `    description: "Відомий бізнесмен у сфері імпорту спецтехніки, власник групи компаній 'Постач-Груп'. Перебуває під санкціями РНБО України з жовтня 2024 року через співпрацю з підприємствами ВПК країни-агресора.",
    relationships: [`;

const replacePerson1 = `    description: "Відомий бізнесмен у сфері імпорту спецтехніки, власник групи компаній 'Постач-Груп'. Перебуває під санкціями РНБО України з жовтня 2024 року через співпрацю з підприємствами ВПК країни-агресора.",
    leakData: {
      totalBreaches: 4,
      darknetMentions: 12,
      lastDarknetMention: "2024-10-15 (Exploit.in forum)",
      breaches: [
        { source: "NovaPoshta Leak 2023", date: "2023-08-10", compromisedData: ["Phone", "Address", "Name"], severity: 'MEDIUM' },
        { source: "Diia Database dump (alleged)", date: "2024-02-12", compromisedData: ["Passport", "IPN", "DOB"], severity: 'CRITICAL' },
        { source: "Telegram bots query logs", date: "2024-06-05", compromisedData: ["Email", "IP Address", "Passwords"], severity: 'HIGH' }
      ]
    },
    relationships: [`;
code = code.replace(targetPerson1, replacePerson1);

fs.writeFileSync('src/osintData.ts', code);
