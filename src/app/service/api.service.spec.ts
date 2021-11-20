import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { Student } from 'src/interfaces/student';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of students from api', async () => {
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

    service.listStudents()
    .subscribe(actual => 
      expect(actual).toEqual(expected)
    );

    const req = httpMock.expectOne("/students")

    expect(req.request.method).toEqual('GET')

    req.flush(expected)
  })

  it('should post new student to api', async () => {
    const expected: Student = {
      name: "test",
      rollNo: 3,
      email: "test@abc.com",
      department: "abc",
      phoneNo: 1234567890,
    }

    service.registerStudent(expected)
    .subscribe(actual => 
      expect(actual).toEqual(expected)
    );

    const req = httpMock.expectOne("/students")

    expect(req.request.method).toEqual('POST')

    expect(req.request.body).toEqual(expected)
  })
});
