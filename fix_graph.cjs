const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

const findTargetTypeStr = `const found = entities.find(e => e.id === activeEntity.relationships[0].targetId);`;

// We'll replace the entire <svg> rendering to be dynamic up to 4 nodes (using positions for 1, 2, 3, 4).
const targetSVG = `<svg className="w-full h-full" viewBox="0 0 600 320">`;
const endSVG = `</svg>`;

const startIdx = code.indexOf(targetSVG);
const endIdx = code.indexOf(endSVG, startIdx) + endSVG.length;

if (startIdx !== -1 && endIdx !== -1) {
    const oldSvgBlock = code.substring(startIdx, endIdx);
    
    const newSvgBlock = `<svg className="w-full h-full" viewBox="0 0 600 320">
                {/* Connective lines */}
                <g stroke="#1e293b" strokeWidth="1.5">
                  {/* Central Node is always (300, 160) */}
                  {activeEntity.relationships.map((rel, i) => {
                     const coords = [
                       {x: 160, y: 80},
                       {x: 440, y: 80},
                       {x: 300, y: 260},
                       {x: 160, y: 240},
                       {x: 440, y: 240}
                     ];
                     if(i >= coords.length) return null;
                     const c = coords[i];
                     const found = entities.find(e => e.id === rel.targetId);
                     const isCrypto = found?.type === 'cryptowallet' || rel.targetName.toLowerCase().includes('wallet');
                     const color = isCrypto ? '#f59e0b' : (rel.risk === 'HIGH' ? '#f43f5e' : '#3b82f6');
                     return (
                        <line key={\`line-\${i}\`} x1="300" y1="160" x2={c.x} y2={c.y} stroke={color} strokeWidth={isCrypto ? "2" : "1.5"} strokeDasharray={rel.risk === 'HIGH' ? "4 4" : "none"} className={rel.risk === 'HIGH' ? "animate-pulse" : ""} />
                     );
                  })}
                </g>

                {/* Nodes group */}
                <g>
                  {/* Central Main Node */}
                  <g 
                    className="cursor-pointer" 
                    onClick={() => onSelectEntityForInspector(activeEntity)}
                  >
                    <circle cx="300" cy="160" r="24" className={\`fill-slate-950 stroke-2 transition-all \${activeEntity.type === 'cryptowallet' ? 'stroke-amber-500 hover:stroke-amber-400' : 'stroke-blue-500 hover:stroke-blue-400'}\`} />
                    <text x="300" y="164" textAnchor="middle" fill={activeEntity.type === 'cryptowallet' ? '#fbbf24' : '#818cf8'} fontSize="8" fontWeight="bold" fontFamily="monospace">
                      {activeEntity.type === 'company' ? 'CORP' : activeEntity.type === 'cryptowallet' ? 'CRYPTO' : 'PEP'}
                    </text>
                    <text x="300" y="200" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      {activeEntity.name.slice(0, 18)}{activeEntity.name.length > 18 ? '...' : ''}
                    </text>
                  </g>
                  
                  {/* Connected Target Nodes */}
                  {activeEntity.relationships.map((rel, i) => {
                     const coords = [
                       {x: 160, y: 80, rx: 210, ry: 120, rot: -30},
                       {x: 440, y: 80, rx: 380, ry: 120, rot: 30},
                       {x: 300, y: 260, rx: 335, ry: 210, rot: 90},
                       {x: 160, y: 240, rx: 210, ry: 200, rot: 30},
                       {x: 440, y: 240, rx: 380, ry: 200, rot: -30}
                     ];
                     if(i >= coords.length) return null;
                     const c = coords[i];
                     const found = entities.find(e => e.id === rel.targetId);
                     const isCrypto = found?.type === 'cryptowallet' || rel.targetName.toLowerCase().includes('wallet');
                     const color = isCrypto ? '#f59e0b' : (rel.risk === 'HIGH' ? '#f43f5e' : '#3b82f6');
                     const strokeClass = isCrypto ? 'stroke-amber-500 hover:fill-amber-500/10' : (rel.risk === 'HIGH' ? 'stroke-rose-500 hover:fill-rose-500/10' : 'stroke-blue-500 hover:fill-blue-500/10');
                     const label = isCrypto ? 'WALLET' : (found?.type === 'company' ? 'CORP' : 'PEP');

                     return (
                        <g 
                          key={\`node-\${i}\`}
                          className="cursor-pointer group"
                          onClick={() => {
                            if (found) onSelectEntityForInspector(found);
                          }}
                        >
                          <circle cx={c.x} cy={c.y} r="16" className={\`fill-slate-950 stroke-2 transition-all \${strokeClass}\`} />
                          <text x={c.x} y={c.y + 3} textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" fontFamily="monospace">{label}</text>
                          <text x={c.x} y={c.y + 30} textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">
                            {rel.targetName.split(' ')[0].slice(0, 15)}
                          </text>
                          <text x={c.rx} y={c.ry} textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" fontFamily="monospace" transform={\`rotate(\${c.rot} \${c.rx} \${c.ry})\`}>
                            {rel.type}
                          </text>
                        </g>
                     );
                  })}
                </g>
              </svg>`;
    
    code = code.replace(oldSvgBlock, newSvgBlock);
    fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
}
