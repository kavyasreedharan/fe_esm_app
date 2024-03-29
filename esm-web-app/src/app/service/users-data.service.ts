
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AppConstants } from '../util/app-constants';
import { catchError } from 'rxjs/operators';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private empData = new BehaviorSubject<any>({});
  empDataSelected = this.empData.asObservable();

  private empDataUpdateStatus = new BehaviorSubject<Employee>(new Employee());
  isEmpDataUpdated = this.empDataUpdateStatus.asObservable();

  private showEditStatus = new BehaviorSubject<boolean>(false);
  showEditStatusValue = this.showEditStatus.asObservable();

  private showDeleteStatus = new BehaviorSubject<boolean>(false);
  showDeleteStatusValue = this.showDeleteStatus.asObservable();

  private showSearchDeleteStatus = new BehaviorSubject<boolean>(false);
  getSearchDeleteStatusValue = this.showSearchDeleteStatus.asObservable();

  private showSearchUpdatestatus = new BehaviorSubject<boolean>(false);
  getSearchUpdateStatusValue = this.showSearchUpdatestatus.asObservable();


  constructor(private http: HttpClient, private appConstants: AppConstants) { }

  getUsersData(minSalary: number, maxSalary: number, offset: number, limit: number, sort: string): Observable<any> {
    return this.http.get(this.appConstants.HOST_URL + this.appConstants.GET_USERS_DATA_ENDPOINT
      + '?minSalary=' + minSalary + '&maxSalary=' + maxSalary + '&offset=' + offset + '&limit=' + limit + '&sort=' + sort)
      .pipe(catchError(this.handleError)
      );
  }

  searchUserData(empId: string): Observable<any> {
    return this.http.get(this.appConstants.HOST_URL + this.appConstants.GET_USERS_DATA_ENDPOINT + '/' + empId)
      .pipe(catchError(this.handleError)
      );
  }

  updateUserData(empData: Employee): Observable<any> {
    return this.http.patch(this.appConstants.HOST_URL + this.appConstants.GET_USERS_DATA_ENDPOINT + "/" + empData.id,
      JSON.stringify(empData),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .pipe(catchError(this.handleError)
      );
  }

  saveUserData(empData: Employee): Observable<any> {
    return this.http.post(this.appConstants.HOST_URL + this.appConstants.GET_USERS_DATA_ENDPOINT + "/" + empData.id,
      JSON.stringify(empData),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .pipe(catchError(this.handleError)
      );
  }

  deleteUserData(empId: String): Observable<any> {
    return this.http.delete(this.appConstants.HOST_URL + this.appConstants.GET_USERS_DATA_ENDPOINT + "/" + empId)
      .pipe(catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      error.error.message = 'Unable to connect with server. Please try again later.'
    } 
    return throwError(() => error.error.message);
  }

  setSelectedEmpData(data: any) {
    this.empData.next(data);
  }

  setEmpDataUpdateStatus(updatedData: Employee) {
    this.empDataUpdateStatus.next(updatedData);
  }

  setShowEditStatus(status: boolean) {
    this.showEditStatus.next(status);
  }

  setShowDeleteStatus(status: boolean) {
    this.showDeleteStatus.next(status);
  }

  setSearchDeleteStatus(status: boolean) {
    this.showSearchDeleteStatus.next(status);
  }

  setSearchUpdateStatus(status: boolean) {
    this.showSearchUpdatestatus.next(status);
  }
}