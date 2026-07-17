const fs = require('fs');
let content = fs.readFileSync('src/components/InspectorPanel.tsx', 'utf-8');

const replacement = `                      {selectedEntity.rawContext.nbu && selectedEntity.rawContext.nbu.length > 0 && (
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
                )}`;

// We need to replace from '{selectedEntity.rawContext.nbu &&' to the end of that block.
const regex = /\{selectedEntity\.rawContext\.nbu &&[\s\S]*?<\/p>\s*<\/div>/;
content = content.replace(regex, replacement);

fs.writeFileSync('src/components/InspectorPanel.tsx', content);
