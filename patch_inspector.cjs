const fs = require('fs');
let code = fs.readFileSync('src/components/InspectorPanel.tsx', 'utf8');

const targetStr = `export default function InspectorPanel({ selectedEntity, selectedTool, selectedNode, onClose }: InspectorPanelProps) {
    // Decide what to display based on what is active
  const hasSelection = !!(selectedEntity || selectedTool || selectedNode);

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
  }, [selectedEntity]);`;

const replacementStr = `export default function InspectorPanel({ selectedEntity, selectedTool, selectedNode, onClose }: InspectorPanelProps) {
  const [riskFilter, setRiskFilter] = React.useState<string>('ALL');

  // Decide what to display based on what is active
  const hasSelection = !!(selectedEntity || selectedTool || selectedNode);

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

    let result = Array.from(related.values());
    if (riskFilter !== 'ALL') {
      result = result.filter(conn => {
        if (riskFilter === 'CRITICAL') return conn.entity.riskScore >= 75 || conn.risk === 'HIGH';
        if (riskFilter === 'HIGH') return (conn.entity.riskScore >= 50 && conn.entity.riskScore < 75) || conn.risk === 'MEDIUM';
        if (riskFilter === 'LOW') return conn.entity.riskScore < 50 || conn.risk === 'LOW';
        return true;
      });
    }

    return result;
  }, [selectedEntity, riskFilter]);`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/InspectorPanel.tsx', code);
