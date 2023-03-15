
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
    return this.http.post(this.appConstants.HOST_URL + this.appConstants.USER_DATA_FILE_UPLOAD_ENDPOINT, formData)
      .pipe(catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      error.error.message = 'Unable to connect with server. Please try again later.'
    } 
    return throwError(() =>error.error.message);
  }
}