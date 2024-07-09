export interface Filter {
  summary: {
    totalEarthquake: number;
    averageMagnitude: number;
    averageDepth: number;
  };
  data: {
    datetime: number;
    latitude: number;
    longitude: number;
    magnitude: number;
    depth: number;
    phasecount: number;
  }[];
}
