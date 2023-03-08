import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public USER_DATA_FILE_UPLOAD_URL = "/users/upload";
    public HOST_URL = "http://localhost:8080";
}
