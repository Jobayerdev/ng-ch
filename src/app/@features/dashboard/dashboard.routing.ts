import { RouterModule, Routes } from '@angular/router';

import { AnalyticsDashboardPageComponent } from './pages/analytics-dashboard-page/analytics-dashboard-page.component';
import moment from 'moment';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `/${moment().format('M')}`,
  },
  {
    path: ':month',
    component: AnalyticsDashboardPageComponent,
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
