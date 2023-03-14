import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
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
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss'],
})
export class SearchEmployeeComponent implements OnInit {

  title: string = "Search Employee Details";
  submitted: boolean = false;
  employeeForm: FormGroup;
  empData: Employee = new Employee();

  idFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.nullValidator]);
  loginFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.nullValidator]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.nullValidator]);
  salaryFormControl = new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(7), Validators.nullValidator]);

  constructor(private formBuilder: FormBuilder, private userMessage: MatSnackBar, private usersDataService: UsersDataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log('SearchEmployeeComponent loaded');

    this.employeeForm = this.formBuilder.group({
      id: this.idFormControl,
    });

    this.usersDataService.isEmpDataUpdated.subscribe((updatedData) => {
      this.empData.id == updatedData.id;
      this.empData.login = updatedData.login;
      this.empData.name = updatedData.name;
      this.empData.salary = updatedData.salary;
    }
    );

    this.usersDataService.showEditStatusValue.subscribe((value) => {
      if (value) {
        this.empData = new Employee();
      }
    }
    );
  }

  matcher = new MyErrorStateMatcher();

  searchEmployeeById() {
    console.log('employeeForm => ' + JSON.stringify(this.employeeForm.getRawValue()))
    if (this.employeeForm.invalid) {
      this.submitted = false;
      this.userMessage.open('Please provide valid employee id to proceed', '', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
      return;
    } else {
      this.submitted = true;
      this.empData = this.employeeForm.value;
      console.log('valss== ' + JSON.stringify(this.empData))
      this.usersDataService.searchUserData(this.empData.id).subscribe({
        next: (response: any) => {
          console.log("save employee response => " + JSON.stringify(response));
          if (response.responseCode == 200) {
            this.empData.login = response.empDataRecord.login;
            this.empData.name = response.empDataRecord.name;
            this.empData.salary = response.empDataRecord.salary;
            this.userMessage.open(response.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            });
          }
        },
        error: (error: any) => {
          this.empData.id = '';
          console.log('error => ' + JSON.stringify(error));
          this.userMessage.open(error, '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          });
        }});
    }
  }

  editEmployeeDetails() {
    this.usersDataService.setSelectedEmpData(this.empData);
    this.usersDataService.setShowEditStatus(true);
    this.usersDataService.setShowDeleteStatus(false);
    const dialogRef = this.dialog.open(EmployeeDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.empData.id
    });
  }

  deleteEmployeeDetails() {
    this.usersDataService.setSelectedEmpData(this.empData);
    this.usersDataService.setShowEditStatus(false);
    this.usersDataService.setShowDeleteStatus(true);
    const dialogRef = this.dialog.open(EmployeeDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.empData = new Employee();
    });
  }
}


