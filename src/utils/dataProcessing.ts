import { round } from "./roundUtils";
type DataRow = {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))"?: string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: string;
  "Area Under Cultivation (UOM:Ha(Hectares))"?: string;
};
type YearlyAggregate = {
  Year: string;
  MaxCrop: string;
  MinCrop: string;
};
type CropAggregate = {
  Crop: string;
  AvgYield: number;
  AvgArea: number;
};
export const aggregateByYear = (data: DataRow[]): YearlyAggregate[] => {
  const yearData = data.reduce(
    (acc: Record<string, { max: DataRow; min: DataRow }>, row) => {
      const year = row.Year;
      const production = parseFloat(
        row["Crop Production (UOM:t(Tonnes))"] || "0"
      );

      if (!acc[year]) {
        acc[year] = { max: row, min: row };
      } else {
        if (
          production >
          parseFloat(acc[year].max["Crop Production (UOM:t(Tonnes))"] || "0")
        ) {
          acc[year].max = row;
        }
        if (
          production <
          parseFloat(acc[year].min["Crop Production (UOM:t(Tonnes))"] || "0")
        ) {
          acc[year].min = row;
        }
      }
      return acc;
    },
    {}
  );

  return Object.entries(yearData).map(([year, { max, min }]) => ({
    Year: year,
    MaxCrop: max["Crop Name"],
    MinCrop: min["Crop Name"],
  }));
};

export const aggregateByCrop = (data: DataRow[]): CropAggregate[] => {
  const cropData = data.reduce(
    (
      acc: Record<
        string,
        { totalYield: number; totalArea: number; count: number }
      >,
      row
    ) => {
      const crop = row["Crop Name"];
      const yieldValue = parseFloat(
        row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || "0"
      );
      const area = parseFloat(
        row["Area Under Cultivation (UOM:Ha(Hectares))"] || "0"
      );

      if (!acc[crop]) {
        acc[crop] = { totalYield: 0, totalArea: 0, count: 0 };
      }

      acc[crop].totalYield += yieldValue;
      acc[crop].totalArea += area;
      acc[crop].count += 1;

      return acc;
    },
    {}
  );

  return Object.entries(cropData).map(
    ([crop, { totalYield, totalArea, count }]) => ({
      Crop: crop,
      AvgYield: round(totalYield / count, 3),
      AvgArea: round(totalArea / count, 3),
    })
  );
};
