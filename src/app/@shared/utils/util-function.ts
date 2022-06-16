import moment, { Moment } from 'moment';

import { ICalenderOption } from '../interfaces';
export class Utils {
  public static enumerateDaysBetweenDates = (
    startDate: Date | Moment,
    endDate: Date | Moment,
    format: string = 'YYYY-MM-DD'
  ) => {
    const dateArray = [];
    let currentDate = moment(startDate);
    while (currentDate.isBefore(endDate)) {
      const payload: any = {};
      payload['date'] = moment(currentDate).format(format);
      payload['day'] = moment(currentDate).format('dddd');
      payload['isToday'] = moment(currentDate).isSame(new Date(), 'day');
      payload['month'] = moment(currentDate).format('MMMM');
      payload['year'] = moment(currentDate).format('YYYY');
      payload['daySerial'] = moment(currentDate).format('DD');
      dateArray.push(payload);
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  };
  public static monthInfoByStartDate = (
    startDate: string | Moment
  ): ICalenderOption => {
    let currentDate = moment(startDate);
    const payload: ICalenderOption = {
      days: [],
      startDate: '',
      endDate: '',
      id: '',
      month: '',
      year: '',
    };
    const days = Utils.enumerateDaysBetweenDates(
      currentDate,
      moment(currentDate).add(1, 'months')
    );
    payload['id'] = moment(currentDate).format('HHMMSSYYYYMM');
    payload['month'] = moment(currentDate).format('MMMM');
    payload['year'] = moment(currentDate).format('YYYY');
    payload['days'] = days;
    payload['startDate'] = days[0];
    payload['endDate'] = days[days.length - 1];
    return payload;
  };
  public static genMonthsBetweenStartEndDate = (
    startDate: string | Moment,
    endDate: string | Moment
  ): any[] => {
    const dateArray = [];
    let currentDate = moment(startDate);
    while (currentDate.isBefore(endDate)) {
      const payload = {
        startDate: '',
        endDate: '',
        serial: '',
        label: '',
      };
      payload['startDate'] = moment(currentDate).format('YYYY-MM-01');
      payload['endDate'] = moment(currentDate)
        .endOf('month')
        .format('YYYY-MM-DD');
      payload['serial'] = moment(currentDate).format('M');
      payload['label'] = moment(currentDate).format('MMMM');
      dateArray.push(payload);
      currentDate = moment(currentDate).add(1, 'months');
    }
    return dateArray;
  };
  public static getDateByMonthSerial = (
    serial: number,
    year: number = moment().year()
  ): string => {
    return moment(`${year}-${serial}-01`).format('YYYY-MM-DD');
  };
  // sort array by date
  public static sortArrayByDate = (
    array: any[],
    key: string = 'date'
  ): any[] => {
    return array.sort((a, b) => {
      const dateA = moment(a[key]);
      const dateB = moment(b[key]);
      return dateA.diff(dateB);
    });
  };
  public static sortArrayByDateTime = (
    array: any[],
    key: string = 'date'
  ): any[] => {
    return array.sort((a, b) => {
      const dateA = moment(a[key]);
      const dateB = moment(b[key]);
      return dateA.diff(dateB);
    });
  };
  public static isSameDate = (
    date1: string | Moment,
    date2: string | Moment
  ) => {
    return moment(date1).isSame(date2, 'day');
  };
  public static isEmpty = (value: any): boolean => {
    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === undefined || value === null || value === '';
  };
}
