import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../employee';
import { CommonModule } from '@angular/common';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { formatDate } from '@angular/common' 

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  EmployeeRecord : Employee[]= [];
  ngOnInit(): void {
  this.getAllEmployees();
  }

  http = inject(HttpClient);
 route = inject(Router);
 empService = inject(EmployeeService);

  
 
  onEdit(item: Employee){
this.empService.employeeForm.setValue({
  id: item.id,
  fullName: item.fullName,
  gender: item.gender,
  department: item.department,
  dateOfJoin: item.dateOfJoin,
  isPermanent: item.isPermanent,
  email: item.email,
  contact: item.contact
})
    this.empService.employeeForm.controls['dateOfJoin'].setValue(formatDate(item.dateOfJoin,'yyyy-MM-dd','en'))
this.route.navigateByUrl('add');

  }
  onDelete(id: any){
  if(confirm("are you sure?")){
    console.log(id)
    this.empService.deleteEmployee(id).subscribe(res => {
      console.log(res)
      this.getAllEmployees();
    })
  
  }
     
  
  }

getAllEmployees(){
  this.empService.getAllEmployee().subscribe(res =>{
    this.EmployeeRecord = res;
  })
}  
}
