import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { __asyncValues } from 'tslib';
import { EmployeeService } from './employee.service';
import { Employee } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Employeeary: Employee[] = [];

  Employeeformgroup: FormGroup;

  constructor(private empservice: EmployeeService, private fb: FormBuilder) {
    this.Employeeformgroup = this.fb.group({
      id: [""],
      name: [""],
      mobileNo: [""],
      emailId: [""],

    })
  }
  ngOnInit(): void {

    this.getemployee();
  }

  getemployee() {
    this.empservice.GetEmployee().subscribe(response => {
      console.log(response);
      this.Employeeary = response;
    })
  }

  /* onSubmit(){
     console.log (this.Employeeformgroup.value);
     this.empservice.CreateEmployee(this.Employeeformgroup.value).subscribe(response => {
       console.log(response);
       this.getemployee();
       this.Employeeformgroup.setValue({
         id:[""],
         name:[""],
         mobileNo:[""],
         emailId:[""],
 
       })
   })
 }*/

  onSubmit() {
    if (this.Employeeformgroup.value != null && this.Employeeformgroup.value != "") {
      this.empservice.UpdateEmployee(this.Employeeformgroup.value).subscribe(response => {
        console.log("Update");
        this.getemployee();
        this.Employeeformgroup.setValue(
          {
            id: "",
            name: "",
            mobileno: "",
            emailid: "",
          })
      })
    }
    else {
      this.empservice.CreateEmployee(this.Employeeformgroup.value).subscribe(response => {
        console.log("response");
        this.getemployee();
        this.Employeeformgroup.setValue(
          {
            id: "",
            name: "",
            mobileno: "",
            emailid: "",
          })
      })
    }
  }

  fillForm(emp: Employee) {
    this.Employeeformgroup.setValue({
      id: emp.id,
      name: emp.name,
      mobileno: emp.mobileNo,
      emailid: emp.emailId,
    })
  }

  /* DeleteEmp(id: string) {
     this.empservice.DeleteEmployee(id).subscribe(res => {
       console.log(res);
       this.getemployee();
     })
 
   }*/

  title = 'AngularBootstrap';
}
