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
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {

  title: string = "Edit Employee Details";
  submitted: boolean = false;
  employeeForm: FormGroup;
  empId: string = "";
  empData: Employee = new Employee();
  showEdit: boolean = false;
  showDelete: boolean = false;


  loginFormControl= new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.nullValidator]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.nullValidator]);
  salaryFormControl = new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(7), Validators.nullValidator]);

  constructor(private formBuilder: FormBuilder, private userMessage: MatSnackBar, private usersDataService: UsersDataService,
    @Optional() public dialogRef: MatDialogRef<EmployeeDetailsComponent>) {
  }

  ngOnInit(): void {
    console.log('EmployeeDetailsComponent loaded');

    this.employeeForm = this.formBuilder.group({
      login: this.loginFormControl,
      name: this.nameFormControl,
      salary: this.salaryFormControl,
  });

  this.usersDataService.empDataSelected.subscribe((value) => {
    console.log('value =>  ' + JSON.stringify(value));
    this.empId = value.id;
    this.loginFormControl.setValue(value.login);
    this.nameFormControl.setValue(value.name);
    this.salaryFormControl.setValue(value.salary);
  });

  this.usersDataService.showEditStatusValue.subscribe((value) => {
    this.showEdit = value;
    if(this.showEdit) {
      this.title = 'Edit Employee Details'
    }
  });

  this.usersDataService.showDeleteStatusValue.subscribe((value) => {
    this.showDelete = value;
    if(this.showDelete) {
      this.title = 'Delete Employee Details'
    }
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
      this.empData.id = this.empId;
      console.log('valss== ' + JSON.stringify(this.empData))
      this.usersDataService.updateUserData(this.empData).subscribe(
        (response: any) => {
          console.log("update employee response => " + JSON.stringify(response));
          if(response.responseCode == 200) {
            this.usersDataService.setEmpDataUpdateStatus(this.empData);
            this.close();
            this.usersDataService.setShowDeleteStatus(false);
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

  onDeleteEmployeeDetails() {
    this.usersDataService.setShowDeleteStatus(false);
    this.usersDataService.deleteUserData(this.empId).subscribe({
      next: (response: any) => {
        console.log("delete employee response => " + JSON.stringify(response));
        if(response.responseCode == 200) {
          this.usersDataService.setEmpDataUpdateStatus(this.empData);
          this.close();
          this.usersDataService.setShowEditStatus(false);
        }
      },
      error: (error:any) => {
        console.log('error => ' + JSON.stringify(error));
        this.userMessage.open(error, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
  }});
    this.close();

  }
  close(): void {
    this.dialogRef.close();
  }


}


