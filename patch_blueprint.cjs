const fs = require('fs');
let blueprint = JSON.parse(fs.readFileSync('firebase-blueprint.json', 'utf-8'));

blueprint.entities.riskMetric = {
  "title": "Risk Metric",
  "description": "Risk metrics data point for charts",
  "type": "object",
  "properties": {
    "date": { "type": "string" },
    "operations": { "type": "number" },
    "critical": { "type": "number" }
  },
  "required": ["date", "operations", "critical"]
};

blueprint.entities.dashboardData = {
  "title": "Dashboard Data",
  "description": "Container for dashboard metrics",
  "type": "object",
  "properties": {
    "metrics": {
      "type": "array",
      "items": { "$ref": "#/entities/riskMetric" },
      "maxLength": 30
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["metrics", "updatedAt"]
};

blueprint.firestore["dashboard/{docId}"] = {
  "schema": { "$ref": "#/entities/dashboardData" },
  "description": "Dashboard data singleton"
};

fs.writeFileSync('firebase-blueprint.json', JSON.stringify(blueprint, null, 2));
