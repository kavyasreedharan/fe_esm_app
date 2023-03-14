import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../model/employee.model';
import { UsersDataService } from '../service/users-data.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {

  title: string = "Add Employee Details";
  submitted: boolean = false;
  employeeForm: FormGroup;
  empData: Employee = new Employee();

  idFormControl= new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.nullValidator]);
  loginFormControl= new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.nullValidator]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.nullValidator]);
  salaryFormControl = new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(7), Validators.nullValidator]);

  constructor(private formBuilder: FormBuilder, private userMessage: MatSnackBar, private usersDataService: UsersDataService) {
  }

  ngOnInit(): void {
    console.log('AddEmployeeComponent loaded');

    this.employeeForm = this.formBuilder.group({
      id: this.idFormControl,
      login: this.loginFormControl,
      name: this.nameFormControl,
      salary: this.salaryFormControl,
  });
  }

  matcher = new MyErrorStateMatcher();

  onSaveEmployeeDetails() {
    console.log('employeeForm => ' + JSON.stringify(this.employeeForm.getRawValue()))
    if (this.employeeForm.invalid) {
      this.submitted = false;
      this.userMessage.open('Please provide valid employee details to proceed', '', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
      return;
    } else {
      this.empData = this.employeeForm.value;
      console.log('valss== ' + JSON.stringify(this.empData))
      this.usersDataService.saveUserData(this.empData).subscribe(
        (response: any) => {
          console.log("save employee response => " + JSON.stringify(response));
          this.submitted = false;
          this.employeeForm.reset();
          Object.keys(this.employeeForm.controls).forEach((key) => {
            const control = this.employeeForm.controls[key];
            control.setErrors(null);
        });
          if(response.responseCode == 200) {
            
            this.userMessage.open(response.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            });
          }
        },
        (error: any) => {
          console.log('error => ' + JSON.stringify(error));
          this.userMessage.open(error, '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          });
        });
    }
  }

}


