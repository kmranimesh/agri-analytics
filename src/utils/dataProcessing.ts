// src/utils/dataProcessing.ts
import { CropData } from '../types';

export const processData = (jsonData: CropData[]): CropData[] => {
  return jsonData.map((row: any) => ({
    Country: row.Country,
    Year: row.Year,
    "Crop Name": row["Crop Name"],
    "Crop Production (UOM:t(Tonnes))": row["Crop Production (UOM:t(Tonnes))"] || 0,
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
    "Area Under Cultivation (UOM:Ha(Hectares))": row["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
  }));
};

export const getYearlyStats = (data: CropData[]): { year: string; maxCrop: string; minCrop: string; }[] => {
  const yearlyStats: { [key: string]: { maxCrop: string; minCrop: string; maxProd: number; minProd: number; } } = {};

  data.forEach(({ Year, "Crop Name": crop, "Crop Production (UOM:t(Tonnes))": production }) => {
    if (!yearlyStats[Year]) {
      yearlyStats[Year] = { maxCrop: crop, minCrop: crop, maxProd: production, minProd: production };
    } else {
      if (production > yearlyStats[Year].maxProd) {
        yearlyStats[Year].maxCrop = crop;
        yearlyStats[Year].maxProd = production;
      }
      if (production < yearlyStats[Year].minProd) {
        yearlyStats[Year].minCrop = crop;
        yearlyStats[Year].minProd = production;
      }
    }
  });

  return Object.entries(yearlyStats).map(([year, { maxCrop, minCrop }]) => ({
    year,
    maxCrop,
    minCrop,
  }));
};

export const getCropStats = (data: CropData[]): { crop: string; avgYield: number; avgArea: number; }[] => {
  const cropStats: { [key: string]: { totalYield: number; totalArea: number; count: number; } } = {};

  data.forEach(({ "Crop Name": crop, "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": cropYield, "Area Under Cultivation (UOM:Ha(Hectares))": area }) => {
    if (!cropStats[crop]) {
      cropStats[crop] = { totalYield: cropYield, totalArea: area, count: 1 };
    } else {
      cropStats[crop].totalYield += cropYield;
      cropStats[crop].totalArea += area;
      cropStats[crop].count += 1;
    }
  });

  return Object.entries(cropStats).map(([crop, { totalYield, totalArea, count }]) => ({
    crop,
    avgYield: parseFloat((totalYield / count).toFixed(3)),
    avgArea: parseFloat((totalArea / count).toFixed(3)),
  }));
};
