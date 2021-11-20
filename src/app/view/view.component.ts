import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/interfaces/student';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  students!: Observable<Student[]>

  ngOnInit(): void {
    this.students = this.apiService.listStudents()
  }

}
