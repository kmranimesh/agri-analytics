import React, { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { processData, getYearlyStats, getCropStats } from '../utils/dataProcessing';

interface AgricultureAnalyticsProps {
  csvData: string;
}

const AgricultureAnalytics: React.FC<AgricultureAnalyticsProps> = ({ csvData }) => {
  const [yearlyStats, setYearlyStats] = useState<{ year: number; maxCrop: string; minCrop: string; }[]>([]);
  const [cropStats, setCropStats] = useState<{ crop: string; avgYield: number; avgArea: number; }[]>([]);

  useEffect(() => {
    const data = processData(csvData);
    setYearlyStats(getYearlyStats(data));
    setCropStats(getCropStats(data));
  }, [csvData]);

  return (
    <div>
      <h2>Yearly Crop Production Stats</h2>
      <Table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {yearlyStats.map(({ year, maxCrop, minCrop }) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{maxCrop}</td>
              <td>{minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Crop Average Stats (1950-2020)</h2>
      <Table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield</th>
            <th>Average Cultivation Area</th>
          </tr>
        </thead>
        <tbody>
          {cropStats.map(({ crop, avgYield, avgArea }) => (
            <tr key={crop}>
              <td>{crop}</td>
              <td>{avgYield}</td>
              <td>{avgArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AgricultureAnalytics;
