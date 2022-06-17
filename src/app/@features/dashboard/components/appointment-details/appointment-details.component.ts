import { Component, Input } from '@angular/core';

import { IAppointment } from '../../models/appointments.interfaces';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent {
  @Input() appointment!: IAppointment;
}
