import { parse } from 'papaparse';

interface CropData {
  year: number;
  crop: string;
  production: number;
  yield: number;
  area: number;
}

export const processData = (csvData: string): CropData[] => {
  const parsedData = parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  const data: CropData[] = parsedData.data.map((row: any) => ({
    year: row.Year,
    crop: row.Crop,
    production: row.Production || 0,
    yield: row.Yield || 0,
    area: row.Area || 0,
  }));

  return data;
};

export const getYearlyStats = (data: CropData[]): { year: number; maxCrop: string; minCrop: string; }[] => {
  const yearlyStats: { [key: number]: { maxCrop: string; minCrop: string; maxProd: number; minProd: number; } } = {};

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
    year: Number(year),
    maxCrop,
    minCrop,
  }));
};

export const getCropStats = (data: CropData[]): { crop: string; avgYield: number; avgArea: number; }[] => {
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
