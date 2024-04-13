export interface Statistic {
  message: string;
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
  };
}
