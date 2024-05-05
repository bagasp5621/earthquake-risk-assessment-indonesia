export interface Statistic {
  message: string;
  summary: {
    totalEarthquakes: number;
    largestCluster: number;
    totalYears: {
      years: number;
      firstData: string;
      lastData: string;
    };
    largestEarthquake: {
      magnitude: number;
      latitude: number;
      longitude: number;
      location: string;
      datetime: string;
    };
  };
  data: {
    label: number;
    statistics: {
      _id: number;
      totalEarthquakes: number;
      averageMagnitude: number;
      maxMagnitude: number;
      minMagnitude: number;
      averageDepth: number;
      maxDepth: number;
      minDepth: number;
    };
  }[];
}
