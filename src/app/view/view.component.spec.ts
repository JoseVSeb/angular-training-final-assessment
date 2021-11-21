import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { Student } from 'src/interfaces/student';
import { ApiService } from '../service/api.service';

import { ViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj("ApiService", ["listStudents"]);
    await TestBed.configureTestingModule({
      declarations: [ ViewComponent ],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should list all students`, () => {
    const compiled = fixture.nativeElement as HTMLElement

    const expected: Student[] = [
      {
        name: "test",
        rollNo: 3,
        email: "test@abc.com",
        department: "abc",
        phoneNo: 1234567890,
      },
      {
        name: "qwerty",
        rollNo: 5,
        email: "asdf@abc.com",
        department: "abc",
        phoneNo: 9012345678,
      },
    ]

    type Key = 'name'| 'rollNo' | 'email' | 'department' | 'phoneNo'

    const keys = <Key[]>Object.keys(expected[0])

    mockApiService.listStudents.and.returnValue(of(expected))

    fixture.detectChanges()
    
    expect(mockApiService.listStudents).toHaveBeenCalledTimes(1)

    const actual = compiled.querySelectorAll("tbody tr")

    expect(actual.length).toBe(expected.length)

    actual.forEach((row, index) => {
      keys.forEach(key => {
        const actualValue = row.querySelector(`.${_.camelCase("student " + key)}`)?.textContent
        const expectedValue = `${expected[index][key]}`
        expect(actualValue).toEqual(expectedValue)
      })
    })
  })
});
