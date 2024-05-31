export interface ProvinceStat {
  data: ProvinceData[];
}

export interface ProvinceData {
  province: string;
  earthquakeCount: number;
}
