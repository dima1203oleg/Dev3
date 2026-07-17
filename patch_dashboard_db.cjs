const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

// Add Firebase imports
content = content.replace(
  "import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';",
  "import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';\nimport { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';\nimport { db } from '../firebase';"
);

// We'll replace the state initialization and add a useEffect
const firestoreLogic = `
  const initialChartData = [
    { date: '06-18', operations: 12, critical: 2 },
    { date: '06-21', operations: 19, critical: 5 },
    { date: '06-24', operations: 15, critical: 1 },
    { date: '06-27', operations: 22, critical: 8 },
    { date: '06-30', operations: 30, critical: 12 },
    { date: '07-03', operations: 28, critical: 9 },
    { date: '07-06', operations: 35, critical: 15 },
    { date: '07-09', operations: 42, critical: 18 },
    { date: '07-12', operations: 38, critical: 11 },
    { date: '07-15', operations: 45, critical: 22 },
  ];
  
  const [chartData, setChartData] = React.useState(initialChartData);
  const [isChartUpdating, setIsChartUpdating] = React.useState(false);
  const [isDbInitialized, setIsDbInitialized] = React.useState(false);

  React.useEffect(() => {
    const dashboardDoc = doc(db, 'dashboard', 'risk_metrics');
    const unsubscribe = onSnapshot(dashboardDoc, (snapshot) => {
      if (snapshot.exists()) {
        setChartData(snapshot.data().metrics);
        setIsDbInitialized(true);
      } else {
        // Initialize if it doesn't exist
        setDoc(dashboardDoc, {
          metrics: initialChartData,
          updatedAt: serverTimestamp()
        }).catch(err => console.error("Error initializing dashboard data:", err));
      }
    }, (error) => {
      console.error("Firestore Error: ", error);
    });

    return () => unsubscribe();
  }, []);
`;

content = content.replace(
  /  const initialChartData = \[[\s\S]*?  const \[isChartUpdating, setIsChartUpdating\] = React\.useState\(false\);/,
  firestoreLogic
);

// Now find where chartData is updated. 
// Inside triggerRadarScan:
// setChartData(prevData => {
//   ...
//   return newData;
// });

const newUpdateLogic = `
          // Simulate updated data by writing to Firestore
          const dashboardDoc = doc(db, 'dashboard', 'risk_metrics');
          setChartData(prevData => {
            const newData = [...prevData];
            newData[newData.length - 1] = {
              ...newData[newData.length - 1],
              operations: newData[newData.length - 1].operations + Math.floor(Math.random() * 5),
              critical: newData[newData.length - 1].critical + Math.floor(Math.random() * 2)
            };
            
            // Only update Firestore if it was initialized, to avoid race conditions
            if (isDbInitialized) {
              setDoc(dashboardDoc, {
                metrics: newData,
                updatedAt: serverTimestamp()
              }).catch(err => console.error("Error updating dashboard data:", err));
            }
            return newData;
          });
`;

content = content.replace(
  /          \/\/ Simulate updated data\n          setChartData\(prevData => \{\n            const newData = \[\.\.\.prevData\];\n            newData\[newData\.length - 1\] = \{\n              \.\.\.newData\[newData\.length - 1\],\n              operations: newData\[newData\.length - 1\]\.operations \+ Math\.floor\(Math\.random\(\) \* 5\),\n              critical: newData\[newData\.length - 1\]\.critical \+ Math\.floor\(Math\.random\(\) \* 2\)\n            \};\n            return newData;\n          \}\);/,
  newUpdateLogic
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
console.log("Patched DashboardView");
