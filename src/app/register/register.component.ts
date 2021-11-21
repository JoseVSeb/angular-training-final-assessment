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

  toaster: boolean = false;
  toastError: boolean = false;
  toastMessage!: string;
  toastHeader!: string;

  submitting: boolean = false;

  studentForm = new FormGroup({
    rollNo: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^\d{1,2}$/)] }),
    name: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)] }),
    department: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^[a-zA-Z &\-/]+$/)] }),
    email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
    phoneNo: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^\(?(\+\d{1,2})?(?:\)? ?|-)?(\d{3})[ -]?(\d{3})[ -]?(\d{4})$/)] }),
  })

  controls: string[] = Object.keys(this.studentForm.controls)

  getLabel(value: string) {
    return _.startCase(value)
  }

  putToast(message: string, header: string, error: boolean = false) {
    this.toastError = error
    this.toastMessage = message
    this.toastHeader = header
    this.toaster = true
  }

  ngOnInit(): void { }

  onSubmit(student: Student) {
    this.submitting = true
    this.apiService.registerStudent(student)
    .subscribe(
      data => {
        this.putToast("Successfully registered student.", "Success")
      },
      error => {
        console.log(error)
        this.putToast("Failed to process request.", "Error", true)
      },
      )
    .add(() => {
      this.submitting = false
    })
  }

}
