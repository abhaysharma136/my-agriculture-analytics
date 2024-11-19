import { Table } from "@mantine/core";

export type YearTableRow = {
  Year: string; // or number, depending on the data format
  MaxCrop: string;
  MinCrop: string;
};

export const YearTable = ({ data }: { data: YearTableRow[] }) => {
  // Function to extract the year number
  const extractYear = (yearString: string): string => {
    const match = yearString.match(/\d{4}/); // Looks for a 4-digit number
    return match ? match[0] : yearString; // Return the match or the original string if no match
  };

  return (
    <Table className="styled-table">
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Max Production</th>
          <th>Crop with Min Production</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.Year}>
            <td>{extractYear(row.Year)}</td>{" "}
            {/* Display only the extracted year */}
            <td>{row.MaxCrop}</td>
            <td>{row.MinCrop}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
