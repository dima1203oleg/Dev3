const fs = require('fs');
let code = fs.readFileSync('src/components/InspectorPanel.tsx', 'utf8');

const targetStr = `      <div className="p-4 border-b border-blue-500/5 flex items-center justify-between bg-slate-950/80 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] text-slate-300 font-mono font-bold uppercase tracking-widest">
            Inspector Panel (Аналіз)
          </span>
        </div>
        <button 
          onClick={onClose}`;

const replacementStr = `      <div className="p-4 border-b border-blue-500/5 flex flex-wrap gap-2 items-center justify-between bg-slate-950/80 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] text-slate-300 font-mono font-bold uppercase tracking-widest">
            Inspector Panel (Аналіз)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {hasSelection && (
            <select 
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
          <button 
            onClick={onClose}`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/InspectorPanel.tsx', code);
