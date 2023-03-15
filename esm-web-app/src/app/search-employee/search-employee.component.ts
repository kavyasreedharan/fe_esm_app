import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss'],
})
export class SearchEmployeeComponent implements OnInit {

  title: string = "Search Employee Details";
  submitted: boolean = false;
  employeeForm: FormGroup;
  empData: Employee = new Employee();
  displayedColumns: string[] = ['img', 'id', 'login', 'name', 'salary', 'actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>([]);

  idFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.nullValidator]);

  constructor(private formBuilder: FormBuilder, private userMessage: MatSnackBar, private usersDataService: UsersDataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      id: this.idFormControl,
    });

    this.usersDataService.isEmpDataUpdated.subscribe((updatedData) => {
      if (updatedData && this.submitted) {
        this.empData.id == updatedData.id;
        this.empData.login = updatedData.login;
        this.empData.name = updatedData.name;
        this.empData.salary = updatedData.salary;
      }
    });

    // this.usersDataService.getSearchUpdateStatusValue.subscribe((value) => {
    //   if (value) {
    // this.usersDataService.isEmpDataUpdated.subscribe((value) => {
    //   console.log('valss==> ' + value + '  ' + this.submitted)
    //   if (value && this.submitted) {
    //     this.empData = value;
    //   }
    // });
    // }
    // });

    this.usersDataService.getSearchDeleteStatusValue.subscribe((value) => {
      console.log('value => ' + value)
      if (value) {
        this.empData = new Employee();
      }
    } );
  }

  matcher = new MyErrorStateMatcher();

  searchEmployeeById() {
    if (this.employeeForm.invalid) {
      this.submitted = false;
      this.userMessage.open('Please provide valid employee id to proceed', '', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
      return;
    } else {
      this.usersDataService.searchUserData(this.employeeForm.value.id).subscribe({
        next: (response: any) => {
          if (response.responseCode == 200) {
            this.submitted = true;
            this.empData.id = response.empDataRecord.id;
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
          this.submitted = false;
          this.empData = new Employee();
          this.userMessage.open(error, '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          });
        }
      });
    }
  }

  editEmployeeDetails() {
    this.usersDataService.setSelectedEmpData(this.empData);
    this.usersDataService.setShowEditStatus(true);
    this.usersDataService.setShowDeleteStatus(false);
    const dialogRef = this.dialog.open(EmployeeDetailsComponent);

  }

  deleteEmployeeDetails() {
    this.usersDataService.setSelectedEmpData(this.empData);
    this.usersDataService.setShowEditStatus(false);
    this.usersDataService.setShowDeleteStatus(true);
    const dialogRef = this.dialog.open(EmployeeDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('emp id: ' + this.empData.id)
      if (this.empData.id) {console.log('in if')
        this.submitted = true;
      } else {
        this.submitted = false;
      }

    });
  }
}


