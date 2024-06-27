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
    <div className="table-container">
      <h2 className="center-text">Yearly Crop Production Stats</h2>
      <Table>
        <thead>
          <tr className="table-header">
            <th className="center-text">Year</th>
            <th className="center-text">Crop with Maximum Production</th>
            <th className="center-text">Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {yearlyStats.map(({ year, maxCrop, minCrop }) => (
            <tr key={year}>
              <td className="center-text">{year}</td>
              <td className="center-text">{maxCrop}</td>
              <td className="center-text">{minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="center-text">Crop Average Stats (1950-2020)</h2>
      <Table>
        <thead>
          <tr className="table-header">
            <th className="center-text">Crop</th>
            <th className="center-text">Average Yield</th>
            <th className="center-text">Average Cultivation Area</th>
          </tr>
        </thead>
        <tbody>
          {cropStats.map(({ crop, avgYield, avgArea }) => (
            <tr key={crop}>
              <td className="center-text">{crop}</td>
              <td className="center-text">{avgYield}</td>
              <td className="center-text">{avgArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AgricultureAnalytics;
