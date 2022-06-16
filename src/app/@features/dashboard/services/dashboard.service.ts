import { BaseStore } from './../../../@shared/store/base.store';
import { IAppointmentStore } from './../models/dashboard.store.interfaces';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  appointmentStore = new BaseStore<IAppointmentStore>({
    data: [
      {
        title: 'Appointment 1',
        date: '2022-06-16 22:07:01',
        color: '#1970e3',
      },
      {
        title: 'Appointment 2',
        date: '2022-06-16 23:08:01',
        color: '#1970e3',
      },
      {
        title: 'Appointment 3',
        date: '2022-06-16 23:09:01',
        color: '#1970e3',
      },
      {
        title: 'Appointment 4',
        date: '2022-06-6 23:10:01',
        color: '#ff0000',
      },
    ],
  });
  constructor() {}
}
