import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../services/dashboard.service';
import { Utils } from 'src/app/@shared/utils';
import moment from 'moment';

@Component({
  selector: 'app-analytics-dashboard-page',
  templateUrl: './analytics-dashboard-page.component.html',
  styleUrls: ['./analytics-dashboard-page.component.scss'],
})
export class AnalyticsDashboardPageComponent implements OnInit {
  monthStartDate: string = moment().format('YYYY-MM-01');
  leftMonths: any[] = [];
  events = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService
  ) {
    this.setLeftMonths();
  }
  ngOnInit(): void {
    this.updateCalenderFromRoute();
    this.dashboardService.appointmentStore.get().subscribe((res: any) => {
      this.events = res.data;
    });
  }
  private updateCalenderFromRoute() {
    this.activatedRoute.paramMap.subscribe((res) => {
      const monthSerial: number = Number(res.get('month'));
      const monthStartDate = Utils.getDateByMonthSerial(monthSerial);
      this.monthStartDate = monthStartDate;
    });
  }
  private setLeftMonths() {
    this.leftMonths = Utils.genMonthsBetweenStartEndDate(
      moment().format('YYYY-MM-01'),
      moment().endOf('year').format('YYYY-MM-DD')
    );
  }
  onChangeMonth(month: any) {
    this.router.navigate(['/', month?.serial]);
  }
  onReset() {
    this.router.navigate(['/', moment().format('M')]);
  }
}
