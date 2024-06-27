import React, { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { processData, getYearlyStats, getCropStats } from '../utils/dataProcessing';
import { CropData, ProcessedCropData } from '../types';

interface AgricultureAnalyticsProps {
  jsonData: CropData[];
}

const AgricultureAnalytics: React.FC<AgricultureAnalyticsProps> = ({ jsonData }) => {
  const [yearlyStats, setYearlyStats] = useState<{ year: string; maxCrop: string; minCrop: string; }[]>([]);
  const [cropStats, setCropStats] = useState<{ crop: string; avgYield: number; avgArea: number; }[]>([]);

  useEffect(() => {
    const data: ProcessedCropData[] = processData(jsonData);
    setYearlyStats(getYearlyStats(data));
    setCropStats(getCropStats(data));
  }, [jsonData]);

  return (
    <div className="tables-wrapper">
      <div className="table-wrapper">
        <h2 className="center-text">Yearly Crop Production Stats</h2>
        <Table className="center-text">
          <thead>
            <tr className="table-header">
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
      </div>

      <div className="table-wrapper">
        <h2 className="center-text">Crop Average Stats (1950-2020)</h2>
        <Table className="center-text">
          <thead>
            <tr className="table-header">
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
    </div>
  );
};

export default AgricultureAnalytics;
