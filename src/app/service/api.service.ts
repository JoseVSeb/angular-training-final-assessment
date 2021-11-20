import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from 'src/interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://localhost:3000/students"

  constructor(private httpClient: HttpClient) { }

  registerStudent(student: Student) {
    return this.httpClient.post(this.url, student)
  }

  listStudents() {
    return this.httpClient.get<Student[]>(this.url)
  }
}
