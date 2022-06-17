import moment, { Moment } from 'moment';
export class Utils {
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
}
