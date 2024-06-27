import { CropData, ProcessedCropData } from '../types';

export const processData = (jsonData: CropData[]): ProcessedCropData[] => {
  return jsonData.map((row: CropData) => ({
    year: row.Year.replace("Financial Year (Apr - Mar), ", ""),
    crop: row["Crop Name"],
    production: row["Crop Production (UOM:t(Tonnes))"] ? Number(row["Crop Production (UOM:t(Tonnes))"]) : 0,
    yield: row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] ? Number(row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) : 0,
    area: row["Area Under Cultivation (UOM:Ha(Hectares))"] ? Number(row["Area Under Cultivation (UOM:Ha(Hectares))"]) : 0,
  }));
};

export const getYearlyStats = (data: ProcessedCropData[]): { year: string; maxCrop: string; minCrop: string; }[] => {
  const yearlyStats: { [key: string]: { maxCrop: string; minCrop: string; maxProd: number; minProd: number; } } = {};

  data.forEach(({ year, crop, production }) => {
    if (!yearlyStats[year]) {
      yearlyStats[year] = { maxCrop: crop, minCrop: crop, maxProd: production, minProd: production };
    } else {
      if (production > yearlyStats[year].maxProd) {
        yearlyStats[year].maxCrop = crop;
        yearlyStats[year].maxProd = production;
      }
      if (production < yearlyStats[year].minProd) {
        yearlyStats[year].minCrop = crop;
        yearlyStats[year].minProd = production;
      }
    }
  });

  return Object.entries(yearlyStats).map(([year, { maxCrop, minCrop }]) => ({
    year,
    maxCrop,
    minCrop,
  }));
};

export const getCropStats = (data: ProcessedCropData[]): { crop: string; avgYield: number; avgArea: number; }[] => {
  const cropStats: { [key: string]: { totalYield: number; totalArea: number; count: number; } } = {};

  data.forEach(({ crop, yield: cropYield, area }) => {
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
