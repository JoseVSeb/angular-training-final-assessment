import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from 'src/interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  registerStudent(student: Student) {
    return this.httpClient.post<Student>("/students", student)
  }

  listStudents() {
    return this.httpClient.get<Student[]>("/students")
  }
}
