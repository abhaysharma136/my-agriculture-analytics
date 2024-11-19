import { Table } from "@mantine/core";
type CropTableRow = {
  Crop: string;
  AvgYield: number; // Use `number` since it's a numeric value
  AvgArea: number; // Use `number` for the cultivation area as well
};

export const CropTable = ({ data }: { data: CropTableRow[] }) => (
  <Table className="styled-table">
    <thead>
      <tr>
        <th>Crop</th>
        <th>Average Yield (Kg/Ha)</th>
        <th>Average Cultivation Area (Ha)</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.Crop}>
          <td>{row.Crop}</td>
          <td>{row.AvgYield}</td>
          <td>{row.AvgArea}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);
