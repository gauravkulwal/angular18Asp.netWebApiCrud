import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  constructor(private fb: FormBuilder,
          private http: HttpClient
  ) { }

  employeeForm: FormGroup = this.fb.group({
    id: [''],
    fullName: ['', Validators.required],
    gender: ['Male'],
    department: [''],
    dateOfJoin: [''],
    isPermanent: [false],
    email: ['', [Validators.required, Validators.email]],
    contact: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
  })

  FormReset(){
    this.employeeForm.reset();
   this.employeeForm.controls['gender'].setValue('Male');
   this.employeeForm.controls['isPermanent'].setValue(false);
   this.employeeForm.controls['department'].setValue('');
   this.employeeForm.controls['id'].setValue('');
  }

  getAllEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>('https://localhost:7235/api/Employee/All')
  }
  deleteEmployee(id: any):Observable<Employee>{
    return this.http.delete<Employee>(`https://localhost:7235/api/Employee/${id}`)
    
      }
}
