import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';

@Pipe({
  name: 'datepipe',
})
export class DatePipe implements PipeTransform {
  transform(date: string, format: string): string {
    return moment(date).format(format);
  }
}
