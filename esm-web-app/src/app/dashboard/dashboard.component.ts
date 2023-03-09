import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
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
  limit: number = 30;
  sortType: string = '%2Dname';

  constructor(private usersDataService: UsersDataService, private userMessage: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log('Dashboard loaded');

    this.usersDataService.getUsersData(this.minSalary, this.maxSalary, this.offset, this.limit, this.sortType).subscribe(
      (response: any) => {
        console.log('response => ' + JSON.stringify(response));
        this.userMessage.open(response.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        console.log("results => " +response.results)
        this.dataSource = new MatTableDataSource(response.results);
      },
      (error: any) => {
        console.log('error => ' + JSON.stringify(error));
        this.loading = false;
        this.userMessage.open(error, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      });
    }

    displayedColumns: string[] = ['img', 'id', 'login', 'name', 'salary'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort= this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


