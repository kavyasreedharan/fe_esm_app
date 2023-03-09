
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppConstants } from '../util/app-constants';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private http: HttpClient, private appConstants: AppConstants) { }

  getUsersData(minSalary: number, maxSalary: number, offset: number, limit: number, sort: string): Observable<any> {
    return this.http.get(this.appConstants.HOST_URL + this.appConstants.GET_USERS_DATA_ENDPOINT
      + '?minSalary=' + minSalary + '&maxSalary=' + maxSalary + '&offset=' + offset + '&limit=' + limit + '&sort=' + sort)
      .pipe(catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("error -> " + JSON.stringify(error));
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', error.error);
      error.error.message = 'Unable to connect with server. Please try again later.'
    } else {
      // The backend returned an unsuccessful response code.
      console.error('Backend returned code ${error.status}, body was: ', error.error);
    }
    return throwError(() => error.error.message);
  }
}