import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersDataService } from '../service/users-data.service';

export interface UserData {
  id: string;
  login: string;
  name: string;
  salary: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  minSalary: number = 0;
  maxSalary: number = 4000;
  offset: number = 0;
  sortType: string = '%2Dname';
  displayedColumns: string[] = ['img', 'id', 'login', 'name', 'salary'];
  dataSource: MatTableDataSource<UserData>;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usersDataService: UsersDataService, private userMessage: MatSnackBar) {
    this.getAllEmployeeDetails();
  }

  ngOnInit(): void {
    console.log('Dashboard loaded');
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    if(this.length > 0) {
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

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: any) {
    console.log('sort => ' + sort)
     //this.dataSource.sort = sort; 
    }


  minValue(event: any) {
    console.log('minValue = ' + event.target.value)
    this.minSalary = event.target.value;
    this.getAllEmployeeDetails();
  }

  maxValue(event: any) {
    console.log('maxValue = ' + event.target.value)
    this.maxSalary = event.target.value;
    this.getAllEmployeeDetails();
  }

  getAllEmployeeDetails() {
    this.usersDataService.getUsersData(this.minSalary, this.maxSalary, this.pageIndex, this.pageSize, this.sortType).subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response.results);
        this.length = response.totalElements;
      },
      (error: any) => {
        console.log('error => ' + JSON.stringify(error));
        this.loading = false;
        this.userMessage.open(error, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        this.dataSource = new MatTableDataSource();
      });
  }

}


