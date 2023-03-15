import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import {  MatTableDataSource } from '@angular/material/table';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Employee } from '../model/employee.model';
import { UsersDataService } from '../service/users-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  minSalary: number = 0;
  maxSalary: number = 50000;
  offset: number = 0;
  sortType: string = '%2Bid';
  displayedColumns: string[] = ['img', 'id', 'login', 'name', 'salary', 'actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>([]);
  isEmpDataUpdated: boolean = false;
  empDataToUpdate: Employee = new Employee();
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usersDataService: UsersDataService,
    private userMessage: MatSnackBar,
    public dialog: MatDialog) {
    this.getAllEmployeeDetails();
  }

  ngOnInit(): void {
    this.usersDataService.isEmpDataUpdated.subscribe((updatedData) => {
      if (this.isEmpDataUpdated) {
        this.dataSource.data.filter(value => {
          if (value.id == updatedData.id) {
            value.login = updatedData.login;
            value.name = updatedData.name;
            value.salary = updatedData.salary;
          }
          return true;
        });
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    if (this.length > 0) {
      this.getAllEmployeeDetails();
    } else {
      this.loading = false;
      this.userMessage.open('Employee records are not available', '', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    }
  }

  sortData(sort: any) {
    if (sort) {
      this.sortType = sort.direction == 'asc' ? '%2B' + sort.active : '%2D' + sort.active
      this.getAllEmployeeDetails();
    }
  }

  minValue(event: any) {
    this.minSalary = event.target.value;
    this.getAllEmployeeDetails();
  }

  maxValue(event: any) {
    this.maxSalary = event.target.value;
    this.getAllEmployeeDetails();
  }

  getAllEmployeeDetails() {
    this.usersDataService.getUsersData(this.minSalary, this.maxSalary, this.pageIndex, this.pageSize, this.sortType).subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response.results);
        this.length = response.totalElements;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        this.loading = false;
        this.userMessage.open(error, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        this.dataSource = new MatTableDataSource();
      }
    });
  }

  editEmployeeDetails(event: any) {
    this.empDataToUpdate.id = event.id;
    this.empDataToUpdate.login = event.login;
    this.empDataToUpdate.name = event.name;
    this.empDataToUpdate.salary = event.salary
    this.usersDataService.setSelectedEmpData(this.empDataToUpdate);
    this.usersDataService.setShowEditStatus(true);
    this.usersDataService.setShowDeleteStatus(false);
    const dialogRef = this.dialog.open(EmployeeDetailsComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }

  deleteEmployeeDetails(event: any) {
    this.usersDataService.setSelectedEmpData(event);
    this.usersDataService.setShowEditStatus(false);
    this.usersDataService.setShowDeleteStatus(true);
    const dialogRef = this.dialog.open(EmployeeDetailsComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}


