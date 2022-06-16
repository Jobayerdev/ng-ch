import { BaseStore } from './../../../@shared/store/base.store';
import { IAppointmentStore } from './../models/dashboard.store.interfaces';
import { ICreateAppointmentRequest } from './../models/create-appointment.interfaces';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  appointmentStore = new BaseStore<IAppointmentStore>({}, 'appointmentStore');
  constructor() {}
  createAppointment(appointment: ICreateAppointmentRequest) {
    this.appointmentStore.update((pv: any) => ({
      ...pv,
      data: [...(pv?.data || []), appointment],
    }));
  }
}
