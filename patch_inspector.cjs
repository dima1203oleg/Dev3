const fs = require('fs');
let content = fs.readFileSync('src/components/InspectorPanel.tsx', 'utf-8');

const rawContextBlock = `
                {/* AI Recommendations (Section 9) */}
                <div className="bg-indigo-950/15 border border-indigo-900/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[9px] text-indigo-400 font-mono font-bold uppercase tracking-widest">ШІ-РЕКОМЕНДАЦІЇ PREDATOR</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px] whitespace-pre-line">
                    {selectedEntity.aiRecommendations}
                  </p>
                </div>

                {/* Raw Context / Fetched OSINT Data */}
                {selectedEntity.rawContext && (
                  <div className="space-y-2 pt-2 border-t border-slate-900">
                    <span className="text-[9px] text-emerald-500 font-mono font-bold uppercase tracking-widest block flex items-center gap-1.5">
                      <Network className="w-3 h-3" />
                      Сирі дані інтеграцій (Data Lake)
                    </span>
                    <div className="bg-slate-950/50 border border-slate-900 rounded-lg p-3 space-y-3 text-[10px] text-slate-400 font-mono overflow-hidden">
                      {selectedEntity.rawContext.wikipedia && selectedEntity.rawContext.wikipedia.length > 0 && (
                        <div>
                          <span className="text-slate-300 font-bold block mb-1">Wikipedia (UK):</span>
                          <ul className="list-disc pl-3 space-y-1">
                            {selectedEntity.rawContext.wikipedia.map((w: any, idx: number) => (
                              <li key={idx} className="truncate">{w.title}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedEntity.rawContext.nacp && selectedEntity.rawContext.nacp.length > 0 && (
                        <div>
                          <span className="text-slate-300 font-bold block mb-1">Декларації НАЗК:</span>
                          <ul className="list-disc pl-3 space-y-1">
                            {selectedEntity.rawContext.nacp.map((d: any, idx: number) => (
                              <li key={idx} className="truncate">{d.first_name} {d.last_name} ({d.work_place})</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedEntity.rawContext.prozorro && selectedEntity.rawContext.prozorro.length > 0 && (
                        <div>
                          <span className="text-slate-300 font-bold block mb-1">Тендери Prozorro:</span>
                          <ul className="list-disc pl-3 space-y-1">
                            {selectedEntity.rawContext.prozorro.map((p: any, idx: number) => {
                              const t = p.releases?.[0]?.tender;
                              return t ? <li key={idx} className="truncate">{t.id} - {t.title}</li> : null;
                            })}
                          </ul>
                        </div>
                      )}
                      {selectedEntity.rawContext.dataGovUa && selectedEntity.rawContext.dataGovUa.length > 0 && (
                        <div>
                          <span className="text-slate-300 font-bold block mb-1">Реєстри Data.gov.ua:</span>
                          <ul className="list-disc pl-3 space-y-1">
                            {selectedEntity.rawContext.dataGovUa.map((d: any, idx: number) => (
                              <li key={idx} className="truncate">{d.title}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedEntity.rawContext.nbu && selectedEntity.rawContext.nbu.length > 0 && (
                        <div>
                          <span className="text-slate-300 font-bold block mb-1">Курси НБУ:</span>
                          <ul className="list-none space-y-1">
                            {selectedEntity.rawContext.nbu.map((n: any, idx: number) => (
                              <li key={idx} className="truncate">{n.cc}: {n.rate} UAH</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
`;

content = content.replace(/\{\/\* AI Recommendations \(Section 9\) \*\/\}.*?<\/div>/s, rawContextBlock);

fs.writeFileSync('src/components/InspectorPanel.tsx', content);
console.log('Successfully patched InspectorPanel.tsx');
