export interface ICHEvent<T = any> {
  title?: string;
  color?: string;
  date: string;
  data?: T;
}
export interface ICHDay {
  date: string;
  day: string;
  isToday: boolean;
  month: string;
  year: string;
  daySerial: string;
  events?: any[] | null;
}
