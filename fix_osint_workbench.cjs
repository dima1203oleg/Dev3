const fs = require('fs');
let code = fs.readFileSync('src/components/OsintWorkbench.tsx', 'utf8');

const mapStart = `{/* Interactive Geopolitical OSINT Map (Section 15) */}`;
const replaceStart = `{activeEntity.type === 'cryptowallet' ? (
            {/* Crypto Asset Analytics Dashboard */}
            <div className="bg-slate-950/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-amber-500/10 rounded-2xl p-5 shadow-xl space-y-4 relative overflow-hidden" id="crypto-asset-widget">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full"></div>
              
              <div className="flex items-center justify-between border-b border-amber-500/10 pb-3">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-amber-500" />
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest">
                    ON-CHAIN АНАЛІТИКА & AML-СКОРИНГ
                  </h4>
                </div>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-amber-500/10 rounded border border-amber-500/20 text-[9px] font-mono text-amber-400 font-bold uppercase animate-pulse">
                      Live Tracking
                   </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                 <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <p className="text-[10px] text-slate-500 font-mono uppercase mb-1">Поточний Баланс</p>
                    <p className="text-xl font-bold text-slate-200">{(activeEntity as any).cryptoData?.balance || '0.00 BTC'}</p>
                 </div>
                 <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <p className="text-[10px] text-slate-500 font-mono uppercase mb-1">Отримано</p>
                    <p className="text-xl font-bold text-emerald-400">{(activeEntity as any).cryptoData?.totalReceived || '0.00 BTC'}</p>
                 </div>
                 <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <p className="text-[10px] text-slate-500 font-mono uppercase mb-1">Надіслано</p>
                    <p className="text-xl font-bold text-rose-400">{(activeEntity as any).cryptoData?.totalSent || '0.00 BTC'}</p>
                 </div>
              </div>
              
              <div>
                <h5 className="text-[10px] font-mono text-slate-500 uppercase mb-2">Останні транзакції (Мережа Bitcoin)</h5>
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-[10px] text-left">
                    <thead className="bg-slate-800/50 text-slate-400 uppercase font-mono">
                      <tr>
                        <th className="px-3 py-2">Tx Hash</th>
                        <th className="px-3 py-2">Date</th>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Amount</th>
                        <th className="px-3 py-2">Related Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300 font-mono">
                      {((activeEntity as any).cryptoData?.recentTransactions || []).map((tx, i) => (
                        <tr key={i} className="hover:bg-slate-800/30">
                          <td className="px-3 py-2 text-blue-400 truncate max-w-[100px]">{tx.txHash}</td>
                          <td className="px-3 py-2">{tx.date}</td>
                          <td className="px-3 py-2">
                             <span className={"px-1.5 py-0.5 rounded font-bold " + (tx.type === 'IN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400')}>
                               {tx.type}
                             </span>
                          </td>
                          <td className="px-3 py-2 font-bold">{tx.amount}</td>
                          <td className="px-3 py-2 truncate max-w-[100px]">{tx.relatedAddress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
          {/* Interactive Geopolitical OSINT Map (Section 15) */}`;

code = code.replace(mapStart, replaceStart);

// Now find the end of the map widget.
// It ends with:
//           </div>
//         )}
//       </AnimatePresence>
//   And we should close our ternary right after the map widget `</div>`

const mapEnd = `              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>`;

const mapEndReplace = `              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
          </div>
          )}
          
      {/* End of right panel */}`;

code = code.replace(mapEnd, mapEndReplace);

fs.writeFileSync('src/components/OsintWorkbench.tsx', code);
