import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICHDay, ICHEvent } from '../../models/calender.interfaces';
import moment, { Moment } from 'moment';

import { ICHCalenderOption } from 'src/app/@shared/interfaces';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnChanges {
  @Input() monthStartDate: string = moment().format('YYYY-MM-01');
  @Input() events: ICHEvent[] = [];
  @Output() clickRow: EventEmitter<ICHDay> = new EventEmitter<ICHDay>();
  @Output() clickEvent: EventEmitter<ICHEvent> = new EventEmitter<ICHEvent>();
  calenderOption!: ICHCalenderOption;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthStartDate']) {
      this.calenderOption = this.monthInfoByStartDate(
        moment(changes['monthStartDate']?.currentValue).format('YYYY-MM-01')
      );
    }
    if (changes['events']) {
      this.events = changes['events'].currentValue;
    }
    this.calenderOption = this.mergeOptionWithEvents(
      this.calenderOption,
      this.events
    );
  }
  private mergeOptionWithEvents(
    calenderOption: ICHCalenderOption,
    events: ICHEvent[]
  ) {
    return {
      ...calenderOption,
      days: calenderOption?.days?.map((day: any) => {
        const getEvents = events?.filter((event: any) => {
          return moment(event?.date).isSame(day?.date, 'day');
        });
        if (getEvents) {
          const eventsArr = [...(day?.event || []), ...(getEvents || [])].map(
            (_event) => ({
              ..._event,
              date: moment(_event?.date).format('YYYY-MM-DD HH:mm:ss'),
            })
          );
          const sortedEvents = this.sortArrayByDateTime(eventsArr, 'date');
          day.events = sortedEvents;
        } else {
          day.events = [];
        }
        return day;
      }),
    };
  }
  onClickRow(day: ICHDay) {
    this.clickRow.emit(day);
  }
  onClickEvent(event: ICHEvent) {
    this.clickEvent.emit(event);
  }
  private enumerateDaysBetweenDates = (
    startDate: Date | Moment,
    endDate: Date | Moment,
    format: string = 'YYYY-MM-DD'
  ): ICHDay[] => {
    const dateArray = [];
    let currentDate = moment(startDate);
    while (currentDate.isBefore(endDate)) {
      const payload: ICHDay = {
        date: '',
        day: '',
        daySerial: '',
        isToday: false,
        month: '',
        year: '',
        events: [],
      };
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
  private monthInfoByStartDate = (
    startDate: string | Moment
  ): ICHCalenderOption => {
    let currentDate = moment(startDate);
    const payload: ICHCalenderOption = {
      days: [],
      startDate: '',
      endDate: '',
      id: '',
      month: '',
      year: '',
    };
    const days: ICHDay[] = this.enumerateDaysBetweenDates(
      currentDate,
      moment(currentDate).add(1, 'months')
    );
    payload['id'] = moment(currentDate).format('HHMMSSYYYYMM');
    payload['month'] = moment(currentDate).format('MMMM');
    payload['year'] = moment(currentDate).format('YYYY');
    payload['days'] = days;
    payload['startDate'] = String(days[0]);
    payload['endDate'] = String(days[days.length - 1]);
    return payload;
  };
  private sortArrayByDateTime = (array: any[], key: string = 'date'): any[] => {
    return array.sort((a, b) => {
      const dateA = moment(a[key]);
      const dateB = moment(b[key]);
      return dateA.diff(dateB);
    });
  };
}
