
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppConstants } from '../util/app-constants';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, private appConstants: AppConstants) { }

  upload(userDataFile: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", userDataFile, userDataFile.name);
    return this.http.post(this.appConstants.HOST_URL + this.appConstants.USER_DATA_FILE_UPLOAD_URL, formData)
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
      // The response body may contain clues as to what went wrong.
      console.error('Backend returned code ${error.status}, body was: ', error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() =>error.error.message);
  }
}