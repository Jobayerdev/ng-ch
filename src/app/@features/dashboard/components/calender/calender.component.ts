import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { ICalenderOption } from 'src/app/@shared/interfaces';
import { Utils } from 'src/app/@shared/utils';
import moment from 'moment';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnChanges {
  @Input() monthStartDate: string = moment().format('YYYY-MM-01');
  @Input() events: any[] = [];
  @Output() clickRow: any = new EventEmitter<any>();
  @Output() clickEvent: any = new EventEmitter<any>();
  calenderOption!: ICalenderOption;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthStartDate']) {
      this.calenderOption = Utils.monthInfoByStartDate(
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
    console.log('events', this.events);
    console.log('calenderOption', this.calenderOption);
  }
  private mergeOptionWithEvents(calenderOption: any, events: any) {
    return {
      ...calenderOption,
      days: calenderOption?.days?.map((day: any) => {
        const getEvents = events?.filter((event: any) => {
          return moment(event?.date).isSame(day?.date, 'day');
        });
        if (getEvents) {
          const eventsArr = [...(day?.event || []), ...(getEvents || [])].map(
            (x) => ({
              ...x,
              date: moment(x?.date).format('YYYY-MM-DD HH:mm:ss'),
            })
          );
          const eventsSorted = Utils.sortArrayByDateTime(eventsArr, 'date');
          day.events = eventsSorted;
        } else {
          day.events = [];
        }
        return day;
      }),
    };
  }
  onClickRow(day: any) {
    this.clickRow.emit(day);
  }
  onClickEvent(event: any) {
    this.clickEvent.emit(event);
  }
}
