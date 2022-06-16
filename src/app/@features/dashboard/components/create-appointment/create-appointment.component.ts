import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DashboardService } from '../../services/dashboard.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
})
export class CreateAppointmentComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private nzModalRef: NzModalRef,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(40)]],
      lastName: [null, [Validators.required, Validators.maxLength(40)]],
      email: [null, [Validators.required, Validators.email]],
      gender: [null, [Validators.required]],
      age: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?:[1-9][0-9]?|1[01][0-9]|120)$/),
        ],
      ],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.dashboardService.createAppointment(this.validateForm.value);
      this.message.success('Appointment created successfully');
      this.nzModalRef.close();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
