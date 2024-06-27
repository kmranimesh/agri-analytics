export interface CropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number | string;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
    "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
  }
  
  export interface ProcessedCropData {
    year: string;
    crop: string;
    production: number;
    yield: number;
    area: number;
  }
  