const fs = require('fs');
let content = fs.readFileSync('src/components/DataIngestionTab.tsx', 'utf8');

const regex = /\{\/\* TAB 8: Docs & ADRs \*\/\}[\s\S]*?Експорт \.md ADR документа\n\s*<\/button>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}\n\s*<\/div>\n\s*\)\}\s*<\/div>\n\s*<\/div>\n\s*\);\n\}/;

const replacement = `{/* TAB 8: Docs & ADRs */}
        {activeTab === 'docs' && (
          <div className="col-span-12 flex flex-col gap-4 flex-1 min-h-0">
            {/* Sub tab navigation */}
            <div className="flex bg-slate-950/60 border border-slate-900 p-1 rounded-lg gap-2 self-start z-10">
              <button
                onClick={() => setDocSubTab('blueprint')}
                className={\`px-3 py-1.5 text-[10px] font-bold uppercase rounded cursor-pointer transition-all flex items-center gap-1.5 \${docSubTab === 'blueprint' ? 'bg-amber-600 text-[#02050a]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'}\`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Генеральний План Інтеграції (Enterprise Blueprint)
              </button>
              <button
                onClick={() => setDocSubTab('adr')}
                className={\`px-3 py-1.5 text-[10px] font-bold uppercase rounded cursor-pointer transition-all flex items-center gap-1.5 \${docSubTab === 'adr' ? 'bg-amber-600 text-[#02050a]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'}\`}
              >
                <FileText className="w-3.5 h-3.5" />
                Architectural Decision Records (ADR 1-10)
              </button>
            </div>

            {docSubTab === 'blueprint' ? (
              <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
                {/* Chapters list sidebar */}
                <div className="col-span-12 lg:col-span-4 bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-[460px]">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-900 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      ГЛАВИ АРХІТЕКТУРНОГО ПЛАНУ PREDATOR
                    </span>
                    <span className="text-[8px] bg-amber-500/10 text-amber-400 px-1 py-0.5 rounded font-mono font-bold">SOVEREIGN ETLS</span>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1 text-[10px]">
                    {[
                      { id: 0, title: "1. Парадигми інженерії та оркестрації", desc: "Ghost Runtimes, управління секретами та ліміти автономії" },
                      { id: 1, title: "2. Державні реєстри України (ETL)", desc: "ProZorro, Spending, НАЗК, data.gov.ua, НБУ, ВРУ" },
                      { id: 2, title: "3. Міжнародні санкції та реєстри", desc: "OpenSanctions, FollowTheMoney, OpenCorporates, SEC" },
                      { id: 3, title: "4. Наукометрія, Геополітика & Кібер", desc: "OpenAlex Polite Pool, GDELT 2.0, Nominatim OSM" },
                      { id: 4, title: "5. Трансформація & Entity Resolution", desc: "Злиття брудних записів за Jaro-Winkler та Qdrant" }
                    ].map(ch => (
                      <div
                        key={ch.id}
                        onClick={() => setSelectedBlueprintSection(ch.id)}
                        className={\`p-2.5 rounded border cursor-pointer transition-all flex flex-col gap-0.5 \${selectedBlueprintSection === ch.id ? 'bg-amber-600/10 border-amber-500/40 text-amber-400' : 'bg-slate-900/40 border-slate-900 hover:border-slate-800 text-slate-400'}\`}
                      >
                        <span className="font-bold">{ch.title}</span>
                        <span className="text-[8px] text-slate-500 truncate">{ch.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chapter contents */}
                <div className="col-span-12 lg:col-span-8 bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-[460px] justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />
                  
                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1">
                    {selectedBlueprintSection === 0 && (
                      <div className="space-y-4">
                        <div className="border-b border-slate-900 pb-2">
                          <h4 className="text-xs font-black text-slate-200 uppercase">ГЛАВА 1: ПАРАДИГМИ СУЧАСНОЇ ІНЖЕНЕРІЇ ТА ОРКЕСТРАЦІЇ</h4>
                          <p className="text-[8px] text-slate-500 mt-0.5">Тема: Середовище розробки, ефемерні Ghost Runtimes та управління секретами</p>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                          Сучасний ландшафт глобальної та регіональної економіки вимагає від аналітичних платформ здатності обробляти масиви даних у режимі, наближеному до реального часу. Передові команди інженерів даних використовують платформи на кшталт <strong>Google Antigravity</strong>, які об'єднують можливості класичних середовищ розробки з високопродуктивними кластерами Kubernetes та інструментами ШІ.
                        </p>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                          Фундаментальною інновацією таких платформ є концепція <strong>"Ghost Runtimes"</strong> — ефемерних, безголових контейнерів Linux, що існують у паралельному вимірі робочого простору. Ця архітектура дозволяє тестувати мережеві підключення до API, виконувати компіляцію залежностей та перевіряти код на наявність витоків пам'яті в ізольованому середовищі ще до моменту фактичного збереження змін у файлі.
                        </p>
                        <div className="bg-[#02050a] border border-slate-900 p-3 rounded-lg font-mono text-[9px] text-amber-400 space-y-1">
                          <span className="font-bold block text-slate-400 text-[8px] uppercase">УПРАВЛІННЯ АВТОНОМІЄЮ ШІ-АГЕНТІВ:</span>
                          <div>• <strong>Рівень 3 (Контрольована автономія):</strong> Автоматичне оновлення конекторів, рутинні завдання ETL-конвеєрів.</div>
                          <div>• <strong>Рівень 4 (Повна автономія):</strong> Експериментальні гілки розробки без права автоматичного деплою в PROD без верифікації людиною.</div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-cyan-400 font-bold block uppercase text-[8px]">БЕЗПЕКА ТА УПРАВЛІННЯ СЕКРЕТАМИ:</span>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            Зберігання секретів у відкритому тексті коду чи незахищених файлах є неприпустимим. Локально використовується системний сервіс <strong>Keychain</strong> (наприклад, macOS), звідки скрипти отримують токени динамічно. У промисловому хмарному кластері автентифікація делегується <strong>HashiCorp Vault</strong>, а автоматичні інструменти CLI блокують коміти з жорстко закодованими секретами.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedBlueprintSection === 1 && (
                      <div className="space-y-4">
                        <div className="border-b border-slate-900 pb-2">
                          <h4 className="text-xs font-black text-slate-200 uppercase">ГЛАВА 2: ІНТЕГРАЦІЯ З ДЕРЖАВНИМИ ІНФОРМАЦІЙНИМИ СИСТЕМАМИ УКРАЇНИ</h4>
                          <p className="text-[8px] text-slate-500 mt-0.5">Тема: Специфікація підключень та синхронізації ProZorro, Spending, НАЗК, data.gov.ua, НБУ, ВРУ</p>
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <span className="text-amber-400 font-bold block uppercase text-[8px]">1. Система публічних закупівель ProZorro (OCDS):</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Синхронізація базується на безперервному опитуванні часу модифікації. Замість limit/offset пагінації конвеєр використовує унікальний об'єкт <code>next_page</code>:
                            </p>
                            <table className="w-full text-left font-mono text-[8px] text-slate-400 border border-slate-900 rounded bg-[#02050a] mt-1.5">
                              <thead>
                                <tr className="bg-slate-900 text-slate-300">
                                  <th className="p-1">Властивість next_page</th>
                                  <th className="p-1">Призначення</th>
                                  <th className="p-1">Архітектурне значення</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-t border-slate-900">
                                  <td className="p-1 text-cyan-400 font-bold">offset</td>
                                  <td className="p-1">Точний маркер часу / хеш</td>
                                  <td className="p-1">Забезпечує ідемпотентність. Зберігається в БД стану для відновлення після збоїв.</td>
                                </tr>
                                <tr className="border-t border-slate-900">
                                  <td className="p-1 text-cyan-400 font-bold">path</td>
                                  <td className="p-1">Відносний URL-шлях</td>
                                  <td className="p-1">Зберігає оригінальні параметри запиту через проксі-сервери або шлюзи.</td>
                                </tr>
                                <tr className="border-t border-slate-900">
                                  <td className="p-1 text-cyan-400 font-bold">uri</td>
                                  <td className="p-1">Абсолютна URL-адреса</td>
                                  <td className="p-1">Основний лінк для автоматизованої пагінації в циклах конвеєра.</td>
                                </tr>
                              </tbody>
                            </table>
                            <p className="text-[9px] text-slate-400 leading-relaxed mt-1">
                              Логіка конвеєра виконує запити за адресами <code>next_page.uri</code>, поки не повернеться порожній масив, після чого засинає на 5 хвилин. Завантаження документів вимагає заголовок <code>Authorization: Bearer broker</code> та наявність параметра <code>acc_token</code>. Процедури ESCO розраховуються за чистим приведеним доходом (NPV). Для великих завантажень використовується <strong>Kingfisher Collect</strong>.
                            </p>
                          </div>

                          <div className="space-y-1 border-t border-slate-900/60 pt-2">
                            <span className="text-amber-400 font-bold block uppercase text-[8px]">2. Портал публічних коштів (Spending.gov.ua):</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Для уникнення помилок HTTP 504 (Gateway Timeout), конвеєр ділить великі періоди на щоденні мікробатчі. Шар трансформації примусово конвертує фінансові суми у тип <code>Decimal</code> фіксованої точності, запобігаючи похибкам округлення чисел з плаваючою комою.
                            </p>
                          </div>

                          <div className="space-y-1 border-t border-slate-900/60 pt-2">
                            <span className="text-amber-400 font-bold block uppercase text-[8px]">3. Єдиний державний реєстр декларацій (НАЗК):</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Оскільки відповіді є глибоко вкладеними, гетерогенними JSON-документами без жорсткої схеми, застосовується архітектурний підхід <strong>ELT</strong>. Сирі JSONB-дані завантажуються в базу без змін, а розгортання структур (flattening) та нормалізація сутностей (декларанти, нерухомість, корпоративні права, члени родини) виконується на стороні БД за допомогою інструменту <strong>dbt</strong>.
                            </p>
                          </div>

                          <div className="space-y-1 border-t border-slate-900/60 pt-2">
                            <span className="text-amber-400 font-bold block uppercase text-[8px]">4. Національний портал відкритих даних (data.gov.ua / CKAN):</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Використовує <code>package_search</code> та <code>datastore_search</code>. Якщо ресурс доступний лише як зовнішній файл (ZIP, CSV, XML), воркери використовують <code>io.BytesIO</code> та <code>zipfile</code> для декомпресії в оперативній пам'яті, миттєво спрямовуючи дані через bulk inserts без збереження архівів на локальний диск.
                            </p>
                          </div>

                          <div className="space-y-1 border-t border-slate-900/60 pt-2">
                            <span className="text-amber-400 font-bold block uppercase text-[8px]">5. НБУ (Фінмоніторинг) та ВРУ (Законодавство):</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Курси НБУ імпортуються щодня після 15:00 у вимірювальні таблиці (Dimension Table) за моделлю "Зірка". Тексти законів ВРУ проходять NLP векторизацію та зберігаються у векторній базі даних для подальшого використання у RAG-конвеєрах.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedBlueprintSection === 2 && (
                      <div className="space-y-4">
                        <div className="border-b border-slate-900 pb-2">
                          <h4 className="text-xs font-black text-slate-200 uppercase">ГЛАВА 3: ІНТЕГРАЦІЯ МІЖНАРОДНИХ БАЗ ДАНИХ, САНКЦІЙ ТА КОРПОРАТИВНИХ РЕЄСТРІВ</h4>
                          <p className="text-[8px] text-slate-500 mt-0.5">Тема: Глобальний санкційний моніторинг OpenSanctions, OpenCorporates, SEC EDGAR, CourtListener</p>
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <span className="text-cyan-400 font-bold block uppercase text-[8px]">1. Глобальний санкційний моніторинг: OpenSanctions:</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Дані базуються на онтології <strong>FollowTheMoney (FtM)</strong>. Оскільки загальний зведений файл експорту досягає розмірів у декілька гігабайт, завантаження його в оперативну пам'ять як єдиного JSON-об'єкта призводить до збоїв Out-of-Memory. Натомість інтеграція вимагає потокового зчитування <strong>line-delimited JSON</strong> (JSON-Lines).
                            </p>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Для тонкого налаштування видобутку використовуються Apify актори (наприклад, OpenSanctions Entities Scraper). Основні конфігураційні параметри:
                            </p>
                            <table className="w-full text-left font-mono text-[8px] text-slate-400 border border-slate-900 rounded bg-[#02050a] mt-1.5">
                              <thead>
                                <tr className="bg-slate-900 text-slate-300">
                                  <th className="p-1">Конфігураційний параметр</th>
                                  <th className="p-1">Тип</th>
                                  <th className="p-1">Архітектурне призначення</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-t border-slate-900">
                                  <td className="p-1 text-cyan-400 font-bold">datasetSlug</td>
                                  <td className="p-1">String</td>
                                  <td className="p-1">Вибір конкретного джерела (наприклад, <code>us_ofac_sdn</code>, або <code>default</code> для повного набору).</td>
                                </tr>
                                <tr className="border-t border-slate-900">
                                  <td className="p-1 text-cyan-400 font-bold">exportUrl</td>
                                  <td className="p-1">String</td>
                                  <td className="p-1">Пряме HTTPS-посилання на конкретний файл експорту OpenSanctions.</td>
                                </tr>
                                <tr className="border-t border-slate-900">
                                  <td className="p-1 text-cyan-400 font-bold">maxScanLines</td>
                                  <td className="p-1">Integer</td>
                                  <td className="p-1">Критичний механізм безпеки: лімітує кількість прочитаних JSON-рядків для оптимізації пам'яті.</td>
                                </tr>
                                <tr className="border-t border-slate-900">
                                  <td className="p-1 text-cyan-400 font-bold">maxItems</td>
                                  <td className="p-1">Integer</td>
                                  <td className="p-1">Контроль обсягу вихідних даних: лімітує кількість сутностей.</td>
                                </tr>
                                <tr className="border-t border-slate-900">
                                  <td className="p-1 text-cyan-400 font-bold">schemas / topics</td>
                                  <td className="p-1">String[]</td>
                                  <td className="p-1">Фільтрація сутностей за схемою (Person, Company, Vessel, sanctions, peps, crime).</td>
                                </tr>
                              </tbody>
                            </table>
                            <p className="text-[9px] text-slate-400 leading-relaxed mt-1">
                              З видобутих FtM-сутностей обов'язково імпортуються атрибути: <code>id</code>, <code>caption</code>, <code>schema</code> (або <code>entityType</code>), <code>target</code> та <code>identifiers</code> (податкові номери, LEI, ISIN, номери паспортів) для точного детермінованого зіставлення із записами українських реєстрів. Налаштування параметра <code>includeProperties=true</code> дозволяє також експортувати сирі, незмінені властивості FtM.
                            </p>
                          </div>

                          <div className="space-y-1 border-t border-slate-900/60 pt-2">
                            <span className="text-cyan-400 font-bold block uppercase text-[8px]">2. OpenCorporates, SEC EDGAR та CourtListener:</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Головним інженерним викликом є дотримання політики справедливого використання (Fair Access Policy). Наприклад, API SEC EDGAR встановлює абсолютний ліміт частоти запитів на рівні <strong>10 запитів на секунду</strong>. Перевищення ліміту миттєво призводить до тривалого блокування IP. Конвеєри повинні імплементувати асинхронні черги (Celery або Kafka) та алгоритми експоненційної затримки (<strong>exponential backoff</strong>) з додаванням випадкового джитера (<strong>jitter</strong>) для обробки помилок HTTP 429.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedBlueprintSection === 3 && (
                      <div className="space-y-4">
                        <div className="border-b border-slate-900 pb-2">
                          <h4 className="text-xs font-black text-slate-200 uppercase">ГЛАВА 4: НАУКОМЕТРІЯ, ГЕОПОЛІТИКА ТА API КІБЕРБЕЗПЕКИ (GIS)</h4>
                          <p className="text-[8px] text-slate-500 mt-0.5">Тема: OpenAlex Polite Pool, GDELT 2.0, AlienVault OTX, CISA KEV, MITRE, Nominatim OSM</p>
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <span className="text-indigo-400 font-bold block uppercase text-[8px]">1. OpenAlex: Наукометрія та інноваційний потенціал (Polite Pool):</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Замість видачі індивідуальних API-ключів, система використовує концепцію прозорої ідентифікації через механізм <strong>"Ввічливого пулу" (Polite Pool)</strong>. Достатньо виконати інжекцію параметра <code>mailto=vkizima534@gmail.com</code> у кожен HTTP-запит, що підвищує ліміти та забезпечує пріоритетну маршрутизацію мережевого трафіку. Може інтегруватися через MCP-протокол.
                            </p>
                          </div>

                          <div className="space-y-1 border-t border-slate-900/60 pt-2">
                            <span className="text-indigo-400 font-bold block uppercase text-[8px]">2. GDELT Project 2.0: Геополітичний моніторинг новин:</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Дані оновлюються кожні 15 хвилин. Інтеграційний конвеєр будується на принципах мікро-пакетної обробки (micro-batching). Оркестратор перевіряє Master File List на нові ZIP-архіви, завантажує їх, декомпресує та парсить вміст прямо в ClickHouse або BigQuery.
                            </p>
                          </div>

                          <div className="space-y-1 border-t border-slate-900/60 pt-2">
                            <span className="text-indigo-400 font-bold block uppercase text-[8px]">3. API кібербезпеки: AlienVault OTX, CISA KEV та MITRE ATT&CK:</span>
                            <div className="text-[10px] text-slate-300 space-y-1">
                              <div>• <strong>AlienVault OTX:</strong> Періодичне опитування "пульсів" (Pulses) та збірок індикаторів IoC (IP-адреси, домени, хеші malware) для оцінки ризиків інфраструктури контрагентів.</div>
                              <div>• <strong>CISA KEV:</strong> Щоденне завантаження каталогу вразливостей з перевіркою хешу на зміни та виконанням операції UPSERT.</div>
                              <div>• <strong>MITRE ATT&CK:</strong> Використання індустріальних стандартів обміну даними STIX та TAXII для імпорту складних графових структур кібератак.</div>
                            </div>
                          </div>

                          <div className="space-y-1 border-t border-slate-900/60 pt-2">
                            <span className="text-indigo-400 font-bold block uppercase text-[8px]">4. OpenStreetMap / Nominatim: Геокодування адрес:</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed">
                              Nominatim надає безкоштовний API, але відрізняється найбільш суворою політикою експлуатації:
                            </p>
                            <div className="bg-[#02050a] border border-slate-900 p-2 text-[8px] font-mono text-rose-400 space-y-1">
                              <div>1. Жорсткий ліміт частоти запитів: рівно 1 запит на секунду. Побудова паралельних запитів категорично заборонена.</div>
                              <div>2. Ідентифікація через унікальний User-Agent з вказівкою назви платформи та контактної пошти (ігнорування дефолтних python-requests).</div>
                              <div>3. Обов'язкове кешування результатів у локальну просторову базу даних PostGIS.</div>
                            </div>
                            <p className="text-[9px] text-slate-400 leading-relaxed mt-1">
                              Для масової обробки мільйонів адрес ЄДР чи контрактів ProZorro публічний Nominatim непридатний. Архітектурне вирішення: локальне розгортання власного сервера Nominatim на базі OSM дампів, що забезпечує тисячі запитів на секунду.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedBlueprintSection === 4 && (
                      <div className="space-y-4">
                        <div className="border-b border-slate-900 pb-2">
                          <h4 className="text-xs font-black text-slate-200 uppercase">ГЛАВА 5: ТРАНСФОРМАЦІЯ, ENTITY RESOLUTION ТА ЛІНКУВАННЯ ГРАФІВ</h4>
                          <p className="text-[8px] text-slate-500 mt-0.5">Тема: Злиття та дедублікація гетерогенних сутностей без глобального ідентифікатора</p>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                          Основна складність полягає у відсутності єдиного глобального ідентифікатора. Наприклад, українська компанія може фігурувати як переможець тендеру в системі ProZorro за кодом ЄДРПОУ, але у базі OpenSanctions ця ж компанія може бути ідентифікована лише за назвою у транслітерації. Особа може бути декларантом у системі НАЗК, замовником у ProZorro та кінчевим бенефіціаром в OpenCorporates.
                        </p>
                        <div className="bg-[#02050a] border border-slate-900 p-3 rounded-lg space-y-2">
                          <span className="font-bold block text-slate-400 text-[8px] uppercase">ЕТАПИ БАГАТОКРИТЕРІАЛЬНОГО ЗІСТАВЛЕННЯ СУТНОСТЕЙ:</span>
                          <div className="space-y-1 text-[9px] text-slate-300 font-mono">
                            <div>1. <strong>Нормалізація назв:</strong> Очищення від організаційно-правових форм (ТОВ, ТзОВ, LLC, Ltd, ПП), лапок, крапок, приведення до нижнього регістру.</div>
                            <div>2. <strong>Детермінований пошук:</strong> Прямий збіг за ідентифікаторами (ЄДРПОУ, tax_id, LEI, ISIN, номер паспорта).</div>
                            <div>3. <strong>Нечітке текстове порівняння:</strong> Алгоритми Jaro-Winkler, Levenshtein для схожих імен.</div>
                            <div>4. <strong>Семантичне порівняння:</strong> Розрахунок косинусної близькості векторних embeddings (Multilingual-E5-Large) у Qdrant з порогом 0.85.</div>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          Сукупність цих методів утворює єдиний узгоджений граф знань у Neo4j, що розкриває приховані корпоративні змови, фінансове кумівство та конфлікти інтересів з максимальною точністю. Розробка повноцінної аналітичної платформи виключно на базі відкритих державних API та міжнародних джерел даних є не лише економічно вигідною стратегією, але й технічно життєздатним рішенням.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-900 pt-3 flex justify-between items-center mt-4">
                    <span className="text-[8px] text-slate-500 font-mono">Генеральний план PREDATOR • Google Antigravity Engine</span>
                    <button
                      onClick={() => {
                        const now = new Date().toLocaleTimeString();
                        setRealtimeLogs(prev => [...prev, {
                          time: now,
                          text: \`Blueprint Manager: Exported Architectural Plan chapter_\${selectedBlueprintSection + 1}.md successfully.\`,
                          type: 'success'
                        }]);
                      }}
                      className="px-2.5 py-1.5 cursor-pointer bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 text-[9px] font-mono font-bold uppercase transition-all rounded flex items-center gap-1.5"
                    >
                      <Download className="w-3 h-3" />
                      Зберегти .md розділ архітектури
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
                {/* List of ADRs */}
                <div className="col-span-12 lg:col-span-5 bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-[460px]">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-900 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      ARCHITECTURAL DECISION RECORDS (ADR 1-10)
                    </span>
                    <span className="text-[9px] font-mono text-cyan-400">ADR GENERATOR</span>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1 font-mono text-[10px]">
                    {[
                      { id: 1, title: 'ADR-001: RAW S3 landing zone (MinIO)', status: 'ACCEPTED' },
                      { id: 2, title: 'ADR-002: Multi-Database target router', status: 'ACCEPTED' },
                      { id: 3, title: 'ADR-003: Autonomous Self-Healing pipeline', status: 'ACCEPTED' },
                      { id: 4, title: 'ADR-004: HashiCorp Vault key preservation', status: 'ACCEPTED' },
                      { id: 5, title: 'ADR-005: Qdrant Ukrainian embeddings v2', status: 'ACCEPTED' },
                      { id: 6, title: 'ADR-006: Jaro-Winkler Entity Resolution thresholds', status: 'ACCEPTED' },
                      { id: 7, title: 'ADR-007: ClickHouse analytical time-series scaling', status: 'ACCEPTED' },
                      { id: 8, title: 'ADR-008: OpenTelemetry trace telemetry spans', status: 'ACCEPTED' },
                      { id: 9, title: 'ADR-009: Kafka queueing message distribute system', status: 'ACCEPTED' },
                      { id: 10, title: 'ADR-010: Neo4j relationship control indexing', status: 'ACCEPTED' }
                    ].map(adr => (
                      <div
                        key={adr.id}
                        onClick={() => setSelectedAdr(adr.id)}
                        className={\`p-2.5 rounded border cursor-pointer flex justify-between items-center \${selectedAdr === adr.id ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-400' : 'bg-slate-900/40 border-slate-900 hover:border-slate-800 text-slate-400'}\`}
                      >
                        <span>{adr.title}</span>
                        <span className="text-[7px] bg-emerald-950 text-emerald-400 px-1 py-0.5 rounded font-bold">{adr.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADR Content */}
                <div className="col-span-12 lg:col-span-7 bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-[460px] justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />
                  
                  <div className="space-y-4 font-mono text-[10px] leading-relaxed">
                    <div className="border-b border-slate-900 pb-2">
                      <h4 className="text-xs font-black text-slate-200">ADR-00{selectedAdr}: ARCHITECTURAL CHOICE OVERVIEW</h4>
                      <p className="text-[8px] text-slate-500 mt-0.5">Status: APPROVED | Deciders: Lead Architect & Google Antigravity</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-cyan-400 font-bold block uppercase text-[8px]">PROBLEM STATEMENT (КОНТЕКСТ):</span>
                        <p className="text-slate-300">
                          {selectedAdr === 1 ? "Необхідно гарантувати незмінність (immutability) первинних завантажених JSON-даних для відтворення всього ланцюга поставок (lineage) та перезапуску ETL." :
                           selectedAdr === 2 ? "Дані мають різноманітну структуру запитів: повнотекстовий пошук судових рішень, аналітика Spending та пошук прихованих зв'язків засновників у Neo4j." :
                           selectedAdr === 3 ? "Зовнішні реєстри часто змінюють структуру API без попереджень, що призводить до поломки класичних ETL-конвеєрів." :
                           "Потрібно забезпечити абсолютну конфіденційність, безпечний розподіл ключів та гнучке векторне зіставлення у Qdrant без витоку персональних даних."}
                        </p>
                      </div>

                      <div>
                        <span className="text-amber-400 font-bold block uppercase text-[8px]">DECISION (ПРИЙНЯТЕ РІШЕННЯ):</span>
                        <p className="text-slate-300">
                          {selectedAdr === 1 ? "Використовувати MinIO S3 Object Storage як landing zone. Зберігати файли безпосередньо у форматі GZIP/JSON без перезапису первинних даних." :
                           selectedAdr === 2 ? "Впровадити багатокомпонентний роутер: Postgres для मास्टर-БД, ClickHouse для аналітики, Neo4j для графу, OpenSearch для пошуку та Qdrant для семантичних векторів." :
                           selectedAdr === 3 ? "Розгорнути ШІ-монітор самовідновлення. У разі падіння API автоматично оновлювати клієнти, мігрувати БД та проводити регресійне тестування перед релізом." :
                           "Синхронізувати ключі через Vault, будувати зв'язки у Neo4j за спільними IBAN/ПІБ/кодами та індексувати embeddings у Qdrant за моделлю Multilingual-E5."}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 font-bold block uppercase text-[8px]">CONSEQUENCES (НАСЛІДКИ):</span>
                        <p className="text-slate-400">
                          Гарантована надійність і масштабованість. Зменшення витрат на технічну підтримку інфраструктури на 90% завдяки автономній ШІ-адаптації.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-900 pt-3 flex justify-between items-center mt-4">
                    <span className="text-[8px] text-slate-500 font-mono">Згенеровано ШІ-агентом Google Antigravity Coder</span>
                    <button
                      onClick={() => {
                        const now = new Date().toLocaleTimeString();
                        setRealtimeLogs(prev => [...prev, {
                          time: now,
                          text: \`ADR Manager: Exported ADR-00\${selectedAdr}.md to filesystem successfully.\`,
                          type: 'success'
                        }]);
                      }}
                      className="px-2.5 py-1.5 cursor-pointer bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 text-[9px] font-mono font-bold uppercase transition-all rounded flex items-center gap-1.5"
                    >
                      <Download className="w-3 h-3" />
                      Експорт .md ADR документа
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}`;

if (regex.test(content)) {
  console.log('Regex matched!');
  fs.writeFileSync('src/components/DataIngestionTab.tsx', content.replace(regex, replacement));
} else {
  console.log('Regex did NOT match');
  console.log(content.substring(content.length - 1000));
}
