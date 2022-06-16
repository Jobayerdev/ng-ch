import { AnalyticsDashboardPageComponent } from './pages/analytics-dashboard-page/analytics-dashboard-page.component';
import { CalenderComponent } from './components/calender/calender.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { DatePipe } from './../../@shared/pipe/date.pipe';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTableModule } from 'ng-zorro-antd/table';

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
  ],
  declarations: [...COMPONENTS, DatePipe, CalenderComponent],
})
export class DashboardModule {}
