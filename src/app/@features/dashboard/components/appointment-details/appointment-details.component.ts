import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  ngOnInit() {
    console.log(this.data);
  }
}
