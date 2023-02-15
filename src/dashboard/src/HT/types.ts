export type HT = {
  measurement_date: string;
  measurement_time: string;
  temperature: number;
  humidity: number;
};
export type HTGET = { date: string; measurements: HT[] };
