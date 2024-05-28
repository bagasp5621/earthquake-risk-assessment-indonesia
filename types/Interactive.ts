export interface Interactive {
  risk: string;
  count: number;
  dangerScore: {
    small: number;
    medium: number;
    high: number;
    danger: number;
  };
}
