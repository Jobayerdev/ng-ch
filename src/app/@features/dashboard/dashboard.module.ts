import { AnalyticsDashboardPageComponent } from './pages/analytics-dashboard-page/analytics-dashboard-page.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { CalenderComponent } from './components/calender/calender.component';
import { CommonModule } from '@angular/common';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { DashboardRoutes } from './dashboard.routing';
import { DatePipe } from './../../@shared/pipe/date.pipe';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [AnalyticsDashboardPageComponent];

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzResultModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzMessageModule,
  ],
  declarations: [
    ...COMPONENTS,
    DatePipe,
    CalenderComponent,
    CreateAppointmentComponent,
    AppointmentDetailsComponent,
  ],
})
export class DashboardModule {}
