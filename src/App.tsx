import "./App.css";
import { YearTable } from "./components/TableA";
import { CropTable } from "./components/TableB";
import data from "./data/agricultureData.json";
import { aggregateByYear, aggregateByCrop } from "./utils/dataProcessing";
function App() {
  const transformedData = data.map((row) => ({
    ...row,
    "Crop Production (UOM:t(Tonnes))":
      row["Crop Production (UOM:t(Tonnes))"]?.toString(),
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))":
      row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]?.toString(),
    "Area Under Cultivation (UOM:Ha(Hectares))":
      row["Area Under Cultivation (UOM:Ha(Hectares))"]?.toString(),
  }));

  const yearData = aggregateByYear(transformedData);
  const cropData = aggregateByCrop(transformedData);
  return (
    <>
      <div>
        <h1>Agriculture Analytics</h1>
        <h2>Year-wise Crop Aggregation</h2>
        <YearTable data={yearData} />
        <h2>Crop-wise Average Data</h2>
        <CropTable data={cropData} />
      </div>
    </>
  );
}

export default App;
