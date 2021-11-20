import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Student } from 'src/interfaces/student';
import { ApiService } from '../service/api.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj("ApiService", ["registerStudent"]);
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    component.studentForm.controls.rollNo.setValue('')
    component.studentForm.controls.name.setValue('')
    component.studentForm.controls.email.setValue('')
    component.studentForm.controls.phoneNo.setValue('')
    component.studentForm.controls.department.setValue('')
    expect(component.studentForm.valid).toBeFalsy()
  })

  it(`should be check roll no validity`, () => {
    const rollNo = component.studentForm.controls.rollNo
    expect(rollNo.valid).toBeFalsy()
    rollNo.setValue('')
    expect(rollNo.hasError('required')).toBeTruthy()
    rollNo.setValue('*')
    expect(rollNo.hasError('pattern')).toBeTruthy()
    rollNo.setValue('100')
    expect(rollNo.hasError('pattern')).toBeTruthy()
    rollNo.setValue('10')
    expect(rollNo.valid).toBeTruthy()
  })

  it(`should be check name validity`, () => {
    const name = component.studentForm.controls.name
    expect(name.valid).toBeFalsy()
    name.setValue('')
    expect(name.hasError('required')).toBeTruthy()
    name.setValue('*')
    expect(name.hasError('pattern')).toBeTruthy()
    name.setValue('abc test')
    expect(name.valid).toBeTruthy()
  })

  it(`should be check department validity`, () => {
    const department = component.studentForm.controls.department
    expect(department.valid).toBeFalsy()
    department.setValue('')
    expect(department.hasError('required')).toBeTruthy()
    department.setValue('*')
    expect(department.hasError('pattern')).toBeTruthy()
    department.setValue('abc test')
    expect(department.valid).toBeTruthy()
  })

  it(`should be check phone no validity`, () => {
    const phoneNo = component.studentForm.controls.phoneNo
    expect(phoneNo.valid).toBeFalsy()
    phoneNo.setValue('')
    expect(phoneNo.hasError('required')).toBeTruthy()
    phoneNo.setValue('asdf')
    expect(phoneNo.hasError('pattern')).toBeTruthy()
    phoneNo.setValue('1234/1234/12')
    expect(phoneNo.hasError('pattern')).toBeTruthy()
    phoneNo.setValue('(+91)123 456-7890')
    expect(phoneNo.valid).toBeTruthy()
  })

  it(`should be check email validity`, () => {
    const email = component.studentForm.controls.email
    expect(email.valid).toBeFalsy()
    email.setValue('')
    expect(email.hasError('required')).toBeTruthy()
    email.setValue('asdf')
    expect(email.hasError('email')).toBeTruthy()
    email.setValue('asdf@')
    expect(email.hasError('email')).toBeTruthy()
    email.setValue('abc@test.com')
    expect(email.valid).toBeTruthy()
  })

  it(`should submit form with valid data`, () => {
    const form = fixture.debugElement.query(By.css('form'))
    const compiled = fixture.nativeElement as HTMLElement;

    const expected: Student = {
      rollNo: 4,
      name: 'qwerty',
      department: 'asdf',
      email: 'asdf@asd.com',
      phoneNo: 9876512340,
    }
    Object.entries(expected).forEach(([key, value]) => {
      component.studentForm.controls[key].setValue(value)
    })

    expect(component.studentForm.valid).toBeTruthy()

    mockApiService.registerStudent.and.returnValue(of(expected))

    form.triggerEventHandler("submit", compiled)

    expect(mockApiService.registerStudent).toHaveBeenCalledTimes(1)

    expect(mockApiService.registerStudent).toHaveBeenCalledWith(expected)
  })

  it(`should disable submit button if form has invalid data`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(component.studentForm.valid).toBeFalsy()
    expect(compiled.querySelector("form button")?.disabled).toBeTruthy()
  })
});
