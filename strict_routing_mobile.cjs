const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const newMobileRouting = `
                {ecosystem === "user" && (
                  <>
                    {activeTab === "live-analytical-center" && (
                      <LiveAnalyticalCenter
                        selectedEntity={selectedEntity}
                        onSelectEntityGlobal={(ent) => {
                          setSelectedEntity(ent);
                          setSelectedTool(null);
                          setSelectedNode(null);
                        }}
                        selectedScenario={selectedScenario}
                        onSelectScenario={setSelectedScenario}
                      />
                    )}
                    {activeTab === "dashboard" && (
                      <DashboardView
                        onSelectTab={(tabId) => {
                          if (tabId === "osint") {
                            setActiveTab("live-analytical-center");
                          } else {
                            setActiveTab(tabId as TabId);
                          }
                        }}
                        onSelectEntity={(entId) => {
                          selectEntityById(entId);
                          setActiveTab("live-analytical-center");
                        }}
                      />
                    )}
                    {activeTab === "osint" && (
                      <OsintWorkbench
                        selectedEntity={selectedEntity}
                        onSelectEntityForInspector={(ent) => {
                          setSelectedEntity(ent);
                          setSelectedTool(null);
                          setSelectedNode(null);
                          setIsInspectorOpen(true);
                        }}
                      />
                    )}
                    {activeTab === "person-profiler" && <PersonProfiler />}
                    {activeTab === "sandbox" && <InvestigationSandbox />}
                    {activeTab === "maps" && (
                      <MapsTab
                        onSelectEntityGlobal={(ent) => {
                          setSelectedEntity(ent);
                          setSelectedTool(null);
                          setSelectedNode(null);
                          setActiveTab("live-analytical-center");
                        }}
                      />
                    )}
                    {activeTab === "media-forensics" && <MediaForensicsTab />}
                    {activeTab === "data-ingestion" && <DataIngestionTab />}
                  </>
                )}
                
                {ecosystem === "admin" && (
                  <>
                    {activeTab === "admin-back-office" && <AdminBackOffice />}
                    {activeTab === "autonomous-factory" && <AutonomousFactory />}
                    {activeTab === "catalog" && <CatalogTab />}
                    {activeTab === "license" && <LicenseTab />}
                    {activeTab === "architecture" && <ArchitectureTab />}
                    {activeTab === "gap" && <GapAnalysisTab />}
                    {activeTab === "roadmap" && <RoadmapTab />}
                    {activeTab === "volumes" && <VolumesTab />}
                    {activeTab === "advisor" && <AdvisorTab />}
                  </>
                )}
`;

content = content.replace(/\{activeTab === "live-analytical-center" && \([\s\S]*?\{activeTab === "autonomous-factory" && <AutonomousFactory \/>\}/, newMobileRouting);

fs.writeFileSync('src/App.tsx', content);
