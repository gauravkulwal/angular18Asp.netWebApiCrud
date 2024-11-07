import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../employee';
import { Router } from '@angular/router';
import { ListComponent } from '../list/list.component';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule ],
  providers:[ListComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
departments = 
['Angular Developer',
  'Charted Account',
  'System Engineer'
]

empService = inject(EmployeeService)
http = inject(HttpClient)
route = inject(Router)
list = inject(ListComponent)




get f(){
  return this.empService.employeeForm.controls;
}
addStudent(): Observable<Employee>{
  return this.http.post<Employee>('https://localhost:7235/api/Employee' , this.empService.employeeForm.value)
}

onSubmit(){
  if(this.empService.employeeForm.value['id'] == ''){
this.addStudent().subscribe(res => {
  console.log(res)
})
  }
  else{
this.updateEmployee().subscribe(res => {
  console.log(res)
  this.list.getAllEmployees();
})
  }
  this.list.getAllEmployees();
  console.log(this.empService.employeeForm.value)
 this.route.navigateByUrl('list')

  this.empService.FormReset();
 
}

updateEmployee():Observable<Employee>{
  return this.http.put<Employee>(`https://localhost:7235/api/Employee/${this.empService.employeeForm.value.id}`, this.empService.employeeForm.value)
}
}
