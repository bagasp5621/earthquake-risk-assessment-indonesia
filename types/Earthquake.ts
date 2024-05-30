export interface Earthquake {
  clusters: EarthquakeData[];
}

// Define a type for the elements of the earthquakes array
export interface EarthquakeData {
  earthquakes: {
    latitude: number;
    longitude: number;
    magnitude: number;
    depth: number;
    datetime: number;
    weight: number;
  }[];
  totalEarthquakes: number;
  avgMag: number;
  avgDepth: number;
}
