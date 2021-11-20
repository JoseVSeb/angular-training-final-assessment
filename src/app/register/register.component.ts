import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import * as _ from 'lodash';
import { Student } from 'src/interfaces/student';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  controls!: string[]

  studentForm = new FormGroup({
    rollNo: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^\d{1,2}$/)] }),
    name: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)] }),
    department: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^[a-zA-Z &-/]*$/)] }),
    email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
    phoneNo: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^\(?(\+\d{1,2})?(?:\)? ?|-)?(\d{3})[ -]?(\d{3})[ -]?(\d{4})$/)] }),
  })

  getLabel(value: string) {
    return _.startCase(value)
  }

  ngOnInit(): void {
    this.controls = Object.keys(this.studentForm.controls)
  }

  onSubmit(student: Student) {
    this.apiService.registerStudent(student)
    .subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      },
    )
  }

}
