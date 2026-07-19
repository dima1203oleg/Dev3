const fs = require('fs');

let content = fs.readFileSync('src/components/InspectorPanel.tsx', 'utf8');

const useMemoCode = `
  const connectedEntities = React.useMemo(() => {
    if (!selectedEntity) return [];
    const related = new Map();
    selectedEntity.relationships.forEach(rel => {
      const target = OSINT_ENTITIES.find(e => e.id === rel.targetId);
      if (target) {
        related.set(target.id, { entity: target, type: rel.type, risk: rel.risk, direction: 'outgoing' });
      }
    });
    OSINT_ENTITIES.forEach(entity => {
      entity.relationships.forEach(rel => {
        if (rel.targetId === selectedEntity.id) {
          if (!related.has(entity.id)) {
             related.set(entity.id, { entity, type: rel.type, risk: rel.risk, direction: 'incoming' });
          }
        }
      });
    });
    return Array.from(related.values());
  }, [selectedEntity]);
`;

content = content.replace(/const hasSelection = !!\(selectedEntity \|\| selectedTool \|\| selectedNode\);/, 
  `const hasSelection = !!(selectedEntity || selectedTool || selectedNode);\n${useMemoCode}`);

const oldRelationshipsBlock = `{/* Related links / connected objects (Section 9) */}
                <div className="space-y-2">
                  <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest block">Пов'язані об'єкти (Ланки)</span>
                  <div className="space-y-1.5">
                    {selectedEntity.relationships.map((rel, idx) => (
                      <div key={idx} className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/5 p-2.5 rounded-lg flex items-center justify-between text-[11px]">
                        <div>
                          <p className="font-semibold text-slate-200">{rel.targetName}</p>
                          <span className="text-[9px] text-slate-500 font-mono uppercase">{rel.type}</span>
                        </div>
                        <span className={\`text-[9px] font-bold px-1.5 py-0.5 rounded border \${rel.risk === 'HIGH' ? 'text-red-400 bg-red-500/5 border-red-500/15' : 'text-slate-300 bg-slate-900/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-indigo-500/10'}\`}>
                          {rel.risk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>`;

const newRelationshipsBlock = `{/* Related links / connected objects (Section 9) */}
                <div className="space-y-2">
                  <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest block">Пов'язані об'єкти з БД OSINT (Connected Entities)</span>
                  <div className="space-y-2">
                    {connectedEntities.length === 0 ? (
                      <div className="text-[10px] text-slate-500 font-mono p-2 bg-slate-900/20 rounded-lg border border-slate-800">Не знайдено пов'язаних об'єктів у базі</div>
                    ) : (
                      connectedEntities.map((conn, idx) => (
                        <div key={idx} className="bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-indigo-500/10 p-3 rounded-lg flex items-center justify-between text-[11px] hover:border-indigo-500/30 transition-all cursor-default">
                          <div className="flex items-center gap-3">
                            <div className={\`w-8 h-8 rounded-full flex items-center justify-center \${conn.entity.type === 'company' ? 'bg-indigo-500/10 text-indigo-400' : conn.entity.type === 'person' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}\`}>
                              <Network className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-200">{conn.entity.name}</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[8px] text-indigo-400 font-mono uppercase bg-indigo-500/10 px-1 rounded">{conn.direction === 'outgoing' ? 'Вихідний' : 'Вхідний'}</span>
                                <span className="text-[9px] text-slate-400 font-mono truncate max-w-[120px]">{conn.type}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className={\`text-[9px] font-bold px-1.5 py-0.5 rounded border \${conn.risk === 'HIGH' ? 'text-red-400 bg-red-500/5 border-red-500/15' : 'text-slate-300 bg-slate-900/50 border-indigo-500/10'}\`}>
                              {conn.risk}
                            </span>
                            <span className="text-[8px] text-slate-500 font-mono">Score: {conn.entity.riskScore}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>`;

content = content.replace(oldRelationshipsBlock, newRelationshipsBlock);

fs.writeFileSync('src/components/InspectorPanel.tsx', content);

