const fs = require('fs');
let code = fs.readFileSync('src/components/InspectorPanel.tsx', 'utf8');

// Add Download to lucide-react imports if it's not there
if (!code.includes('Download,')) {
    code = code.replace(/import \{([^}]+)\} from 'lucide-react';/, "import { $1, Download } from 'lucide-react';");
}

const targetStr = `            <select 
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-slate-900/50 border border-blue-500/20 text-slate-300 text-[10px] font-mono rounded px-2 py-1 outline-none focus:border-blue-500/50 cursor-pointer"
            >
              <option value="ALL">Всі ризики (All)</option>
              <option value="CRITICAL">Критичний (Critical)</option>
              <option value="HIGH">Високий (High)</option>
              <option value="LOW">Низький (Low)</option>
            </select>
          )}`;

const replacementStr = `            <select 
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-slate-900/50 border border-blue-500/20 text-slate-300 text-[10px] font-mono rounded px-2 py-1 outline-none focus:border-blue-500/50 cursor-pointer"
            >
              <option value="ALL">Всі ризики (All)</option>
              <option value="CRITICAL">Критичний (Critical)</option>
              <option value="HIGH">Високий (High)</option>
              <option value="LOW">Низький (Low)</option>
            </select>
          )}
          {hasSelection && (
            <button 
              onClick={() => {
                let dataToExport = null;
                let filename = 'export.json';
                
                if (selectedEntity) {
                  dataToExport = {
                    entity: selectedEntity,
                    connections: connectedEntities
                  };
                  filename = \`entity_\${selectedEntity.id}.json\`;
                } else if (selectedTool) {
                  dataToExport = selectedTool;
                  filename = \`tool_\${selectedTool.id}.json\`;
                } else if (selectedNode) {
                  dataToExport = selectedNode;
                  filename = \`node_export.json\`;
                }
                
                if (dataToExport) {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
                  const downloadAnchorNode = document.createElement('a');
                  downloadAnchorNode.setAttribute("href", dataStr);
                  downloadAnchorNode.setAttribute("download", filename);
                  document.body.appendChild(downloadAnchorNode); // required for firefox
                  downloadAnchorNode.click();
                  downloadAnchorNode.remove();
                }
              }}
              className="flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-300 hover:text-white font-mono text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer"
              title="Експорт JSON"
            >
              <Download className="w-3 h-3" />
              Експорт
            </button>
          )}`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/InspectorPanel.tsx', code);
